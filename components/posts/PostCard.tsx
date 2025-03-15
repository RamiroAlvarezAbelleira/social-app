import React from 'react'
import { ThemedView } from '../ui/ThemedView'
import { ThemedText } from '../ui/ThemedText'
import { PostType } from '@/types/post.types'
import { Image, StyleSheet, Text } from 'react-native'

const PostCard = ({ message, repliesCount, likes, author: { firstName, lastName, profilePic, username } }: PostType) => {
    return (
        <ThemedView className='gap-y-5 mx-4 mt-5 pb-5 border-b-[2px] border-b-[#0f0f0f]'>
            <ThemedView className='flex-row items-center gap-x-4'>
                <ThemedView>
                    <Image
                        source={{ uri: profilePic }}
                        className='w-[60px] h-[60px] rounded-full'
                    />
                </ThemedView>
                <ThemedView>
                    <ThemedText>{firstName} {lastName}</ThemedText>
                    <ThemedText>@{username}</ThemedText>
                </ThemedView>
            </ThemedView>

            <ThemedView className='pl-4'>
                <ThemedText>
                    {message}
                </ThemedText>
            </ThemedView>

            <ThemedView className='flex-row justify-between px-4'>
                <ThemedView>
                    <ThemedText>Likes {likes}</ThemedText>
                </ThemedView>
                <ThemedView>
                    <ThemedText>Replies {repliesCount}</ThemedText>
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