import { fetchFollowers, fetchMyFollowers, fetchUserById, fetchUsers, fetchUsersSearch, followUnfollowUser } from "@/services/users";
import { useMutation, useQuery } from "@tanstack/react-query";


export const useUsers = (id: string) => {
    return useQuery({
        queryKey: ['users', id],
        queryFn: () => fetchUsers(id)
    })
}

export const useUsersSearch = (query: string) => {
    return useQuery({
        queryKey: ['users', 'search', query],
        queryFn: () => fetchUsersSearch(query)
    })
}

export const useGetFollowers = (id: string) => {
    return useQuery({
        queryKey: ['followers'],
        queryFn: () => fetchFollowers(id)
    })
}

export const useGetMyFollowers = (id: string) => {
    return useQuery({
        queryKey: ['my-followers'],
        queryFn: () => fetchMyFollowers(id)
    })
}

export const useUserById = (id: string) => {
    return useQuery({
        queryKey: ['user', id],
        queryFn: () => fetchUserById(id)
    })
}

export const useFollowUnfollowUser = () => {
    return useMutation({
        mutationFn: followUnfollowUser
    })
}