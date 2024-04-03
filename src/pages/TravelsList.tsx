import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Travel = {
  _id: string;
  name: string;
  date: string;
};

const TravelsList = () => {
  const [travels, setTravels] = useState([]);

  useEffect(() => {
    fetch("https://crudcrud.com/api/dd4cdbda378341509e40b77fa154939f/travels")
      .then((response) => response.json())
      .then((data) => setTravels(data));
  }, []);

  return (
    <div>
      <h1>Travels List</h1>
      <Link to="/create_travel">Create Travel</Link>
      {travels.map((travel: Travel) => (
        <div key={travel._id}>
          <h2>{travel.name}</h2>
          <p>{travel.date}</p>
        </div>
      ))}
    </div>
  );
};
export default TravelsList;
