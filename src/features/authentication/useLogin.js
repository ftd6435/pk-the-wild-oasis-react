import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    mutate: login,
    isLoading: isLogingIn,
    error,
  } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      toast.success("User successfully logged in");
      queryClient.setQueryData(["user"], user.user); // Avoid reloading the user once logged in
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      console.error(`ERROR: ${err}`);
      toast.error(`Provided email or password are incorrect`);
    },
  });

  return { login, isLogingIn, error };
}
