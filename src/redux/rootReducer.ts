import { combineReducers } from "@reduxjs/toolkit";
import { USER_REDUCER } from "./slice/USER";

const rootReducer = combineReducers({
  USER: USER_REDUCER,
});

export default rootReducer;
