import SearchBar from "@/components/ui/SearchBar";
import { ThemedText } from "@/components/ui/ThemedText";
import { ThemedView } from "@/components/ui/ThemedView";
import FollowUserCard from "@/components/users/FollowUserCard";
import { useAuth } from "@/context/AuthContext";
import { useUsers } from "@/hooks/query/useUsers";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";

export default function TabTwoScreen() {
  const [idToken, setIdToken] = useState<string>("")
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      setIdTokenAsync()
    }
  }, [user])

  const setIdTokenAsync = async () => {
    setIdToken("")
    if (user) {
      const token = await user?.getIdToken()
      setIdToken(token)
    }
  }

  const { isLoading, isError, data } = useUsers(idToken)
  return (
    <ThemedView mainContainer>
      <SearchBar />
      {

        isLoading ?
          <ThemedView className="w-full h-full pb-[144px] items-center justify-center">
            <ThemedText>Loading</ThemedText>
          </ThemedView>
          :
          isError ?
            <ThemedView className="w-full h-full pb-[144px] items-center justify-center">
              <ThemedText>
                There was an issue, please try again later
              </ThemedText>
            </ThemedView>
            :
            <FlatList
              data={data}
              renderItem={({ item }) => (
                <FollowUserCard {...item} />
              )}
            />

      }
    </ThemedView>
  );
}
