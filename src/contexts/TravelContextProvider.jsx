import { createContext, useState, useEffect } from "react";

export const TravelContext = createContext();

const TravelContextProvider = ({ children }) => {
  const [travels, setTravels] = useState([]);

  useEffect(() => {
    //const data = JSON.parse(sessionStorage.getItem("travels"));
    // if (data) return setTravels(data);
    fetch("https://crudcrud.com/api/dd4cdbda378341509e40b77fa154939f/travels")
      .then((response) => response.json())
      .then((data) => {
        setTravels(data);
        // sessionStorage.setItem("travels", JSON.stringify(data));
      });
  }, []);

  const deleteTravelById = async (id) => {
    await fetch(
      `https://crudcrud.com/api/dd4cdbda378341509e40b77fa154939f/travels/${id}`,
      {
        method: "DELETE",
      }
    );
    setTravels(travels.filter((travel) => travel._id !== id));
  };

  return (
    <TravelContext.Provider value={{ travels, deleteTravelById }}>
      {children}
    </TravelContext.Provider>
  );
};

export default TravelContextProvider;
