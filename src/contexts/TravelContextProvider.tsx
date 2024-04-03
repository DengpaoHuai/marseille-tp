import { createContext, useState, useEffect } from "react";

type TravelContextType = {
  travels: Array<Travel>;
  deleteTravelById: (id: string) => Promise<string>;
};
export const TravelContext = createContext<TravelContextType>(
  {} as TravelContextType
);

export type Travel = {
  _id: string;
  name: string;
  date: string;
};

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

  return (
    <TravelContext.Provider value={{ travels, deleteTravelById }}>
      {children}
    </TravelContext.Provider>
  );
};

export default TravelContextProvider;
