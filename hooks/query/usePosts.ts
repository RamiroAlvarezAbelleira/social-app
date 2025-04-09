import { createPost, fetchPosts } from "@/services/posts";
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