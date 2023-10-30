import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
// import { itemsReducer, addItem, removeItem } from "./slices/itemsSlice";
import { itemsApi } from "./apis/itemsApi";
import { customersApi } from "./apis/customersApi";
import { orderItemsApi } from "./apis/orderItemsApi";


// import { reset } from "./actions";

const store = configureStore({
  reducer: {
    // items: itemsReducer,
    [itemsApi.reducerPath] : itemsApi.reducer,
    [customersApi.reducerPath] : customersApi.reducer,
    [orderItemsApi.reducerPath] : orderItemsApi.reducer
    // customers: customersReducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
    .concat([itemsApi.middleware, customersApi.middleware, orderItemsApi.middleware])
  }
});

setupListeners(store.dispatch);
export { useFetchItemsQuery } from './apis/itemsApi';
export { useFetchCustomersQuery, useFetchCustomerQuery, useAddCustomerMutation, useDeleteCustomerMutation } from './apis/customersApi';
export { useFetchOrderItemsQuery, useFetchOrderItemQuery, useAddOrderItemMutation, useDeleteOrderItemMutation } from './apis/orderItemsApi';

export { store };