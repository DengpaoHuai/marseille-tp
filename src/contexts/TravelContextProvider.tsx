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
    fetch("https://crudcrud.com/api/dd4cdbda378341509e40b77fa154939f/travels")
      .then((response) => response.json())
      .then((data) => {
        setTravels(data);
      });
  }, []);

  const deleteTravelById = async (id: string) => {
    await fetch(
      `https://crudcrud.com/api/dd4cdbda378341509e40b77fa154939f/travels/${id}`,
      {
        method: "DELETE",
      }
    );
    setTravels(travels.filter((travel) => travel._id !== id));
    return "true";
  };

  const addTravel = async (travel: Omit<Travel, "_id">) => {
    const response = await fetch(
      "https://crudcrud.com/api/dd4cdbda378341509e40b77fa154939f/travels",
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

  return (
    <TravelContext.Provider value={{ travels, deleteTravelById, addTravel }}>
      {children}
    </TravelContext.Provider>
  );
};

export default TravelContextProvider;
