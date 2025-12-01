import { Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Slot } from 'expo-router'

export default function _layout() {
    return (
        <SafeAreaView className='min-h-screen flex items-center justify-center'>
            <Text>
                Auth_layout
            </Text>
            
            <Slot />
        </SafeAreaView>
    )
}