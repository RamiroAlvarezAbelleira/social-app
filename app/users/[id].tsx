import PostCard from '@/components/posts/PostCard'
import PressableView from '@/components/ui/PressableView'
import { ThemedText } from '@/components/ui/ThemedText'
import { ThemedView } from '@/components/ui/ThemedView'
import Profile from '@/components/users/Profile'
import { usePostById } from '@/hooks/query/usePosts'
import { useUserById } from '@/hooks/query/useUsers'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React from 'react'

const UserProfile = () => {

    const { id } = useLocalSearchParams()

    const { data, isLoading, isError } = useUserById(id as string)

    const router = useRouter();

    const handleGoBack = () => {
        router.back();
    };
    return (
        <ThemedView mainContainer>
            <PressableView style={{ width: 'auto', alignSelf: 'flex-start', paddingLeft: 16, marginBottom: 16 }} onPressFunc={() => handleGoBack()}>
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
                        <Profile {...data}/>
            }

        </ThemedView>
    )
}

export default UserProfile