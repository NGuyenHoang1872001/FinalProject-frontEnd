import { configureStore } from "@reduxjs/toolkit";
import loggedInData from "../features/auth";

const store = configureStore({
  reducer: {
    auth: loggedInData,
  },
});
export default store;
