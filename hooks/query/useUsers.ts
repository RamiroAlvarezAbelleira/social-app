import { fetchFollowers, fetchUserById, fetchUsers, followUnfollowUser } from "@/services/users";
import { useMutation, useQuery } from "@tanstack/react-query";


export const useUsers = (id: string) => {
    return useQuery({
        queryKey: ['users', id],
        queryFn: ({ queryKey }) => fetchUsers(queryKey[1] as string)
    })
}

export const useGetFollowers = (id: string) => {
    return useQuery({
        queryKey: ['followers'],
        queryFn: () => fetchFollowers(id)
    })
}

export const useUserById = (id: string) => {
    return useQuery({
        queryKey: ['user', id],
        queryFn: ({ queryKey }) => fetchUserById(queryKey[1] as string)
    })
}

export const useFollowUnfollowUser = () => {
    return useMutation({
        mutationFn: followUnfollowUser
    })
}