import { createSlice } from "@reduxjs/toolkit";
import { ITEMS } from "../data/data";

export const rowsSlice = createSlice({
  name: "rows",
  initialState: {
    value: ITEMS,
  },
  reducers: {
    setRows: (state, action) => {
      state.value = action.payload;
    },
    deleteRowByIndex: (state, action) => ({
      value: [
        ...state.value.slice(0, action?.payload),
        ...state.value.slice(action?.payload + 1),
      ],
    }),
  },
});

export const { setRows, deleteRowByIndex } = rowsSlice?.actions;

export const selectRows = (state) => state?.rows?.value;

export default rowsSlice.reducer;
