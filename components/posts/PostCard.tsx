import { PostType } from '@/types/post.types'
import React from 'react'
import { Image, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import { ThemedText } from '../ui/ThemedText'
import { ThemedView } from '../ui/ThemedView'
import { useThemeColor } from '@/hooks/useThemeColor'
import User from '../users/User'

const PostCard = ({ message, repliesCount, likes, author: { firstName, lastName, profilePic, username } }: PostType) => {

    const color = useThemeColor({ light: "#fff", dark: "#000" }, 'background')
    return (
        <ThemedView className='gap-y-5 mx-4 mt-5 pb-5 border-b-[2px] border-b-[#0f0f0f]'>

            <User profilePic={profilePic} firstName={firstName} lastName={lastName} username={username} />

            <ThemedView className='pl-4'>
                <ThemedText darkColor='#ffffff' type='defaultSemiBold'>
                    {message}
                </ThemedText>
            </ThemedView>

            <ThemedView className='flex-row justify-end px-4 gap-x-8'>
                <ThemedView className='flex-row gap-x-2'>
                    <Icon name="hearto" size={20} color={color === "#fff" ? "#000" : "#fff"} />
                    <ThemedText>{likes}</ThemedText>
                </ThemedView>
                <ThemedView className='flex-row gap-x-2'>
                    <Icon name="message1" size={20} color={color === "#fff" ? "#000" : "#fff"} />
                    <ThemedText>{repliesCount}</ThemedText>
                </ThemedView>
            </ThemedView>

        </ThemedView>
    )
}

export default PostCard

const styles = StyleSheet.create({
    authorContainer: {

    },
    messageContainer: {

    },
    footerContainer: {

    }
})