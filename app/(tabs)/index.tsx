import PostCard from "@/components/posts/PostCard";
import CustomButton from "@/components/ui/CustomButton";
import HBar from "@/components/ui/HBar/HBar";
import HomeSkeleton from "@/components/ui/skeletonLoaders/screens/HomeSkeleton";
import { ThemedText } from "@/components/ui/ThemedText";
import { ThemedView } from "@/components/ui/ThemedView";
import { useAuth } from "@/context/AuthContext";
import { usePosts } from "@/hooks/query/usePosts";
import { Redirect } from "expo-router";
import { useState } from "react";
import { FlatList } from "react-native";

export default function HomeScreen() {
  const { isLoading, isError, data, refetch } = usePosts()
  const [selectedTab, setSelectedTab] = useState<string>("For You")
  const { user } = useAuth()
  if (!user) {
    return <Redirect href={"/login"} />
  }
  return (
    <ThemedView mainContainer className="flex-1">

      <HBar tabs={["For You", "Followed"]} defaultTab="For You" setSelectedTab={setSelectedTab} />
      {
        isLoading ?
          <HomeSkeleton />
          :
          isError ?
            <ThemedView className="w-full h-full pb-[144px] gap-y-5 items-center justify-center">
              <ThemedText>Something went wrong. Please try again later</ThemedText>
              <ThemedView>
                <CustomButton onPressFunc={() => refetch()}>
                  <ThemedText className="font-semibold" lightColor="#ECEDEE" darkColor="#11181C">Reload</ThemedText>
                </CustomButton>
              </ThemedView>
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
