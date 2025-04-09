import PostCard from "@/components/posts/PostCard";
import HBar from "@/components/ui/HBar/HBar";
import { ThemedText } from "@/components/ui/ThemedText";
import { ThemedView } from "@/components/ui/ThemedView";
import { usePosts } from "@/hooks/query/usePosts";
import posts from "@/mocks/posts";
import { FlatList } from "react-native";

export default function HomeScreen() {
  const { isLoading, isError, data } = usePosts()
  return (
    <ThemedView mainContainer>

      <HBar tabs={["For You", "Followed"]} defaultTab="For You" />
      {
        isLoading ?
          <ThemedView className="w-full h-full pb-[144px] items-center justify-center">
            <ThemedText>Loading</ThemedText>
          </ThemedView>
          :
          isError ?
            <ThemedView className="w-full h-full pb-[144px] items-center justify-center">
              <ThemedText>Something went wrong. Please try again later</ThemedText>
            </ThemedView>
            :
            data && <FlatList
              data={data}
              renderItem={(post) => (
                <PostCard {...post.item} />
              )}
            />
      }
    </ThemedView>
  );
}
