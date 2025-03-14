import PostCard from "@/components/posts/PostCard";
import { ThemedText } from "@/components/ui/ThemedText";
import { ThemedView } from "@/components/ui/ThemedView";
import posts from "@/mocks/posts";
import { FlatList } from "react-native";

export default function HomeScreen() {
  return (
    <ThemedView mainContainer>
      <FlatList
        data={posts}
        renderItem={(post) => (
          <PostCard {...post.item} />
        )}
      />
    </ThemedView>
  );
}
