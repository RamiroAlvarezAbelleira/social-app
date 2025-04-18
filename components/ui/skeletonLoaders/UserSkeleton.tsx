import React, { useEffect, useState } from 'react'
import { ThemedView } from '../ThemedView'
import { View } from 'react-native'
import { Skeleton } from './Skeleton'

interface UserSkeletonProps {
    size?: "big" | "small"
}

const UserSkeleton = ({ size }: UserSkeletonProps) => {
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
            <View className={`${imageSize} rounded-full bg-white`}>
                <Skeleton style={{width: "100%", height: "100%", borderRadius: "100%"}} />
            </View>
            <ThemedView className='gap-y-1'>
                <View className={`w-[70px]`}><Skeleton /></View>
                <View className={`w-[50px]`}><Skeleton /></View>
            </ThemedView>
        </ThemedView>
    )
}

export default UserSkeleton