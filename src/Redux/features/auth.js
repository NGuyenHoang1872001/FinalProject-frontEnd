import { createSlice } from "@reduxjs/toolkit";

export const loggedInData = createSlice({
  name: "loggedInUser",
  initialState: {},
  reducers: {
    setLoggedInUser: (state, action) => {
      return action.payload;
    },
  },
});
export const { setLoggedInUser } = loggedInData.actions;

export default loggedInData.reducer;
