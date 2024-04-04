import { createSlice } from "@reduxjs/toolkit";
import { getAllTravels } from "../actions/travels.thunk";
import { Travel } from "../../contexts/TravelContextProvider";

type TravelSlice = {
  travels: Travel[];
  isLoading: boolean;
  error: null | string;
};

const initialState: TravelSlice = {
  travels: [],
  isLoading: false,
  error: null,
};

const travelsSlice = createSlice({
  name: "travels",
  initialState,
  reducers: {
    setTravels(state, action) {
      state.travels = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllTravels.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getAllTravels.fulfilled, (state, action) => {
      state.isLoading = false;
      state.travels = action.payload;
    });
    builder.addCase(getAllTravels.rejected, (state, action) => {
      state.isLoading = false;
      if (action.error.message) {
        state.error = action.error.message;
      } else {
        state.error = "An error occurred";
      }
    });
  },
});

export const { setTravels } = travelsSlice.actions;

export default travelsSlice.reducer;
