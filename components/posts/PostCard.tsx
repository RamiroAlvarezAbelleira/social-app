import React from 'react'
import { ThemedView } from '../ui/ThemedView'
import { ThemedText } from '../ui/ThemedText'
import { PostType } from '@/types/post.types'
import { Image, StyleSheet, Text } from 'react-native'

const PostCard = ({ message, repliesCount, likes, author: { firstName, lastName, profilePic, username } }: PostType) => {
    return (
        <ThemedView>
            <ThemedView>
                <ThemedView>
                    <Image
                        source={{ uri: profilePic }}
                        className='w-[60px] h-[60px] rounded-full'
                    />
                </ThemedView>
                <ThemedView>
                    <ThemedText>{firstName} {lastName}</ThemedText>
                    <ThemedText>{username}</ThemedText>
                </ThemedView>
            </ThemedView>

            <ThemedView>
                <ThemedText>
                    {message}
                </ThemedText>
            </ThemedView>

            <ThemedView>
                <ThemedView>
                    <ThemedText>{likes}</ThemedText>
                </ThemedView>
                <ThemedView>
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