import { fetchUsers } from "@/services/users";
import { useQuery } from "@tanstack/react-query";


export const useUsers = () => {
    return useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers
    })
}