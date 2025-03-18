import { apiClient } from "@/lib/apiClient";
import { useEffect, useState } from "react";

export function useRooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getRooms() {
      setLoading(true);

      try {
        const res = await apiClient.get("/rooms");
    
        if (res.data.success) {
          setLoading(false);
          return res.data.data.rooms;
        } else {
          setLoading(false);
          return null;
        }
    
      } catch (err) {
        console.log("Error while getting rooms", err);    
        setLoading(false);
        return null;
      }
    }

    getRooms()
      .then((res) => setRooms(res))
      .catch((err) => console.log("Error while getting rooms", err));
    
  }, []);

  return {loading, rooms};
}