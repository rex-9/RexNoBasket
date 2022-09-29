import { combineReducers, configureStore } from "@reduxjs/toolkit";

import authXer from "./reducers/authXer";
import teamXer from "./reducers/teamXer";
import teamModalXer from "./reducers/teamModalXer";
import playerXer from "./reducers/playerXer";

const rootXer = combineReducers({
  auth: authXer,
  team: teamXer,
  teamModal: teamModalXer,
  player: playerXer,
});

const store = configureStore({
  reducer: rootXer,
});

export default store;
