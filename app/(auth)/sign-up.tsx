import { View, Text, Button } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

const SignUp = () => {
    return (
        <View className='flex items-center my-6 gap-y-6'>
        <Text>SignUp</Text>
            <Button 
                title="Sign Up" 
                onPress={() => router.push('/sign-in')} 
            />
        </View>
    )
}

export default SignUp
