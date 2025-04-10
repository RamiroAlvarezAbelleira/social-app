import PostCard from "@/components/posts/PostCard";
import CustomButton from "@/components/ui/CustomButton";
import HBar from "@/components/ui/HBar/HBar";
import { ThemedText } from "@/components/ui/ThemedText";
import { ThemedView } from "@/components/ui/ThemedView";
import { usePosts } from "@/hooks/query/usePosts";
import { FlatList } from "react-native";

export default function HomeScreen() {
  const { isLoading, isError, data, refetch } = usePosts()
  return (
    <ThemedView mainContainer className="flex-1">

      <HBar tabs={["For You", "Followed"]} defaultTab="For You" />
      {
        isLoading ?
          <ThemedView className="w-full h-full pb-[144px] items-center justify-center">
            <ThemedText>Loading</ThemedText>
          </ThemedView>
          :
          isError ?
            <ThemedView className="w-full h-full pb-[144px] gap-y-5 items-center justify-center">
              <ThemedText>Something went wrong. Please try again later</ThemedText>
              <CustomButton onPressFunc={() => refetch()}>
                <ThemedText className="font-semibold" lightColor="#ECEDEE" darkColor="#11181C">Reload</ThemedText>
              </CustomButton>
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
