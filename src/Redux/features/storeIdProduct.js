import { createSlice } from "@reduxjs/toolkit";

export const storeIdProductData = createSlice({
  name: "storeIdProduct",
  initialState: {},
  reducers: {
    setStoreIdProduct: (state, action) => {
      return action.payload;
    },
  },
});
export const { setStoreIdProduct } = storeIdProductData.actions;

export default storeIdProductData.reducer;
