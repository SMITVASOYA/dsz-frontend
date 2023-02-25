const { createSlice } = require("@reduxjs/toolkit");

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setDept(state, action) {
      state.dept = action.payload;
    },
    setClient(state, action) {
      state.client = action.payload;
    },
    setEmployee(state, action) {
      state.employee = action.payload;
    },
    setEmployeeId(state, action) {
      state.employeeId = action.payload;
    },
    setAuth(state, action) {
      state.auth = action.payload;
    },
  },
});

export const {
  setUser,
  setDept,
  setClient,
  setEmployee,
  setAuth,
  setEmployeeId,
} = userSlice.actions;
export default userSlice.reducer;
