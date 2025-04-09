import { fetchUserById, fetchUsers } from "@/services/users";
import { useQuery } from "@tanstack/react-query";


export const useUsers = () => {
    return useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers
    })
}

export const useUserById = (id: string) => {
    return useQuery({
        queryKey: ['user', id],
        queryFn: ({ queryKey }) => fetchUserById(queryKey[1] as string)
    })
}