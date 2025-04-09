import axios from "../lib/axiosInstance"

export const fetchUsers = async () => {
    const response = await axios.get("/users")
    return response.data
}