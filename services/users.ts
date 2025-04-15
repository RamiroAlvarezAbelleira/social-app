import axios from "../lib/axiosInstance"

export const fetchUsers = async () => {
    const response = await axios.get("/users")
    return response.data
}

export const fetchUserById = async (id: string) => {
    const response = await axios.get(`/users/${id}`)
    return response.data
}

interface registerParams {
    email: string,
    username: string,
    firstName: string,
    lastName: string,
    profilePicUrl: string,
    idToken: string
}

export const registerUser = async ({ email, username, firstName, lastName, profilePicUrl, idToken }: registerParams) => {
    const response = await axios.post("/users/register", { email, username, firstName, lastName, profilePicUrl }, {
        headers: {
            Authorization: `Bearer ${idToken}`
        }
    })
    return response.data
}