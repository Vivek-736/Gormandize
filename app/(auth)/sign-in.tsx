import { View, Text, Button } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

const SignIn = () => {
    return (
        <View className='flex items-center my-6 gap-y-6'>
            <Text>SignIn</Text>
            <Button 
                title="Sign In" 
                onPress={() => router.push('/sign-up')} 
            />
        </View>
    )
}

export default SignIn
