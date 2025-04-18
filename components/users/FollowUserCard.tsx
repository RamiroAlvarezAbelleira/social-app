import { UserType } from "@/types/user.types"
import CustomButton from "../ui/CustomButton"
import { ThemedView } from "../ui/ThemedView"
import User from "./User"
import { ThemedText } from "../ui/ThemedText"
import { useTheme } from "@react-navigation/native"
import { useFollowUnfollowUser } from "@/hooks/query/useUsers"
import { useEffect, useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { useQueryClient } from "@tanstack/react-query"

const FollowUserCard = ({ _id, profilePicUrl, firstName, lastName, username }: UserType) => {
    const { colors } = useTheme()
    const [idToken, setIdToken] = useState<string | null>()
    const { user, dbUser, setDbUser } = useAuth()
    const queryClient = useQueryClient()
    useEffect(() => {
        setIdTokenAsync()
    }, [dbUser])

    const setIdTokenAsync = async () => {
        setIdToken(null)
        if (user) {
            const token = await user?.getIdToken()
            setIdToken(token)
        }
    }

    const { mutate } = useFollowUnfollowUser()
    const followFunction = () => {

        if (_id && idToken) {
            mutate({ idToken, followedUserId: _id }, {
                onSuccess: (data) => {
                    console.log("set db user: ", data)
                    setDbUser(data)
                    queryClient.invalidateQueries({ queryKey: ['users'] })
                },
                onError: (error) => {
                    console.error("Error: ", error.message)
                }
            })
        }
    }

    return (
        <ThemedView
            className="mx-4 flex-row justify-between items-center mt-5 pb-5 border-b border-b-2"
            style={{ borderColor: colors.border }}
        >
            <User profilePicUrl={profilePicUrl} firstName={firstName} lastName={lastName} username={username} />

            {
                dbUser?.following?.includes(_id ?? "") ?
                    <ThemedView>
                        <CustomButton onPressFunc={() => followFunction()}>
                            <ThemedText className="font-semibold" lightColor="#ECEDEE" darkColor="#11181C">Unfollow</ThemedText>
                        </CustomButton>
                    </ThemedView>
                    :
                    <ThemedView>
                        <CustomButton onPressFunc={() => followFunction()}>
                            <ThemedText className="font-semibold" lightColor="#ECEDEE" darkColor="#11181C">Follow</ThemedText>
                        </CustomButton>
                    </ThemedView>
            }

        </ThemedView>
    )
}

export default FollowUserCard