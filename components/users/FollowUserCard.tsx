import { UserType } from "@/types/user.types"
import CustomButton from "../ui/CustomButton"
import { ThemedView } from "../ui/ThemedView"
import User from "./User"
import { ThemedText } from "../ui/ThemedText"

const FollowUserCard = ({ profilePic, firstName, lastName, username }: UserType) => {

    const followFunction = () => {
        console.log("pressed")
    }

    return (
        <ThemedView className="mx-4 flex-row justify-between items-center mt-5 pb-5 border-b border-b-2">
            <User profilePic={profilePic} firstName={firstName} lastName={lastName} username={username} />
            <CustomButton onPressFunc={() => followFunction()}>
                <ThemedText className="font-semibold" lightColor="#ECEDEE" darkColor="#11181C">Follow</ThemedText>
            </CustomButton>
        </ThemedView>
    )
}

export default FollowUserCard