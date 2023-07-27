import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appSlice";
import dialogReducer from "./dialogSlice";
import dashboardReducer from "../pages/Dashboard/dashboardSlice";

export default configureStore({
  reducer: {
    app: appReducer,
    dashboard: dashboardReducer,
    dialog: dialogReducer,
  },
});
