import { PostType } from '@/types/post.types'
import { useTheme } from '@react-navigation/native'
import React from 'react'
import Icon from 'react-native-vector-icons/AntDesign'
import { ThemedText } from '../ui/ThemedText'
import { ThemedView } from '../ui/ThemedView'
import User from '../users/User'
import PressableView from '../ui/PressableView'
import { useRouter } from 'expo-router'

interface PostCardProps extends PostType {
    isParent: boolean
}

const PostCard = ({ _id, message, replies, likes, author, isParent }: PostCardProps) => {
    const { colors } = useTheme();
    const router = useRouter()
    const goToPost = () => {
        router.push(`/posts/${_id}`)
    }

    const goToUserProfile = () => {
        router.push(`/users/${author._id}`)
    }
    return (
        <ThemedView
            className={`mx-4 ${isParent ? "gap-y-5 " : "pl-1.5 pb-4"} mt-5 border-b-[2px]`}
            style={{ borderColor: colors.border }}
        >
            <PressableView onPressFunc={() => goToUserProfile()}>
                <User size={!isParent ? 'small' : undefined} profilePicUrl={author.profilePicUrl} firstName={author.firstName} lastName={author.lastName} username={author.username} />
            </PressableView>

            <PressableView onPressFunc={() => goToPost()}>
                <ThemedView className={`pl-4 ${!isParent && "flex-row pb-4"}`}>
                    {!isParent &&
                    <ThemedView className='w-[40px]'></ThemedView>
                    }
                    <ThemedText darkColor='#ffffff' type='defaultSemiBold'>
                        {message}
                    </ThemedText>
                </ThemedView>
            </PressableView>
            <ThemedView className='flex-row justify-end px-4 gap-x-8'>
                <ThemedView className='flex-row gap-x-2'>
                    <Icon name="hearto" size={20} color={colors.text} />
                    <ThemedText>{likes?.length ?? 0}</ThemedText>
                </ThemedView>
                <ThemedView className='flex-row gap-x-2'>
                    <Icon name="message1" size={20} color={colors.text} />
                    <ThemedText>{replies?.length ?? 0}</ThemedText>
                </ThemedView>
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