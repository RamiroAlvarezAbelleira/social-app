import { UserType } from "@/types/user.types"
import FollowUserCard from "./FollowUserCard"
import { FlatList } from "react-native"

interface FollowUserListProps {
    data: UserType[]
}

const FollowUserList = ({ data }: FollowUserListProps) => {

    return (
        <FlatList
            data={data}
            renderItem={({ item }) => (
                <FollowUserCard {...item} />
            )}
        />
    )
}

export default FollowUserList