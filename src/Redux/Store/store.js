import { configureStore } from "@reduxjs/toolkit";
import loggedInData from "../features/auth";
import storeIdProduct from "../features/storeIdProduct";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
const persistConfigStoreID = {
  key: "root2",
  version: 2,
  storage,
};
const persistedReducer = persistReducer(persistConfig, loggedInData);
const storeIdOfProduct = persistReducer(persistConfigStoreID, storeIdProduct);

const store = configureStore({
  reducer: {
    auth: persistedReducer,
    storeIdProduct: storeIdOfProduct,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
