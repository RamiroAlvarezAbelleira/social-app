import { useCreatePost } from '@/hooks/query/usePosts'
import { useTheme } from '@react-navigation/native'
import React, { useState } from 'react'
import { TextInput } from 'react-native'
import CustomButton from '../ui/CustomButton'
import { ThemedText } from '../ui/ThemedText'
import { ThemedView } from '../ui/ThemedView'
import { useQueryClient } from '@tanstack/react-query'

interface ReplyProps {
    postId: string
}

const ReplyInput = ({ postId }: ReplyProps) => {

    const [message, setMessage] = useState<string>('')
    const { mutate, isError, isPending, reset } = useCreatePost()
    const { colors } = useTheme()
    const queryClient = useQueryClient()

    const onSubmit = () => {
        if (!postId) {
            console.log("Parent post id not found")
            return
        }
        mutate(
            { message: message, userId: "67f6b2eb0a784c39a15ad775", postId: postId },
            {
                onSuccess: () => {
                    setMessage('')
                    console.log("reply created successfully")
                    queryClient.invalidateQueries({ queryKey: ['post', postId] })
                    queryClient.invalidateQueries({ queryKey: ['posts'] })
                },
                onError: (error) => {
                    console.error("Error al crear el post:", error.message);
                }
            }
        );
    }

    return (
        <ThemedView className='mx-4 gap-x-4 absolute bottom-16 flex-row justify-between' style={{ backgroundColor: 'transparent' }}>
            <TextInput
                multiline={true}
                style={{
                    color: colors.text,
                    borderColor: colors.border,
                    textAlignVertical: "center",
                    backgroundColor: colors.background
                }}
                className='py-2 px-4 flex-1 font-semibold border-2 rounded-[8px]'
                placeholder='Whats on your mind...'
                placeholderTextColor={colors.text}
                value={message}
                onChangeText={(text) => setMessage(text)}
            />
            <ThemedView >
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

export default ReplyInput