import { useAuth } from '@/context/AuthContext'
import { useCreatePost } from '@/hooks/query/usePosts'
import { useTheme } from '@react-navigation/native'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native'
import CustomButton from '../ui/CustomButton'
import { ThemedText } from '../ui/ThemedText'
import { ThemedView } from '../ui/ThemedView'
import User from '../users/User'

const PostInput = () => {
    const [message, setMessage] = useState<string>('')
    const [postError, setPostError] = useState<string | null>(null)
    const [idToken, setIdToken] = useState<string | null>(null)
    const { dbUser, logout, user } = useAuth()
    const { mutate, isError, isPending, reset } = useCreatePost()
    const { colors } = useTheme()
    const router = useRouter()
    const queryClient = useQueryClient()

    useEffect(() => {
        setIdTokenAsync()
        setPostError(null)
        if (!dbUser) {
            setPostError("Something went wrong. Try re logging")
        }
    }, [dbUser])

    const setIdTokenAsync = async () => {
        setIdToken(null)
        if (user) {
            const token = await user?.getIdToken()
            setIdToken(token)
        }
    }

    const onSubmit = () => {
        setPostError(null)
        if (dbUser && dbUser._id && idToken) {
            mutate(
                { message: message, userId: dbUser._id, idToken },
                {
                    onSuccess: () => {
                        queryClient.invalidateQueries({ queryKey: ['posts'] })

                        router.push('/')
                    },
                    onError: (error) => {
                        console.error("Error al crear el post", error.message)
                    }
                }
            );
        } else {
            setPostError("Something went wrong. Try re logging")
        }

    }

    const logoutFunc = () => {
        reset()
        logout()
        router.push("/login")
    }

    return (
        <ThemedView className='pb-4 mt-5 flex-1 justify-between'>
            <ThemedView className='mx-4 gap-y-4'>
                {
                    dbUser &&
                    <User
                        profilePicUrl={dbUser.profilePicUrl}
                        firstName={dbUser.firstName}
                        lastName={dbUser.lastName}
                        username={dbUser.username}
                    />
                }

                {
                    isPending ?
                        <ThemedView className="h-3/4 items-center justify-center">
                            <ThemedText>Loading</ThemedText>
                        </ThemedView>
                        :

                        isError ?
                            postError ?
                                <ThemedView className="h-3/4 gap-y-5 items-center justify-center">
                                    <ThemedText>{postError}</ThemedText>
                                    <CustomButton onPressFunc={logoutFunc}>
                                        <ThemedText className="font-semibold" lightColor="#ECEDEE" darkColor="#11181C">Reload</ThemedText>
                                    </CustomButton>
                                </ThemedView>
                                :
                                <ThemedView className="h-3/4 gap-y-5 items-center justify-center">
                                    <ThemedText>There was an issue, please try again later</ThemedText>
                                    <CustomButton onPressFunc={() => reset()}>
                                        <ThemedText className="font-semibold" lightColor="#ECEDEE" darkColor="#11181C">Reload</ThemedText>
                                    </CustomButton>
                                </ThemedView>
                            :

                            <TextInput
                                multiline={true}
                                style={{
                                    color: colors.text,
                                    borderColor: colors.border,
                                    textAlignVertical: "top"
                                }}
                                className='min-h-[200px] py-4 px-4 mt-2 font-semibold border-2 rounded-[8px]'
                                placeholder='Whats on your mind...'
                                placeholderTextColor={colors.text}
                                onChangeText={(text) => setMessage(text)}
                            />
                }

            </ThemedView>
            <ThemedView className='flex-row w-full px-4'>
                {
                    isPending ?
                        <ThemedText>Pending</ThemedText>
                        :
                        <CustomButton onPressFunc={() => onSubmit()}>
                            <ThemedText className="font-semibold text-center" lightColor="#ECEDEE" darkColor="#11181C">Post</ThemedText>
                        </CustomButton>
                }

            </ThemedView>
        </ThemedView>
    )
}

export default PostInput