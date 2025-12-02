import { Button, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import seed from '@/lib/seed'

const Search = () => {
  return (
        <SafeAreaView className='min-h-screen flex justify-center items-center gap-y-4'>
            <Text>Search</Text>
            <Button 
                title='seed test'
                onPress={() => seed().catch((error) => console.error(error))} 
            />
        </SafeAreaView>
    )
}

export default Search
