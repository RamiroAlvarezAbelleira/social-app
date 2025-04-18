import { PostType } from '@/types/post.types'
import { useTheme } from '@react-navigation/native'
import React from 'react'
import Icon from 'react-native-vector-icons/AntDesign'
import { ThemedText } from '../ui/ThemedText'
import { ThemedView } from '../ui/ThemedView'
import User from '../users/User'
import PressableView from '../ui/PressableView'
import { useRouter } from 'expo-router'
import { useLikePost } from '@/hooks/query/usePosts'
import { useAuth } from '@/context/AuthContext'
import { useQueryClient } from '@tanstack/react-query'

interface PostCardProps extends PostType {
    isParent: boolean
}

const PostCard = ({ _id, message, replies, likes, author, isParent, replyTo }: PostCardProps) => {
    const { colors } = useTheme();
    const router = useRouter()
    const { user, dbUser } = useAuth()
    const { mutate } = useLikePost()
    const queryClient = useQueryClient()

    const goToPost = () => {
        router.push(`/posts/${_id}`)
    }

    const goToUserProfile = () => {
        router.push(`/users/${author._id}`)
    }

    const likePost = async () => {
        if (dbUser && dbUser._id && _id && user) {
            const idToken = await user.getIdToken()
            mutate({
                userId: dbUser._id,
                postId: _id,
                idToken: idToken
            },
                {
                    onSuccess: () => {
                        if (replyTo) {
                            queryClient.invalidateQueries({ queryKey: ['post', replyTo] })
                        }
                        queryClient.invalidateQueries({ queryKey: ['post', _id] })
                        queryClient.invalidateQueries({ queryKey: ['posts'] })
                    },
                    onError: (error) => {
                        console.error(error)
                    }
                })
        }
    }
    return (
        <ThemedView
            className={`mx-4 ${isParent ? "gap-y-5 " : "pl-1.5 pb-4"} mt-5 border-b-[2px]`}
            style={{ borderColor: colors.border }}
        >
            <PressableView onPressFunc={() => goToUserProfile()}>
                <User size={!isParent ? 'small' : undefined} profilePicUrl={author?.profilePicUrl} firstName={author?.firstName} lastName={author?.lastName} username={author?.username} />
            </PressableView>

            <PressableView onPressFunc={() => goToPost()}>
                <ThemedView className={`pl-4 max-w-[80%] ${!isParent && "flex-row pb-4"}`}>
                    {!isParent &&
                        <ThemedView className='w-[40px]'></ThemedView>
                    }
                    <ThemedText darkColor='#ffffff' type='defaultSemiBold'>
                        {message}
                    </ThemedText>
                </ThemedView>
            </PressableView>
            <ThemedView className='flex-row justify-end px-4 gap-x-8'>
                <PressableView onPressFunc={likePost}>
                    <ThemedView className='flex-row gap-x-2'>
                        <Icon name="hearto" size={20} color={likes.includes(dbUser?._id ?? "") ? "red" : ""} />
                        <ThemedText>{likes?.length ?? 0}</ThemedText>
                    </ThemedView>
                </PressableView>
                <PressableView onPressFunc={goToPost}>
                    <ThemedView className='flex-row gap-x-2'>
                        <Icon name="message1" size={20} color={colors.text} />
                        <ThemedText>{replies?.length ?? 0}</ThemedText>
                    </ThemedView>
                </PressableView>

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

export default PostCard