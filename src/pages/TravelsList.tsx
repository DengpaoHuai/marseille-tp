import { Link, useNavigate } from "react-router-dom";
import { Travel } from "../contexts/TravelContextProvider";
import { useQuery } from "@tanstack/react-query";
import { getTravels } from "../services/travels.service";

const TravelsList = () => {
  const { data: travels } = useQuery({
    queryKey: ["toto"],
    queryFn: getTravels,
    staleTime: 10000000,
    gcTime: 10000000,
  });
  const navigate = useNavigate();

  return (
    <div>
      <h1>Travels List</h1>
      <Link to="/create_travel">Create Travel</Link>
      {travels?.map((travel: Travel) => (
        <div key={travel._id}>
          <h2>{travel.name}</h2>
          <p>{travel.date}</p>
          <button
            onClick={() => {
              navigate(`/update_travel/${travel._id}`);
            }}
          >
            modifier
          </button>
          <button
            onClick={() => {
              //  deleteTravelById(travel._id);
            }}
          >
            supprimer
          </button>
        </div>
      ))}
    </div>
  );
};
export default TravelsList;
