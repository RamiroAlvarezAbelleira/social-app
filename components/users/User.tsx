import React, { useEffect, useState } from 'react'
import { ThemedView } from '../ui/ThemedView'
import { Image } from 'react-native'
import { ThemedText } from '../ui/ThemedText'
import { UserType } from '@/types/user.types'

interface UserProps extends UserType {
    userProfile?: Boolean,
    size?: "big" | "small"
}

const User = ({ profilePicUrl, firstName, lastName, username, userProfile, size }: UserProps) => {
    const [imageSize, setImageSize] = useState("w-[50px] h-[50px]")
    const [textSize, setTextSize] = useState<'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link'>("defaultSemiBold")

    useEffect(() => {
        switch (size) {
            case "big":
                setImageSize("w-[65px] h-[65px]")
                setTextSize("title")
                break
            case "small":
                setImageSize("w-[40px] h-[40px]")
                setTextSize("defaultSemiBold")
                break
            default:
                setImageSize("w-[50px] h-[50px]")
                setTextSize("defaultSemiBold")
                break
        }
    }, [size])


    return (
        <ThemedView className={`flex-row items-center gap-x-4 ${size === "small" && "pb-2"}`}>
            <ThemedView>
                <Image
                    source={{ uri: profilePicUrl }}
                    className={`${imageSize} rounded-full`}
                />
            </ThemedView>
            <ThemedView>
                <ThemedText darkColor='#ffffff' type={textSize}>{firstName} {lastName}</ThemedText>
                <ThemedText darkColor='#c0c0c0' >@{username}</ThemedText>
            </ThemedView>
        </ThemedView>
    )
}

export default User