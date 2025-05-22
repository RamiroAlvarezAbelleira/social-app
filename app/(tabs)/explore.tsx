import SearchBar from "@/components/ui/SearchBar";
import { useDebounce } from "use-debounce"
import { ThemedText } from "@/components/ui/ThemedText";
import { ThemedView } from "@/components/ui/ThemedView";
import FollowUserList from "@/components/users/FollowUserList";
import { useAuth } from "@/context/AuthContext";
import { useUsers, useUsersSearch } from "@/hooks/query/useUsers";
import useIdToken from "@/hooks/useIdToken";
import { useState } from "react";

export default function TabTwoScreen() {
  const [searchInput, setSearchInput] = useState<string>("")
  const { user } = useAuth()

  const idToken = useIdToken(user)
  const [debouncedQuery] = useDebounce(searchInput, 400)

  const { isLoading, isError, data } = debouncedQuery
    ? useUsersSearch(debouncedQuery)
    : useUsers(idToken)

  return (
    <ThemedView mainContainer>
      <SearchBar value={searchInput} onChange={setSearchInput} />
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
            <FollowUserList data={data} />
      }
    </ThemedView>
  );
}
