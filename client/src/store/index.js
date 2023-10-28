import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
// import { itemsReducer, addItem, removeItem } from "./slices/itemsSlice";
import { itemsApi } from "./apis/itemsApi";

// import { reset } from "./actions";

const store = configureStore({
  reducer: {
    // items: itemsReducer,
    [itemsApi.reducerPath] : itemsApi.reducer
    // customers: customersReducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
    .concat(itemsApi.middleware)
  }
});

setupListeners(store.dispatch);
export { useFetchItemsQuery } from './apis/itemsApi';

export { store };