import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Travel } from "../contexts/TravelContextProvider";
import { useTravel } from "../store/useTravelStore";

const TravelsList = () => {
  const { travels, loading, deleteTravelById } = useTravel();
  const navigate = useNavigate();

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>Travels List</h1>
      <Link to="/create_travel">Create Travel</Link>
      {travels.map((travel: Travel) => (
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
              deleteTravelById(travel._id);
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
