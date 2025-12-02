import { images } from '@/constants';
import React from 'react';
import { ActivityIndicator, Image, View } from 'react-native';

const Loading = () => {
    return (
        <View className='flex-1 justify-center items-center bg-white'>
            <View className='relative justify-center items-center' style={{ width: 200, height: 200 }}>
                {/* Orange spinner positioned around the logo with padding */}
                <View className='absolute inset-0 justify-center items-center'>
                    <ActivityIndicator 
                        size="large" 
                        color="#FF6B00" 
                        style={{ transform: [{ scale: 3 }] }}
                    />
                </View>
                
                {/* Logo in the center */}
                <Image 
                    source={images.logo}
                    className='size-24'
                    resizeMode='contain'
                />
            </View>
        </View>
    );
};

export default Loading;
