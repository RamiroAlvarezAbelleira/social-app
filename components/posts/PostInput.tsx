import React from 'react'
import { ThemedView } from '../ui/ThemedView'
import { TextInput } from 'react-native'
import CustomButton from '../ui/CustomButton'
import { ThemedText } from '../ui/ThemedText'
import { useTheme } from '@react-navigation/native'
import User from '../users/User'

const PostInput = () => {
    const { colors } = useTheme()
    const onSubmit = () => {
        console.log("submited")
    }

    return (
        <ThemedView className='pb-4 mt-5 flex-1 justify-between'>
            <ThemedView className='mx-4 gap-y-4'>
                <User
                    profilePic={"https://randomuser.me/api/portraits/men/1.jpg"}
                    firstName={"John"}
                    lastName={"Doe"}
                    username={"johndoe"} />
            
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
            /></ThemedView>
            <ThemedView className='flex-row justify-end mx-4'>
                <CustomButton style={{ width: 100 }} onPressFunc={() => onSubmit()}>
                    <ThemedText className="font-semibold text-center" lightColor="#ECEDEE" darkColor="#11181C">Post</ThemedText>
                </CustomButton>
            </ThemedView>
        </ThemedView>
    )
}

export default PostInput