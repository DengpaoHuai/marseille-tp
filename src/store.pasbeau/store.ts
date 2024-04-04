import { createStore } from "redux";
import travelReducer from "./reducers/travel.reducer";

//@ts-ignore
const store = createStore(travelReducer);

export default store;
