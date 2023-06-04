import axios from "axios";
import { Dispatch, SetStateAction, useState } from "react";

const useReservation = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createReservation = async ({
    slug,
    partySize,
    day,
    time,
    bookerFirstName,
    bookerLastName,
    bookerEmail,
    bookerPhone,
    bookerOccasion,
    bookerRequest,
    setDidBook,
  }: {
    slug: string;
    partySize: number;
    day: string;
    time: string;
    bookerFirstName: string;
    bookerLastName: string;
    bookerEmail: string;
    bookerPhone: string;
    bookerOccasion: string;
    bookerRequest: string;
    setDidBook: Dispatch<SetStateAction<boolean>>;
  }) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:3000/api/restaurant/${slug}/reserve`,
        {
          bookerFirstName,
          bookerLastName,
          bookerEmail,
          bookerPhone,
          bookerOccasion,
          bookerRequest,
        },
        {
          params: {
            partySize,
            day,
            time,
          },
        }
      );
      setLoading(false);
      setDidBook(true);
      return response.data;
    } catch (error: any) {
      setLoading(false);
      setError(error.response.data.errorMessage);
    }
  };
  return { loading, error, createReservation };
};

export default useReservation;
