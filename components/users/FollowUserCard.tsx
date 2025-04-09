import { UserType } from "@/types/user.types"
import CustomButton from "../ui/CustomButton"
import { ThemedView } from "../ui/ThemedView"
import User from "./User"
import { ThemedText } from "../ui/ThemedText"
import { useTheme } from "@react-navigation/native"

const FollowUserCard = ({ profilePicUrl, firstName, lastName, username }: UserType) => {
    const { colors } = useTheme()
    const followFunction = () => {
        console.log("pressed")
    }

    return (
        <ThemedView
            className="mx-4 flex-row justify-between items-center mt-5 pb-5 border-b border-b-2"
            style={{ borderColor: colors.border }}
        >
            <User profilePicUrl={profilePicUrl} firstName={firstName} lastName={lastName} username={username} />
            <CustomButton onPressFunc={() => followFunction()}>
                <ThemedText className="font-semibold" lightColor="#ECEDEE" darkColor="#11181C">Follow</ThemedText>
            </CustomButton>
        </ThemedView>
    )
}

export default FollowUserCard