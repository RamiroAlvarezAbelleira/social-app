import { UserType } from '@/types/user.types'
import React from 'react'
import { Image } from 'react-native'
import HBar from '../ui/HBar/HBar'
import { ThemedText } from '../ui/ThemedText'
import { ThemedView } from '../ui/ThemedView'
import User from './User'
import { useThemeColor } from '@/hooks/useThemeColor'

const Profile = ({ username, firstName, lastName, profilePicUrl, followers }: UserType) => {
    const followerColor = useThemeColor({}, "text")
    return (
        <ThemedView className='gap-y-4 mx-4'>
            <User userProfile profilePicUrl={profilePicUrl} firstName={firstName} lastName={lastName} username={username} />
            <ThemedView className='flex-row ml-4 gap-x-2 items-center'>
                {followers && followers?.length > 0 ?
                    <Image
                        source={{ uri: followers[0].profilePicUrl }}
                        className='w-[25px] h-[25px] rounded-full'
                    />
                    :
                    <ThemedView className='w-[25px] h-[25px] rounded-full' style={{ backgroundColor: followerColor }} />
                }

                <ThemedText darkColor='#c0c0c0'>{followers?.length ?? 0} Followers</ThemedText>
            </ThemedView>
            <HBar tabs={["Posted", "Reposted", "Answers"]} defaultTab='Posted' />
        </ThemedView>
    )
}

export default Profile