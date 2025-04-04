import PostCard from "@/components/posts/PostCard";
import HBar from "@/components/ui/HBar";
import { ThemedView } from "@/components/ui/ThemedView";
import posts from "@/mocks/posts";
import { FlatList } from "react-native";

export default function HomeScreen() {
  return (
    <ThemedView mainContainer>

      <HBar tabs={["For You", "Followed"]} />
      <FlatList
        data={posts}
        renderItem={(post) => (
          <PostCard {...post.item} />
        )}
      />
    </ThemedView>
  );
}
