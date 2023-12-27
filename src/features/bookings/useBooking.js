import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

function useBooking() {
  const { bookingId } = useParams();

  const {
    data: booking = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookings", bookingId],
    queryFn: () => getBooking(bookingId),
    retry: false, // TURN OFF the React Query default number of fetching which is basically three times in case the first or second fails
  });

  return { booking, isLoading, error };
}

export default useBooking;
