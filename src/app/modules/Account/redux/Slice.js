import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listLoading: false,
  actionsLoading: false,
  entities: null,
  error: null,
  success: false,
  totalCount: 0,
  user: {},
  banks: [],
};

export const actionTypes = {
  list: "list",
  action: "action",
};

export const usersSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    catchError: (state, action) => {
      state.error = action.payload.error;
      state.success = false;

      if (action.payload.callType === actionTypes.list) {
        state.listLoading = false;
      } else {
        state.actionsLoading = false;
      }
    },
    startCall: (state, action) => {
      state.error = null;
      state.success = false;
      if (action.payload.callType === actionTypes.list) {
        state.listLoading = true;
      } else {
        state.actionsLoading = true;
      }
    },
    userFetched: (state, action) => {
      state.actionsLoading = false;
      state.user = action.payload;
      state.error = null;
    }
}
})