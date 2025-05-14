import { UserType } from '@/types/user.types'
import React, { useState } from 'react'
import { Image } from 'react-native'
import HBar from '../ui/HBar/HBar'
import { ThemedText } from '../ui/ThemedText'
import { ThemedView } from '../ui/ThemedView'
import User from './User'
import { useThemeColor } from '@/hooks/useThemeColor'
import FollowUserList from './FollowUserList'
import { PostType } from '@/types/post.types'
import PostCardList from '../posts/PostCardList'

const tabs = ["Following", "Posted", "Reposted", "Answers"]

interface ProfileProps {
    _id?: string;
    firstName: string;
    lastName: string;
    username: string;
    profilePicUrl: string;
    followers: UserType[],
    following: UserType[],
    posts: PostType[]
}

const Profile = ({ username, firstName, lastName, profilePicUrl, followers, following, posts }: ProfileProps) => {
    const [selectedTab, setSelectedTab] = useState<String>('Following')
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
            <HBar tabs={tabs} defaultTab='Following' setSelectedTab={setSelectedTab} />
            {
                selectedTab === "Following" &&
                following &&
                <FollowUserList data={following} />
            }
            {
                selectedTab === "Posted" &&
                <PostCardList data={posts} />
            }
            {
                selectedTab === "Reposted" &&
                <ThemedText>Reposted</ThemedText>
            }
            {
                selectedTab === "Answers" &&
                <ThemedText>Answers</ThemedText>
            }
        </ThemedView>
    )
}

export default Profile