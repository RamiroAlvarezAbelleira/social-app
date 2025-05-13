import { createPost, fetchMyPosts, fetchPostById, fetchPosts, fetchUserPosts, likePost } from "@/services/posts";
import { useMutation, useQuery } from "@tanstack/react-query";


export const usePosts = () => {
    return useQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts
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