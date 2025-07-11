import { configureStore } from "@reduxjs/toolkit";
import columnsReducer from "./features/columnsSlice";
import rowsReducer from "./features/rowsSlice";

export default configureStore({
  reducer: {
    columns: columnsReducer,
    rows: rowsReducer,
  },
});
