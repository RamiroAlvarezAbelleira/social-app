import { ThemedView } from "@/components/ui/ThemedView";
import { FlatList } from "react-native";
import PostCardSkeleton from "../PostCardSkeleton";

const HomeSkeleton = () => {
    return (
        <ThemedView className="flex-1">
            <FlatList
                data={[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]}
                renderItem={() => (
                    <PostCardSkeleton isParent={false} />
                )}
            />
        </ThemedView>
    );
}

export default HomeSkeleton;