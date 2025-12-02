import { images } from '@/constants'
import { account } from '@/lib/appwrite'
import useAuthStore from '@/store/auth.store'
import { router } from 'expo-router'
import React from 'react'
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Profile = () => {
    const { user, setIsAuthenticated, setUser } = useAuthStore()

    const handleLogout = async () => {
        Alert.alert(
            "Logout",
            "Are you sure you want to logout?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Logout",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await account.deleteSession('current')
                            setIsAuthenticated(false)
                            setUser(null)
                            router.replace('/(auth)/sign-in')
                        } catch (error) {
                            console.error("Logout error:", error)
                        }
                    }
                }
            ]
        )
    }

    if (!user) {
        return (
            <SafeAreaView className='flex-1 bg-white flex-center'>
                <Text className='paragraph-medium text-gray-100'>
                    No user data available
                </Text>
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView className='flex-1 bg-white'>
            <ScrollView 
                contentContainerClassName='px-5 pb-10'
                showsVerticalScrollIndicator={false}
            >
                <View className='my-5'>
                    <Text className='small-bold uppercase text-primary'>My Profile</Text>
                    <Text className='paragraph-semibold text-dark-100 mt-1'>
                        Manage your account
                    </Text>
                </View>

                <View className='flex-center my-8'>
                    <View className='profile-avatar'>
                        <Image 
                            source={{ uri: user.avatar }}
                            className='size-full rounded-full border-4 border-black bg-orange-600'
                            resizeMode='cover'
                        />
                        <TouchableOpacity className='profile-edit'>
                            <Image 
                                source={images.pencil}
                                className='size-4'
                                tintColor='#fff'
                            />
                        </TouchableOpacity>
                    </View>
                    <Text className='h3-bold text-dark-100 mt-4'>{user.name}</Text>
                    <Text className='body-regular text-gray-100 mt-1'>{user.email}</Text>
                </View>

                <View className='mt-6'>
                    <Text className='paragraph-bold text-dark-100 mb-4'>Account Information</Text>

                    <View className='profile-field'>
                        <View className='profile-field__icon'>
                            <Image 
                                source={images.person}
                                className='size-5'
                                tintColor='#FE8C00'
                            />
                        </View>
                        <View className='flex-1'>
                            <Text className='small-bold text-gray-100'>Full Name</Text>
                            <Text className='paragraph-medium text-dark-100 mt-0.5'>{user.name}</Text>
                        </View>
                    </View>

                    <View className='profile-field'>
                        <View className='profile-field__icon'>
                            <Image 
                                source={images.envelope}
                                className='size-5'
                                tintColor='#FE8C00'
                            />
                        </View>
                        <View className='flex-1'>
                            <Text className='small-bold text-gray-100'>Email Address</Text>
                            <Text className='paragraph-medium text-dark-100 mt-0.5'>{user.email}</Text>
                        </View>
                    </View>

                    <View className='profile-field'>
                        <View className='profile-field__icon'>
                            <Image 
                                source={images.location}
                                className='size-5'
                                tintColor='#FE8C00'
                            />
                        </View>
                        <View className='flex-1'>
                            <Text className='small-bold text-gray-100'>Location</Text>
                            <Text className='paragraph-medium text-dark-100 mt-0.5'>Hyderabad, India</Text>
                        </View>
                    </View>
                </View>

                <TouchableOpacity 
                    className='mt-10 bg-error rounded-full p-4 flex-row justify-center items-center gap-2'
                    onPress={handleLogout}
                >
                    <Image 
                        source={images.logout}
                        className='size-5'
                        tintColor='#fff'
                    />
                    <Text className='paragraph-semibold text-white'>
                        Logout
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Profile
