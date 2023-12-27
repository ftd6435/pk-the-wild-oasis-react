import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser as updateUserApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const {
    mutate: updateUser,
    error,
    isLoading: isUpdatingUser,
  } = useMutation({
    mutationFn: ({ fullName, password, avatar }) =>
      updateUserApi({ fullName, password, avatar }),
    onSuccess: (data) => {
      toast.success("User account successfully updated");
      //   queryClient.setQueryData(["user"], data.user); // To load the updated data automatically with this manual line code
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => toast.error("There was an error updating the user"),
  });

  return { updateUser, error, isUpdatingUser };
}
