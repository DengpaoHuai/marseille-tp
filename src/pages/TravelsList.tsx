import { useContext } from "react";
import { Link } from "react-router-dom";
import { Travel, TravelContext } from "../contexts/TravelContextProvider";

const TravelsList = () => {
  const { travels, deleteTravelById } = useContext(TravelContext);

  return (
    <div>
      <h1>Travels List</h1>
      <Link to="/create_travel">Create Travel</Link>
      {travels.map((travel: Travel) => (
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
