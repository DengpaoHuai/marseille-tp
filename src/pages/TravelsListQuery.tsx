import { useContext } from "react";
import { Link } from "react-router-dom";
import { Travel, TravelContext } from "../contexts/TravelContextProvider";
import { useQuery } from "@tanstack/react-query";

const TravelsList = () => {
  const { data: travels } = useQuery({
    queryKey: ["travels"],
    queryFn: async () => {
      const response = await fetch(
        "https://crudcrud.com/api/dd4cdbda378341509e40b77fa154939f/travels"
      );
      return await response.json();
    },
    gcTime: 10000000,
    staleTime: 10000000,
  });
  return (
    <div>
      <h1>Travels List</h1>
      <Link to="/create_travel">Create Travel</Link>
      {travels?.map((travel: Travel) => (
        <div
          key={travel._id}
          onClick={() => {
            deleteTravelById(travel._id);
          }}
        >
          <h2>{travel.name}</h2>
          <p>{travel.date}</p>
        </div>
      ))}
    </div>
  );
};
export default TravelsList;
