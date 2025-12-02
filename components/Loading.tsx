import { images } from '@/constants';
import React from 'react';
import { ActivityIndicator, Image, View } from 'react-native';

const Loading = () => {
    return (
        <View className='flex-1 justify-center items-center bg-white'>
            <View className='relative justify-center items-center'>
                <Image 
                    source={images.logo}
                    className='size-32'
                    resizeMode='contain'
                />
                
                <View className='absolute'>
                    <ActivityIndicator 
                        size="large" 
                        color="#FF6B00" 
                        style={{ transform: [{ scale: 2.5 }] }}
                    />
                </View>
            </View>
        </View>
    );
};

export default Loading;
