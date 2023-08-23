import axios from "axios";
import { useState } from "react";

const useAvailabilities = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<
    { time: string; available: boolean }[] | null
  >(null);
  const fetchAvailabilities = async ({
    slug,
    partySize,
    day,
    time,
  }: {
    slug: string;
    partySize: number;
    day: string;
    time: string;
  }) => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/restaurant/${slug}/availability`, {
        params: {
          partySize,
          day,
          time,
        },
      });
      setLoading(false);
      setData(response.data.availabilities);
    } catch (error: any) {
      setLoading(false);
      setError(error.response.data.errorMessage);
    }
  };
  return { loading, data, error, fetchAvailabilities };
};

export default useAvailabilities;
