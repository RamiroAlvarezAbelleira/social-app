import React from 'react'
import { ThemedView } from '../ui/ThemedView'
import { ThemedText } from '../ui/ThemedText'
import { PostType } from '@/types/post.types'
import { Image, StyleSheet } from 'react-native'

const PostCard = ({ message, repliesCount, likes, author: { firstName, lastName, profilePic, username } }: PostType) => {
    return (
        <ThemedView>
            <ThemedView>
                <ThemedView>
                    <Image
                        source={{ uri: profilePic }}
                        style={{ width: 80, height: 80 }}
                    />
                </ThemedView>
                <ThemedView>
                    <ThemedView>{firstName} {lastName}</ThemedView>
                    <ThemedView>{username}</ThemedView>
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