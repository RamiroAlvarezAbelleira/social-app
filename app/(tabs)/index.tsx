import PostCard from "@/components/posts/PostCard";
import { ThemedText } from "@/components/ui/ThemedText";
import { ThemedView } from "@/components/ui/ThemedView";
import posts from "@/mocks/posts";

export default function HomeScreen() {
  return (
    <ThemedView mainContainer>
      <ThemedText>Home</ThemedText>
      {posts.map((post) => (
        <PostCard key={post.id} {...post} />
      ))}
    </ThemedView>
  );
}
