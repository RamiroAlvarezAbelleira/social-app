import { createPost, fetchFollowedPosts, fetchGeneralPosts, fetchMyPosts, fetchPostById, fetchUserPosts, likePost } from "@/services/posts";
import { useMutation, useQuery } from "@tanstack/react-query";


export const useGeneralPosts = () => {
    return useQuery({
        queryKey: ['posts', 'general'],
        queryFn: fetchGeneralPosts
    })
}

export const useFollowedPosts = (idToken: string) => {
    return useQuery({
        queryKey: ['posts', 'followed', idToken],
        queryFn: () => fetchFollowedPosts(idToken)
    })
}

export const useMyPosts = (idToken: string) => {
    return useQuery({
        queryKey: ['my-posts'],
        queryFn: () => fetchMyPosts(idToken)
    })
}

export const useUserPosts = (id: string) => {
    return useQuery({
        queryKey: ["user-posts", id],
        queryFn: () => fetchUserPosts(id)
    })
}

export const useCreatePost = () => {
    return useMutation({
        mutationFn: createPost
    })
}

export const useLikePost = () => {
    return useMutation({
        mutationFn: likePost
    })
}

export const usePostById = (id: string) => {
    return useQuery({
        queryKey: ['post', id],
        queryFn: ({ queryKey }) => fetchPostById(queryKey[1] as string)
    })
}