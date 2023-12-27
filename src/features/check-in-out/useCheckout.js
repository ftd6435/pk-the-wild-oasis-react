import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

function useCheckout() {
  const queryClient = useQueryClient();

  const {
    mutate: checkout,
    isLoading: isCheckingOut,
    error,
  } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, { status: "checked-out" }),
    onSuccess: (data) => {
      toast.success(`Booking ${data.id} successfully checked out`);
      queryClient.invalidateQueries({active: true});
    },
    onError: (data) =>
      toast.error(`There was an error checking out ${data.id}`),
  });

  return { checkout, isCheckingOut, error };
}

export default useCheckout;
