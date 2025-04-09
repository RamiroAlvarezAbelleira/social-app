import PostCard from '@/components/posts/PostCard'
import PressableView from '@/components/ui/PressableView'
import { ThemedText } from '@/components/ui/ThemedText'
import { ThemedView } from '@/components/ui/ThemedView'
import { usePostById } from '@/hooks/query/usePosts'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React from 'react'

const PostDetail = () => {

    const { id } = useLocalSearchParams()

    const { data, isLoading, isError } = usePostById(id as string)

    const router = useRouter();

    const handleGoBack = () => {
        router.back();
    };
    return (
        <ThemedView mainContainer>
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
                            <PostCard {...data} />
                        </ThemedView>
            }

        </ThemedView>
    )
}

export default PostDetail