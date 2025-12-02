import { images } from '@/constants';
import { appwriteConfig, databases } from '@/lib/appwrite';
import { useCartStore } from '@/store/cart.store';
import { CartCustomization } from '@/type';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Query } from 'react-native-appwrite';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Customization {
    $id: string;
    name: string;
    price: number;
    type: string;
}

interface ProductDetails {
    $id: string;
    name: string;
    description: string;
    image_url: string;
    price: number;
    rating: number;
    calories: number;
    protein: number;
}

const ProductDetail = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [product, setProduct] = useState<ProductDetails | null>(null);
    const [toppings, setToppings] = useState<Customization[]>([]);
    const [sides, setSides] = useState<Customization[]>([]);
    const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
    const [selectedSides, setSelectedSides] = useState<string[]>([]);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const { addItem } = useCartStore();

    useEffect(() => {
        fetchProductDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const fetchProductDetails = async () => {
        try {
            setLoading(true);
            
            const productDoc = await databases.getDocument(
                appwriteConfig.databaseId,
                appwriteConfig.menuCollectionId,
                id!
            );

            setProduct(productDoc as any);

            const menuCustomizations = await databases.listDocuments(
                appwriteConfig.databaseId,
                appwriteConfig.menuCustomizationsCollectionId,
                [Query.equal('menu', id!)]
            );

            const customizationIds = menuCustomizations.documents.map((doc: any) => doc.customizations);
            
            if (customizationIds.length > 0) {
                const customizations = await databases.listDocuments(
                    appwriteConfig.databaseId,
                    appwriteConfig.customizationsCollectionId,
                    [Query.equal('$id', customizationIds)]
                );

                // @ts-ignore
                const toppingsList = customizations.documents.filter((c: any) => c.type === 'topping') as Customization[];
                // @ts-ignore
                const sidesList = customizations.documents.filter((c: any) => c.type === 'side') as Customization[];

                setToppings(toppingsList);
                setSides(sidesList);
            }
        } catch (error) {
            console.error('Error fetching product details:', error);
            Alert.alert('Error', 'Failed to load product details');
        } finally {
            setLoading(false);
        }
    };

    const toggleTopping = (id: string) => {
        setSelectedToppings(prev => 
            prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
        );
    };

    const toggleSide = (id: string) => {
        setSelectedSides(prev => 
            prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
        );
    };

    const calculateTotal = () => {
        if (!product) return 0;
        
        let total = product.price * quantity;
        
        selectedToppings.forEach(toppingId => {
            const topping = toppings.find(t => t.$id === toppingId);
            if (topping) total += topping.price * quantity;
        });

        selectedSides.forEach(sideId => {
            const side = sides.find(s => s.$id === sideId);
            if (side) total += side.price * quantity;
        });

        return total;
    };

    const handleAddToCart = () => {
        if (!product) return;

        const selectedCustomizations: CartCustomization[] = [
            ...selectedToppings.map(id => {
                const topping = toppings.find(t => t.$id === id)!;
                return { id: topping.$id, name: topping.name, price: topping.price, type: topping.type };
            }),
            ...selectedSides.map(id => {
                const side = sides.find(s => s.$id === id)!;
                return { id: side.$id, name: side.name, price: side.price, type: side.type };
            })
        ];

        for (let i = 0; i < quantity; i++) {
            addItem({
                id: product.$id,
                name: product.name,
                price: product.price,
                image_url: product.image_url,
                customizations: selectedCustomizations
            });
        }

        Alert.alert('Success', 'Item added to cart!', [
            { text: 'OK', onPress: () => router.back() }
        ]);
    };

    if (loading) {
        return (
            <SafeAreaView className='flex-1 bg-white flex-center'>
                <ActivityIndicator size="large" color="#FE8C00" />
            </SafeAreaView>
        );
    }

    if (!product) {
        return (
            <SafeAreaView className='flex-1 bg-white flex-center'>
                <Text className='paragraph-medium text-gray-100'>Product not found</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className='flex-1 bg-white'>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View className='px-5 py-4 flex-row items-center justify-between'>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Image 
                            source={images.arrowBack}
                            className='size-6'
                            resizeMode='contain'
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.push('/(tabs)/search')}>
                        <Image 
                            source={images.search}
                            className='size-6'
                            resizeMode='contain'
                        />
                    </TouchableOpacity>
                </View>

                {/* Product Info Section - Left and Right Layout */}
                <View className='px-5 flex-row gap-4'>
                    {/* Left Side - Details */}
                    <View className='flex-1'>
                        <Text className='h3-bold text-dark-100' numberOfLines={2}>{product.name}</Text>
                        <Text className='body-regular text-gray-100 mt-1' numberOfLines={2}>{product.description}</Text>

                        {/* Rating */}
                        <View className='flex-row items-center mt-3 gap-1'>
                            {[...Array(5)].map((_, i) => (
                                <Image 
                                    key={i}
                                    source={images.star}
                                    className='size-4'
                                    tintColor={i < Math.floor(product.rating) ? '#FE8C00' : '#D1D5DB'}
                                />
                            ))}
                            <Text className='body-medium text-dark-100 ml-1'>
                                {product.rating}/5
                            </Text>
                        </View>

                        {/* Price */}
                        <Text className='h3-bold text-primary mt-3'>${product.price}</Text>

                        {/* Nutritional Info */}
                        <View className='flex-row gap-6 mt-3'>
                            <View>
                                <Text className='small-bold text-gray-100'>Calories</Text>
                                <Text className='paragraph-medium text-dark-100'>{product.calories} Cal</Text>
                            </View>
                            <View>
                                <Text className='small-bold text-gray-100'>Protein</Text>
                                <Text className='paragraph-medium text-dark-100'>{product.protein}g</Text>
                            </View>
                        </View>

                        {/* Bun Type */}
                        <View className='mt-3'>
                            <Text className='small-bold text-gray-100'>Bun Type</Text>
                            <Text className='paragraph-medium text-dark-100'>Whole Wheat</Text>
                        </View>
                    </View>

                    {/* Right Side - Product Image */}
                    <View className='w-40 h-40 flex-center'>
                        <Image 
                            source={{ uri: product.image_url }}
                            className='w-full h-full'
                            resizeMode='contain'
                        />
                    </View>
                </View>

                {/* Delivery Info */}
                <View className='px-5 mt-6'>
                    <View className='flex-row items-center gap-6 pb-4 border-b border-gray-200'>
                        <View className='flex-row items-center gap-2'>
                            <Text className='text-lg'>🚚</Text>
                            <Text className='small-bold text-dark-100'>Free Delivery</Text>
                        </View>
                        <View className='flex-row items-center gap-2'>
                            <Image source={images.clock} className='size-4' tintColor='#FE8C00' />
                            <Text className='small-bold text-dark-100'>20 - 30 mins</Text>
                        </View>
                        <View className='flex-row items-center gap-2'>
                            <Image source={images.star} className='size-4' tintColor='#FE8C00' />
                            <Text className='small-bold text-dark-100'>{product.rating}</Text>
                        </View>
                    </View>
                </View>

                {/* Description */}
                <View className='px-5 mt-6'>
                    <Text className='body-regular text-gray-100 leading-6'>
                        The {product.name} is a {product.description.toLowerCase()}. Made with premium ingredients and served fresh to ensure the best taste and quality. Perfect for any meal!
                    </Text>
                </View>

                {/* Toppings */}
                {toppings.length > 0 && (
                    <View className='px-5 mt-6'>
                        <Text className='paragraph-bold text-dark-100 mb-4'>Toppings</Text>
                        <View className='flex-row flex-wrap gap-3'>
                            {toppings.map((topping) => (
                                <TouchableOpacity
                                    key={topping.$id}
                                    onPress={() => toggleTopping(topping.$id)}
                                    className='relative'
                                >
                                    <View className='w-20 bg-gray-100/20 rounded-2xl p-2 items-center justify-center h-20'>
                                        <View className='size-10 bg-white rounded-full flex-center mb-1'>
                                            <Text className='text-xl'>🧀</Text>
                                        </View>
                                        <Text className='text-[10px] font-quicksand-medium text-dark-100 text-center' numberOfLines={1}>
                                            {topping.name}
                                        </Text>
                                    </View>
                                    {selectedToppings.includes(topping.$id) && (
                                        <View className='absolute -top-1 -right-1 bg-primary size-5 rounded-full flex-center'>
                                            <Image source={images.check} className='size-3' tintColor='#fff' />
                                        </View>
                                    )}
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                )}

                {/* Side Options */}
                {sides.length > 0 && (
                    <View className='px-5 mt-6 mb-6'>
                        <Text className='paragraph-bold text-dark-100 mb-4'>Side options</Text>
                        <View className='flex-row flex-wrap gap-3'>
                            {sides.map((side) => (
                                <TouchableOpacity
                                    key={side.$id}
                                    onPress={() => toggleSide(side.$id)}
                                    className='relative'
                                >
                                    <View className='w-20 bg-gray-100/20 rounded-2xl p-2 items-center justify-center h-20'>
                                        <View className='size-10 bg-white rounded-full flex-center mb-1'>
                                            <Text className='text-xl'>🍟</Text>
                                        </View>
                                        <Text className='text-[10px] font-quicksand-medium text-dark-100 text-center' numberOfLines={1}>
                                            {side.name}
                                        </Text>
                                    </View>
                                    {selectedSides.includes(side.$id) && (
                                        <View className='absolute -top-1 -right-1 bg-primary size-5 rounded-full flex-center'>
                                            <Image source={images.check} className='size-3' tintColor='#fff' />
                                        </View>
                                    )}
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                )}
            </ScrollView>

            {/* Bottom Bar */}
            <View className='px-5 py-4 bg-white border-t border-gray-200 flex-row items-center justify-between'>
                <View className='flex-row items-center gap-3'>
                    <TouchableOpacity 
                        onPress={() => setQuantity(Math.max(1, quantity - 1))}
                        className='size-10 bg-primary/10 rounded-lg flex-center'
                    >
                        <Image source={images.minus} className='size-4' tintColor='#FE8C00' />
                    </TouchableOpacity>
                    <Text className='paragraph-bold text-dark-100 w-8 text-center'>{quantity}</Text>
                    <TouchableOpacity 
                        onPress={() => setQuantity(quantity + 1)}
                        className='size-10 bg-primary/10 rounded-lg flex-center'
                    >
                        <Image source={images.plus} className='size-4' tintColor='#FE8C00' />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity 
                    onPress={handleAddToCart}
                    className='bg-primary rounded-full px-6 py-3 flex-row items-center gap-2'
                >
                    <Image source={images.bag} className='size-5' tintColor='#fff' />
                    <Text className='paragraph-semibold text-white'>
                        Add to cart (${calculateTotal().toFixed(2)})
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default ProductDetail;
