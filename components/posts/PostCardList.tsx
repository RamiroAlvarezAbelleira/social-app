import { PostType } from '@/types/post.types'
import React from 'react'
import PostCard from './PostCard'
import { FlatList } from 'react-native'

interface PostCardListProps {
    data: PostType[]
}

const PostCardList = ({ data }: PostCardListProps) => {
    return (
        <FlatList
            data={data}
            renderItem={(post) => (
                <PostCard {...post.item} />
            )}
        />
    )
}

export default PostCardList