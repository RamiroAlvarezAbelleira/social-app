import React from 'react'
import { ThemedView } from '../ui/ThemedView'
import { Image } from 'react-native'
import { ThemedText } from '../ui/ThemedText'
import { UserType } from '@/types/user.types'

interface UserProps extends UserType {
    userProfile?: Boolean
}

const User = ({ profilePicUrl, firstName, lastName, username, userProfile }: UserProps) => {
    const imageSize = userProfile ? "w-[65px] h-[65px]" : "w-[50px] h-[50px]"
    const textSize = userProfile ? "title" : "defaultSemiBold"
    return (
        <ThemedView className='flex-row items-center gap-x-4'>
            <ThemedView>
                <Image
                    source={{ uri: profilePicUrl }}
                    className={`${imageSize} rounded-full`}
                />
            </ThemedView>
            <ThemedView>
                <ThemedText darkColor='#ffffff' type={textSize}>{firstName} {lastName}</ThemedText>
                <ThemedText darkColor='#c0c0c0'>@{username}</ThemedText>
            </ThemedView>
        </ThemedView>
    )
}

export default User