import { OrderType } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { orders: OrderType[] | null } = {
  orders: null,
};

const ORDER_SLICE = createSlice({
  name: "ORDERS",
  initialState,
  reducers: {
    setOrders(state, action: PayloadAction<OrderType[]>) {
      state.orders = action.payload;
    },
    resetOrders(state) {
      state.orders = null;
    },
  },
});

export const { resetOrders, setOrders } = ORDER_SLICE.actions;
export const ORDER_REDUCER = ORDER_SLICE.reducer;
