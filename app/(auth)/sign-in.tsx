import CustomButton from '@/components/CustomButton'
import CustomInput from '@/components/CustomInput'
import { signIn } from '@/lib/appwrite'
import useAuthStore from '@/store/auth.store'
import * as Sentry from '@sentry/react-native'
import { Link, router } from 'expo-router'
import React, { useState } from 'react'
import { Alert, Text, View } from 'react-native'

const SignIn = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({ email: '', password: '' });
    const { fetchAuthenticatedUser } = useAuthStore();

    const submit = async () => {
        const { email, password } = form;
        if(!email || !password) return Alert.alert("Error", "Please enter valid email address and password");

        setIsSubmitting(true);
        console.log("Starting sign in process...");

        try {
            await signIn({ email, password });
            console.log("Sign in successful, fetching user data...");
            await fetchAuthenticatedUser();

            console.log("Sign in complete, redirecting...");

            router.replace('/');
        } catch (error: any) {
            console.error("Sign in error:", error);
            Alert.alert("Error", error?.message || "Failed to sign in. Please try again.");
            Sentry.captureEvent(error);
        } finally {
            console.log("Sign in process completed");
            setIsSubmitting(false);
        }
    }

    return (
        <View className='gap-6 bg-white rounded-lg py-5 mt-20'>
            <CustomInput
                placeholder='Enter your email'
                value={form.email}
                onChangeText={(text) => setForm((prev) => ({ ...prev, email: text }))}
                label={"Email"}
                keyboardType='email-address'
                editable={!isSubmitting}
            />
            <CustomInput
                placeholder='Enter your password'
                value={form.password}
                onChangeText={(text) => setForm((prev) => ({ ...prev, password: text }))}
                label={"Password"}
                secureTextEntry
                editable={!isSubmitting}
            />
            
            <CustomButton 
                title="Sign In" 
                isLoading={isSubmitting}
                onPress={submit} 
            />

            <View className='flex justify-center mt-5 flex-row gap-2'>
                <Text className='base-regular text-gray-100'>
                    Don&apos;t have an account?
                </Text>
                <Link href="/sign-up" className='base-bold text-primary'>
                    Sign Up
                </Link>
            </View>
        </View>
    )
}

export default SignIn
