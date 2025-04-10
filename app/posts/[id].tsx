import PostCard from '@/components/posts/PostCard'
import ReplyInput from '@/components/posts/ReplyInput'
import PressableView from '@/components/ui/PressableView'
import { ThemedText } from '@/components/ui/ThemedText'
import { ThemedView } from '@/components/ui/ThemedView'
import { usePostById } from '@/hooks/query/usePosts'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React from 'react'
import { FlatList } from 'react-native'

const PostDetail = () => {

    const { id } = useLocalSearchParams()

    const { data, isLoading, isError } = usePostById(id as string)

    const router = useRouter();

    const handleGoBack = () => {
        router.back();
    };

    return (
        <ThemedView mainContainer className='relative min-h-[100vh]'>
            <PressableView style={{ width: 'auto', alignSelf: 'flex-start', paddingLeft: 16 }} onPressFunc={() => handleGoBack()}>
                <ThemedText className="font-semibold text-center">Go Back</ThemedText>
            </PressableView>
            {
                isLoading ?
                    <ThemedView className="w-full h-full pb-[144px] items-center justify-center">
                        <ThemedText>Loading</ThemedText>
                    </ThemedView>
                    :

                    isError ?
                        <ThemedView className="w-full h-full pb-[144px] items-center justify-center">
                            <ThemedText>Error</ThemedText>
                        </ThemedView>
                        :
                        <ThemedView className='mt-5'>
                            <FlatList
                                data={[data, ...data.replies]}
                                renderItem={(post) => {
                                    if (post.item.type === "post") {
                                        return <PostCard isParent {...post.item} />
                                    } else {
                                        return <PostCard {...post.item} />
                                    }
                                }}
                            />
                        </ThemedView>
            }
            <ReplyInput />
        </ThemedView>
    )
}

export default PostDetail