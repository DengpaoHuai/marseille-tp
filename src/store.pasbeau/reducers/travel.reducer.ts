import { Travel } from "../../contexts/TravelContextProvider";
import { CREATE_TRAVEL, SET_ALL_TRAVEL } from "../actions/travels.actions";

const initialState = {
  travels: [],
};

const travelReducer = (
  state = initialState,
  action: {
    type: string;
    payload: Omit<Travel, "_id"> | Travel[];
  }
) => {
  switch (action.type) {
    case CREATE_TRAVEL:
      return {
        ...state,
        travels: [...state.travels, action.payload],
      };
    case SET_ALL_TRAVEL:
      return {
        ...state,
        travels: action.payload,
      };
    default:
      return state;
  }
};

export default travelReducer;
