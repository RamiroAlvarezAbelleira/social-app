import { ThemedText } from '@/components/ui/ThemedText'
import { ThemedView } from '@/components/ui/ThemedView'
import Profile from '@/components/users/Profile'
import { useUserById } from '@/hooks/query/useUsers'
import React from 'react'


const profile = () => {
    const { data, isLoading, isError } = useUserById("67f6b4b9358a1571318f507a")
    return (
        <ThemedView mainContainer className='mt-5'>
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
                        <Profile {...data} />
            }
        </ThemedView>
    )
}

export default profile