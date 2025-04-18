import { createPostType, likePostType, PostType } from "@/types/post.types"
import axios from "../lib/axiosInstance"

export const fetchPosts = async () => {
    const response = await axios.get('/posts')
    return response.data
}

export const fetchPostById = async (id: string) => {
    const response = await axios.get(`/posts/${id}`)
    return response.data
}

export const createPost = async ({ message, userId, postId, idToken }: createPostType): Promise<PostType> => {
    const response = await axios.post<PostType>("/posts", { message, userId, postId }, {
        headers: {
            Authorization: `Bearer ${idToken}`
        }
    })
    return response.data
}

export const likePost = async ({ userId, postId, idToken }: likePostType): Promise<PostType> => {
    const response = await axios.put<PostType>(`/posts/like/${postId}`, { userId }, {
        headers: {
            Authorization: `Bearer ${idToken}`
        }
    })
    return response.data
}