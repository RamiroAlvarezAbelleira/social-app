import axios from "../lib/axiosInstance"

export const fetchUsers = async () => {
    const response = await axios.get("/users")
    return response.data
}

export const fetchUserById = async (id: string) => {
    const response = await axios.get(`/users/${id}`)
    return response.data
}