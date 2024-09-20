import { useEffect, useState } from "react";
import { SERVER_APIKEY } from "../utils/constants";

function useApiFetch(URL) {
  const [FetchedInfo, setFetchedInfo] = useState("");
  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        const res = await fetch(URL, { headers: { apikey: SERVER_APIKEY } });
        if (!res.ok) {
          throw new Error("Error Serving Restaurant Data");
        } else {
          const data = await res.json();
          // console.log(data?.data)
          setFetchedInfo(data)
        }
      } catch (error) {
        console.log("Error fetching data:", error)
      }
    };

    fetchRestaurantData();
  }, [])
  return FetchedInfo;
}

export default useApiFetch;
