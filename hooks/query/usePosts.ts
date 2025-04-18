import { createPost, fetchPostById, fetchPosts, likePost } from "@/services/posts";
import { useMutation, useQuery } from "@tanstack/react-query";


export const usePosts = () => {
    return useQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts
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