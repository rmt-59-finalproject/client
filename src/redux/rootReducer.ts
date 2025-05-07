import { combineReducers } from "@reduxjs/toolkit";
import { USER_REDUCER } from "./slice/USER";
import { ORDER_REDUCER } from "./slice/ORDERS";

const rootReducer = combineReducers({
  USER: USER_REDUCER,
  ORDERS: ORDER_REDUCER
});

export default rootReducer;
