import { useTheme } from '@react-navigation/native'
import React from 'react'
import { View } from 'react-native'
import { ThemedText } from '../ThemedText'
import { ThemedView } from '../ThemedView'
import UserSkeleton from './UserSkeleton'
import { Skeleton } from './Skeleton'

interface PostCardProps {
    isParent: boolean
}

const PostCardSkeleton = ({ isParent }: PostCardProps) => {
    const { colors } = useTheme();
    return (
        <ThemedView
            className={`mx-4 ${isParent ? "gap-y-5 " : "pl-1.5 pb-4"} mt-5 border-b-[2px]`}
            style={{ borderColor: colors.border }}
        >
            <ThemedView>
                <UserSkeleton size={!isParent ? 'small' : undefined} />
            </ThemedView>

            <ThemedView>
                <ThemedView className={`pl-4 max-w-[80%] ${!isParent && "flex-row pb-4"}`}>
                    {!isParent &&
                        <ThemedView className='w-[40px]'></ThemedView>
                    }
                    <View className='w-full gap-y-1'>
                        <View className='flex-row w-full justify-end'>
                            <View className='w-[95%]'><Skeleton /></View>
                        </View>
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <View className='flex-row w-full justify-start'>
                            <View className='w-[80%]'><Skeleton /></View>
                        </View>
                    </View>
                </ThemedView>
            </ThemedView>
            <ThemedView className='flex-row justify-end px-4 gap-x-8'>
                <View className='h-[20px] w-[35px]'>
                    <Skeleton style={{height: 20}} />
                </View>
                <View className='h-[20px] w-[35px]'>
                    <Skeleton style={{height: 20}} />
                </View>
            </ThemedView>
            {
                isParent &&

                <ThemedView className='border-t-[2px]' style={{ borderColor: colors.border }}>
                    <ThemedText darkColor='#ffffff' type='defaultSemiBold' className='py-2'>Replies</ThemedText>
                </ThemedView>
            }
        </ThemedView>
    )
}

export default PostCardSkeleton