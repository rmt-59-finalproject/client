import { UserType } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { user: UserType | null } = {
  user: null,
};

const USER_SLICE = createSlice({
  name: "USER",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserType>) {
      state.user = action.payload;
    },
    resetUser(state) {
      state.user = null;
    },
  },
});

export const { resetUser, setUser } = USER_SLICE.actions;
export const USER_REDUCER = USER_SLICE.reducer;
