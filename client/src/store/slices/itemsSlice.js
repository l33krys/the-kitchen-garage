import { createSlice } from "@reduxjs/toolkit";

const itemsSlice = createSlice({
    name: "item",
    initialState: [],
    reducers: {
      addItem(state, action) {
        state.push(action.payload);
      },
      removeItem(state, action) {
        const index = state.indexOf(action.payload);
        state.splice(index, 1);
      }
    },
    // extraReducers(builder) {
    //   builder.addCase(reset, (state, action) => {
    //     return [];
    //   });
    // }
  });
  
  export const { addItem, removeItem } = itemsSlice.actions;
  export const itemsReducer = itemsSlice.reducer;