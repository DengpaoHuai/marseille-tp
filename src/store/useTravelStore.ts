import { create } from "zustand";
import { Travel } from "../contexts/TravelContextProvider";
import { useEffect, useState } from "react";

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
    const response = await fetch(
      "https://crudcrud.com/api/fc63a333024340ec891fb35c31e5c652/travels"
    );
    const data: Travel[] = await response.json();
    set({ travels: data });
  },
  createTravel: async (travel: Omit<Travel, "_id">) => {
    const response = await fetch(
      "https://crudcrud.com/api/fc63a333024340ec891fb35c31e5c652/travels",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(travel),
      }
    );
    const data: Travel = await response.json();
    set((state) => ({ travels: [...state.travels, data] }));
  },
  deleteTravelById: async (id: string) => {
    await fetch(
      `https://crudcrud.com/api/fc63a333024340ec891fb35c31e5c652/travels/${id}`,
      {
        method: "DELETE",
      }
    );
    set((state) => ({
      travels: state.travels.filter((travel) => travel._id !== id),
    }));
  },
  updateTravelById: async (id: string, travel: Omit<Travel, "_id">) => {
    await fetch(
      `https://crudcrud.com/api/fc63a333024340ec891fb35c31e5c652/travels/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(travel),
      }
    );
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
