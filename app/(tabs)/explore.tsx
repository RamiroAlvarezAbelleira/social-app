import SearchBar from "@/components/ui/SearchBar";
import { ThemedView } from "@/components/ui/ThemedView";
import FollowUserCard from "@/components/users/FollowUserCard";
import posts from "@/mocks/posts";
import { FlatList } from "react-native";

export default function TabTwoScreen() {
  return (
    <ThemedView mainContainer>
      <SearchBar />
      <FlatList
        data={posts}
        renderItem={(post) => (
          <FollowUserCard {...post.item.author} />
        )}
      />
    </ThemedView>
  );
}
