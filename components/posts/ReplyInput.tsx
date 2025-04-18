import { useAuth } from '@/context/AuthContext'
import { useCreatePost } from '@/hooks/query/usePosts'
import { useThemeColor } from '@/hooks/useThemeColor'
import { useTheme } from '@react-navigation/native'
import { useQueryClient } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native'
import CustomButton from '../ui/CustomButton'
import { ThemedText } from '../ui/ThemedText'
import { ThemedView } from '../ui/ThemedView'

interface ReplyProps {
    postId: string
}

const ReplyInput = ({ postId }: ReplyProps) => {
    const { user, dbUser } = useAuth()
    const [message, setMessage] = useState<string>('')
    const [idToken, setIdToken] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

    const { mutate, isPending, reset } = useCreatePost()
    const { colors } = useTheme()
    const errorColor = useThemeColor({}, "error")

    const queryClient = useQueryClient()

    useEffect(() => {
        setIdTokenAsync()
        setError(null)
        if (!dbUser) {
            setError("Something went wrong. Try re logging")
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
        setError(null)
        if (!postId) {
            setError("Parent post id not found")
            return
        }
        if (user && idToken && dbUser && dbUser._id) {
            mutate(
                { message: message, userId: dbUser._id, postId: postId, idToken },
                {
                    onSuccess: () => {
                        setMessage('')
                        console.log("reply created successfully")
                        queryClient.invalidateQueries({ queryKey: ['post', postId] })
                        queryClient.invalidateQueries({ queryKey: ['posts'] })
                    },
                    onError: (error) => {
                        setMessage("")
                        setError("Something went wrong. try again later")
                        console.error("Error al crear el post:", error.message);
                    }
                }
            );
        } else {
            setError("Unauthorized")
        }
    }

    return (
        <ThemedView className='mx-4 gap-x-4 absolute bottom-16 flex-row justify-between' style={{ backgroundColor: 'transparent' }}>
            <TextInput
                multiline={true}
                style={{
                    color: colors.text,
                    borderColor: error ? errorColor : colors.border,
                    textAlignVertical: "center",
                    backgroundColor: colors.background
                }}
                className={`py-2 px-4 flex-1 font-semibold border-2 rounded-[8px] `}
                placeholder={`${error ? error : "Whats on your mind..."}`}
                placeholderTextColor={error ? errorColor : colors.text}
                value={message}
                onChangeText={(text) => setMessage(text)}
            />
            <ThemedView >
                {
                    isPending ?
                        <ThemedText>Pending</ThemedText>
                        :
                        error ?
                            <CustomButton onPressFunc={() => reset()}>
                                <ThemedText className="font-semibold text-center" lightColor="#ECEDEE" darkColor="#11181C">Retry</ThemedText>
                            </CustomButton>
                            :

                            <CustomButton onPressFunc={() => onSubmit()}>
                                <ThemedText className="font-semibold text-center" lightColor="#ECEDEE" darkColor="#11181C">Post</ThemedText>
                            </CustomButton>
                }
            </ThemedView>
        </ThemedView>
    )
}

export default ReplyInput