import { fetchPosts } from "@/services/posts";
import { useQuery } from "@tanstack/react-query";


export const usePosts = () => {
    return useQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts
    })
} 