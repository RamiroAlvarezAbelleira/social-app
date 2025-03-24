import PostCard from "@/components/posts/PostCard";
import SearchBar from "@/components/ui/SearchBar";
import { ThemedView } from "@/components/ui/ThemedView";
import posts from "@/mocks/posts";
import { FlatList } from "react-native";

export default function TabTwoScreen() {
  return (
    <ThemedView mainContainer>
      <SearchBar />
      <FlatList
        data={posts}
        renderItem={(post) => (
          <PostCard {...post.item} />
        )}
      />
    </ThemedView>
  );
}
