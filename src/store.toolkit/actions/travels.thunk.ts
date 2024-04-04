import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllTravels = createAsyncThunk(
  "travels/getAllTravels",
  async () => {
    const response = await fetch(
      "https://crudcrud.com/api/fc63a333024340ec891fb35c31e5c652/travels"
    );
    return await response.json();
  }
);
