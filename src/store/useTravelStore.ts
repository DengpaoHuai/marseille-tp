import { create } from "zustand";
import { Travel } from "../contexts/TravelContextProvider";
import { useEffect, useState } from "react";

type TravelStore = {
  travels: Travel[];
  setTravels: () => Promise<void>;
};

const useTravelStore = create<TravelStore>((set) => ({
  travels: [],
  setTravels: async () => {
    const response = await fetch(
      "https://crudcrud.com/api/fc63a333024340ec891fb35c31e5c652/travels"
    );
    const data: Travel[] = await response.json();
    set({ travels: data });
  },
}));

export const useTravel = () => {
  const { travels, setTravels } = useTravelStore();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (travels.length) return;
    setLoading(true);
    setTravels().then(() => setLoading(false));
  }, []);

  return { travels, loading };
};
