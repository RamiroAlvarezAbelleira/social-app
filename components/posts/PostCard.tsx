import { PostType } from '@/types/post.types'
import { useTheme } from '@react-navigation/native'
import React from 'react'
import Icon from 'react-native-vector-icons/AntDesign'
import { ThemedText } from '../ui/ThemedText'
import { ThemedView } from '../ui/ThemedView'
import User from '../users/User'

const PostCard = ({ message, repliesCount, likes, author: { firstName, lastName, profilePic, username } }: PostType) => {
    const { colors } = useTheme();
    return (
        <ThemedView
            className={`gap-y-5 mx-4 mt-5 pb-5 border-b-[2px]`}
            style={{ borderColor: colors.border }}
        >

            <User profilePic={profilePic} firstName={firstName} lastName={lastName} username={username} />

            <ThemedView className='pl-4'>
                <ThemedText darkColor='#ffffff' type='defaultSemiBold'>
                    {message}
                </ThemedText>
            </ThemedView>

            <ThemedView className='flex-row justify-end px-4 gap-x-8'>
                <ThemedView className='flex-row gap-x-2'>
                    <Icon name="hearto" size={20} color={colors.text} />
                    <ThemedText>{likes}</ThemedText>
                </ThemedView>
                <ThemedView className='flex-row gap-x-2'>
                    <Icon name="message1" size={20} color={colors.text} />
                    <ThemedText>{repliesCount}</ThemedText>
                </ThemedView>
            </ThemedView>

        </ThemedView>
    )
}

export default PostCard