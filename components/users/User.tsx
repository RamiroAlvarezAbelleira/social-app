import React from 'react'
import { ThemedView } from '../ui/ThemedView'
import { Image } from 'react-native'
import { ThemedText } from '../ui/ThemedText'
import { UserType } from '@/types/user.types'

const User = ({ profilePic, firstName, lastName, username }: UserType) => {
    return (
        <ThemedView className='flex-row items-center gap-x-4'>
            <ThemedView>
                <Image
                    source={{ uri: profilePic }}
                    className='w-[50px] h-[50px] rounded-full'
                />
            </ThemedView>
            <ThemedView>
                <ThemedText darkColor='#ffffff' type='defaultSemiBold'>{firstName} {lastName}</ThemedText>
                <ThemedText darkColor='#c0c0c0'>@{username}</ThemedText>
            </ThemedView>
        </ThemedView>
    )
}

export default User