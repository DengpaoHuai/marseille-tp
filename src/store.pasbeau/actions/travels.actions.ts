import { Travel } from "../../contexts/TravelContextProvider";
export const CREATE_TRAVEL = "CREATE_TRAVEL";
export const SET_ALL_TRAVEL = "SET_ALL_TRAVEL";

export const createTravel = (travel: Omit<Travel, "_id">) => {
  return {
    type: CREATE_TRAVEL,
    payload: travel,
  };
};

export const setAllTravel = (travels: Travel[]) => {
  return {
    type: SET_ALL_TRAVEL,
    payload: travels,
  };
};
