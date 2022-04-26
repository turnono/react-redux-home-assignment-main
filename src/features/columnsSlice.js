import { createSlice } from "@reduxjs/toolkit";
import { COLUMNS } from "../data/col_data";

export const columnsSlice = createSlice({
  name: "columns",
  initialState: {
    value: COLUMNS,
  },
  reducers: {
    setColumns: (state, action) => {
      state.value = action?.payload;
    },
  },
});

export const { setColumns } = columnsSlice.actions;

export const selectColumns = (state) => state?.columns?.value;

export default columnsSlice.reducer;
