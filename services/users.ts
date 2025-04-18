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

interface loginParams {
    idToken: string
}

export const loginUser = async ({ idToken }: loginParams) => {
    const response = await axios.post("/users/login", {}, {
        headers: {
            Authorization: `Bearer ${idToken}`
        }
    })
    return response.data
}

interface followUnfollowUserParams {
    idToken: string,
    followedUserId: string
}

export const followUnfollowUser = async ({ idToken, followedUserId }: followUnfollowUserParams) => {
    const response = await axios.put("/users/follow", { followedUserId }, {
        headers: {
            Authorization: `Bearer ${idToken}`
        }
    })
    return response.data
}