import { createContext, useState, useEffect } from "react";

export type Travel = {
  _id: string;
  name: string;
  date: string;
};

type TravelContextType = {
  travels: Array<Travel>;
  deleteTravelById: (id: string) => Promise<string>;
  addTravel: (travel: Omit<Travel, "_id">) => Promise<void>;
  updateTravelById: (id: string, travel: Omit<Travel, "_id">) => Promise<void>;
  getTravelById: (id: string) => Travel | undefined;
};
export const TravelContext = createContext<TravelContextType>(
  {} as TravelContextType
);

type TravelContextProviderProps = {
  children: React.ReactNode;
};

const TravelContextProvider: React.FC<TravelContextProviderProps> = ({
  children,
}) => {
  const [travels, setTravels] = useState<Array<Travel>>([]);

  useEffect(() => {
    fetch("https://crudcrud.com/api/fc63a333024340ec891fb35c31e5c652/travels")
      .then((response) => response.json())
      .then((data) => {
        setTravels(data);
      });
  }, []);

  const deleteTravelById = async (id: string) => {
    await fetch(
      `https://crudcrud.com/api/fc63a333024340ec891fb35c31e5c652/travels/${id}`,
      {
        method: "DELETE",
      }
    );
    setTravels(travels.filter((travel) => travel._id !== id));
    return "true";
  };

  const addTravel = async (travel: Omit<Travel, "_id">) => {
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
    const newTravel = await response.json();
    setTravels([...travels, newTravel]);
  };

  const getTravelById = (id: string) => {
    return travels.find((travel) => travel._id === id);
  };

  const updateTravelById = async (id: string, travel: Omit<Travel, "_id">) => {
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
    setTravels(
      travels.map((t) => {
        if (t._id === id) {
          return { ...t, ...travel };
        }
        return t;
      })
    );
  };

  return (
    <TravelContext.Provider
      value={{
        travels,
        deleteTravelById,
        addTravel,
        updateTravelById,
        getTravelById,
      }}
    >
      {children}
    </TravelContext.Provider>
  );
};

export default TravelContextProvider;
