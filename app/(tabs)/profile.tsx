import CustomButton from '@/components/ui/CustomButton'
import { ThemedText } from '@/components/ui/ThemedText'
import { ThemedView } from '@/components/ui/ThemedView'
import Profile from '@/components/users/Profile'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'expo-router'
import React from 'react'


const profile = () => {
    const { dbUser, logout } = useAuth()
    const router = useRouter()
    const logoutFunc = () => {
        logout()
        router.push("/login")
    }
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
                dbUser ?
                    <Profile {...dbUser} />
                    :
                    <ThemedView className="w-full h-full pb-[144px] gap-y-5 items-center justify-center">
                        <ThemedText>Something went wrong. Please try again later</ThemedText>
                        <ThemedView>
                            <CustomButton onPressFunc={logoutFunc}>
                                <ThemedText className="font-semibold" lightColor="#ECEDEE" darkColor="#11181C">Reload</ThemedText>
                            </CustomButton>
                        </ThemedView>
                    </ThemedView>
            }
        </ThemedView>
    )
}

export default profile