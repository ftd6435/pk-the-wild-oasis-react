import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../services/apiAuth";

export function useUsers() {
  const {
    data: users,
    error,
    isLoading: isLoadingUsers,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  return { users, isLoadingUsers, error };
}
