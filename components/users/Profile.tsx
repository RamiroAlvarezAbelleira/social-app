import React from 'react'
import { ThemedView } from '../ui/ThemedView'
import User from './User'
import { Image } from 'react-native'
import { ThemedText } from '../ui/ThemedText'
import HBar from '../ui/HBar/HBar'
import { UserType } from '@/types/user.types'

const Profile = ({ username, firstName, lastName, profilePicUrl }: UserType) => {
    return (
        <ThemedView className='gap-y-4 mx-4'>
            <User userProfile profilePicUrl={profilePicUrl} firstName={firstName} lastName={lastName} username={username} />

            <ThemedView className='flex-row ml-4 gap-x-2 items-center'>
                <Image
                    source={{ uri: profilePicUrl }}
                    className='w-[25px] h-[25px] rounded-full'
                />
                <ThemedText darkColor='#c0c0c0'>3 Followers</ThemedText>
            </ThemedView>
            <HBar tabs={["Posted", "Reposted", "Answers"]} defaultTab='Posted' />
        </ThemedView>
    )
}

export default Profile