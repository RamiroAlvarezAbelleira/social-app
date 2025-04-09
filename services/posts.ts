import axios from "../lib/axiosInstance"

export const fetchPosts = async () => {
    const response = await axios.get('/posts')
    return response.data
}