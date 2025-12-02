import CustomButton from '@/components/CustomButton'
import CustomInput from '@/components/CustomInput'
import { createUser } from '@/lib/appwrite'
import useAuthStore from '@/store/auth.store'
import * as Sentry from '@sentry/react-native'
import { Link, router } from 'expo-router'
import React, { useState } from 'react'
import { Alert, Text, View } from 'react-native'

const SignUp = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const { fetchAuthenticatedUser } = useAuthStore();

    const submit = async () => {
        const { name, email, password } = form;

        if(!name || !email || !password) return Alert.alert("Error", "Please enter valid name, email address and password");

        setIsSubmitting(true);

        console.log("Starting signup process...");

        try {
            const timeoutPromise = new Promise((_, reject) => 
                setTimeout(() => reject(new Error("Request timed out. Please check your internet connection.")), 30000)
            );

            const createUserPromise = createUser({
                email,
                password,
                name
            });

            await Promise.race([createUserPromise, timeoutPromise]);

            console.log("User created successfully");
            
            await fetchAuthenticatedUser();

            router.replace('/');
        } catch (error: any) {
            console.error("Sign up error:", error);
            Alert.alert("Error", error?.message || "Failed to sign up. Please try again.");
            Sentry.captureEvent(error);
        } finally {
            console.log("Signup process completed");
            setIsSubmitting(false);
        }
    }

    return (
        <View className='gap-6 bg-white rounded-lg py-5 mt-8'>
            <CustomInput
                placeholder='Enter your full name'
                value={form.name}
                onChangeText={(text) => setForm((prev) => ({ ...prev, name: text }))}
                label={"Name"}
            />
            <CustomInput
                placeholder='Enter your email'
                value={form.email}
                onChangeText={(text) => setForm((prev) => ({ ...prev, email: text }))}
                label={"Email"}
                keyboardType='email-address'
            />
            <CustomInput
                placeholder='Enter your password'
                value={form.password}
                onChangeText={(text) => setForm((prev) => ({ ...prev, password: text }))}
                label={"Password"}
                secureTextEntry
            />
            
            <CustomButton 
                title="Sign Up" 
                isLoading={isSubmitting}
                onPress={submit} 
            />

            <View className='flex justify-center mt-5 flex-row gap-2'>
                <Text className='base-regular text-gray-100'>
                    Already have an account?
                </Text>
                <Link href="/sign-in" className='base-bold text-primary'>
                    Sign In
                </Link>
            </View>
        </View>
    )
}

export default SignUp
