import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Travel, TravelContext } from "../contexts/TravelContextProvider";
import { useDispatch, useSelector } from "react-redux";
import { setTravels } from "../store/slices/travels.slice";
import { StoreState } from "../store/store";
import { getAllTravels } from "../store/actions/travels.thunk";

const TravelsList = () => {
  const { travels, isLoading } = useSelector(
    (state: StoreState) => state.travels
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllTravels());
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>Travels List</h1>
      <Link to="/create_travel">Create Travel</Link>
      {travels.map((travel: Travel) => (
        <div
          key={travel._id}
          onClick={() => {
            // deleteTravelById(travel._id);
            navigate(`/update_travel/${travel._id}`);
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
