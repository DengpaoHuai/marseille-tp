import { create } from "zustand";
import { Travel } from "../contexts/TravelContextProvider";
import { useEffect, useState } from "react";
import {
  deleteTravel,
  getTravels,
  postTravel,
  putTravel,
} from "../services/travels.service";

type TravelStore = {
  travels: Travel[];
  setTravels: () => Promise<void>;
  createTravel: (travel: Omit<Travel, "_id">) => Promise<void>;
  deleteTravelById: (id: string) => Promise<void>;
  updateTravelById: (id: string, travel: Omit<Travel, "_id">) => Promise<void>;
};

const useTravelStore = create<TravelStore>((set) => ({
  travels: [],
  setTravels: async () => {
    const response = await getTravels();
    set({ travels: response });
  },
  createTravel: async (travel: Omit<Travel, "_id">) => {
    const data = await postTravel(travel);
    set((state) => ({ travels: [...state.travels, data] }));
  },
  deleteTravelById: async (id: string) => {
    await deleteTravel(id);
    set((state) => ({
      travels: state.travels.filter((travel) => travel._id !== id),
    }));
  },
  updateTravelById: async (id: string, travel: Omit<Travel, "_id">) => {
    await putTravel(id, travel);
    set((state) => ({
      travels: state.travels.map((t) =>
        t._id === id ? { ...t, ...travel } : t
      ),
    }));
  },
}));

export const useTravel = () => {
  const {
    travels,
    setTravels,
    createTravel,
    deleteTravelById,
    updateTravelById,
  } = useTravelStore();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (travels.length) return;
    setLoading(true);
    setTravels().then(() => setLoading(false));
  }, []);

  return { travels, loading, createTravel, deleteTravelById, updateTravelById };
};
