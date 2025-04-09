import React, { useState } from 'react'
import { ThemedView } from '../ui/ThemedView'
import { TextInput } from 'react-native'
import CustomButton from '../ui/CustomButton'
import { ThemedText } from '../ui/ThemedText'
import { useTheme } from '@react-navigation/native'
import User from '../users/User'
import { useCreatePost } from '@/hooks/query/usePosts'

const PostInput = () => {
    const [message, setMessage] = useState<string>('')
    const { mutate, isError, isSuccess, error, data, isPending } = useCreatePost()
    const { colors } = useTheme()
    const onSubmit = () => {
        mutate(
            { message: message, userId: "67f6b4b9358a1571318f507a" },
            {
                onSuccess: (data) => {
                    console.log("Post creado con éxito:", data);
                },
                onError: (error) => {
                    console.error("Error al crear el post:", error.message);
                }
            }
        );
    }

    return (
        <ThemedView className='pb-4 mt-5 flex-1 justify-between'>
            <ThemedView className='mx-4 gap-y-4'>
                <User
                    profilePicUrl={"https://randomuser.me/api/portraits/men/1.jpg"}
                    firstName={"John"}
                    lastName={"Doe"}
                    username={"johndoe"} />
                {
                    isPending ?
                        <ThemedView className="h-3/4 items-center justify-center">
                            <ThemedText>Loading</ThemedText>
                        </ThemedView>
                        :

                        isSuccess ?
                            <ThemedView className="h-3/4 items-center justify-center">
                                <ThemedText>Post created Successfully</ThemedText>
                            </ThemedView>
                            :

                            isError ?
                                <ThemedView className="h-3/4 items-center justify-center">
                                    <ThemedText>There was an issue, please try again later</ThemedText>
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
            <ThemedView className='flex-row justify-end mx-4'>
                {
                    isPending ?
                        <ThemedText>Pending</ThemedText>
                        :
                        <CustomButton style={{ width: 100 }} onPressFunc={() => onSubmit()}>
                            <ThemedText className="font-semibold text-center" lightColor="#ECEDEE" darkColor="#11181C">Post</ThemedText>
                        </CustomButton>
                }

            </ThemedView>
        </ThemedView>
    )
}

export default PostInput