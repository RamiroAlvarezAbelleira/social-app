import CustomButton from '@/components/ui/CustomButton'
import { ThemedText } from '@/components/ui/ThemedText'
import { ThemedView } from '@/components/ui/ThemedView'
import Profile from '@/components/users/Profile'
import { useAuth } from '@/context/AuthContext'
import { useMyPosts } from '@/hooks/query/usePosts'
import { useGetFollowers } from '@/hooks/query/useUsers'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'


const profile = () => {
    const { dbUser, logout, user } = useAuth()

    const router = useRouter()

    const logoutFunc = () => {
        logout()
        router.push("/login")
    }
    const [idToken, setIdToken] = useState<string>("")

    useEffect(() => {
        if (user) {
            setIdTokenAsync()
        }
    }, [user])

    const setIdTokenAsync = async () => {
        setIdToken("")
        if (user) {
            const token = await user?.getIdToken()
            setIdToken(token)
        }
    }

    const { data, isError, isLoading, refetch } = useGetFollowers(idToken)

    const myPosts = useMyPosts(idToken)

    return (
        <ThemedView mainContainer className='mt-5'>
            {
                dbUser &&
                <ThemedView className='absolute right-4 top-[65px] z-[10]'>
                    <CustomButton onPressFunc={logoutFunc}>
                        <ThemedText className="font-semibold text-center" lightColor="#ECEDEE" darkColor="#11181C">Logout</ThemedText>
                    </CustomButton>
                </ThemedView>
            }

            {
                !data && !isLoading && <ThemedView>
                    <CustomButton onPressFunc={refetch}>
                        <ThemedText className="font-semibold" lightColor="#ECEDEE" darkColor="#11181C">refetch</ThemedText>
                    </CustomButton>
                </ThemedView>
            }

            {
                dbUser && !isLoading ?
                    <Profile {...dbUser} followers={data?.followers} following={data?.following} myPosts={myPosts?.data} />
                    :
                    isError ?
                        <ThemedView className="w-full h-full pb-[144px] gap-y-5 items-center justify-center">
                            <ThemedText>Something went wrong. Please try again later</ThemedText>
                            <ThemedView>
                                <CustomButton onPressFunc={logoutFunc}>
                                    <ThemedText className="font-semibold" lightColor="#ECEDEE" darkColor="#11181C">Reload</ThemedText>
                                </CustomButton>
                            </ThemedView>
                        </ThemedView>
                        :
                        <ThemedView className="w-full h-full pb-[144px] gap-y-5 items-center justify-center">
                            <ThemedText>Loading</ThemedText>
                        </ThemedView>


            }
        </ThemedView>
    )
}

export default profile