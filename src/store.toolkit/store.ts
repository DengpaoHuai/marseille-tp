import { configureStore } from "@reduxjs/toolkit";
import travelsReducer from "./slices/travels.slice";

const store = configureStore({
  reducer: {
    travels: travelsReducer,
    travels2: travelsReducer,
  },
});

export type StoreState = ReturnType<typeof store.getState>;

export default store;
