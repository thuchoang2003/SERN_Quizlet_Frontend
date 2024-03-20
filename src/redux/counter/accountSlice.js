import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    email: "",
    fullname: "",
    id: "",
    image: "",
    role: "",
  },
  isAuthenticated: false,
  isLoading: false,
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    doLogin: (state, action) => {
      state.user = action?.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    doLogout: (state) => {
      state.user.email = "";
      state.user.fullname = "";
      state.user.id = "";
      state.user.image = "";
      state.user.role = "";
      state.isAuthenticated = false;
      state.isLoading = false;
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    },
    doUpdateUsername: (state, action) => {
      state.user.fullname = action?.payload;
    },
    doUpdateAvatar: (state, action) => {
      state.user.image = action?.payload;
    },

    // doGetAccount: (state, action) => {
    //   state.user = action?.payload?.user;
    //   state.isAuthenticated = true;
    //   state.isLoading = false;
    // },
    // doUpdateInfomation: (state, action) => {
    //   state.user.avatar = action?.payload?.avatar;
    //   state.user.phone = action?.payload?.phone;
    //   state.user.fullName = action?.payload?.fullName;
    // },
  },
  extraReducers: (builder) => {},
});

// export const { doLogin, doGetAccount, doLogout, doUpdateInfomation } =
//   accountSlice.actions;
export const { doLogin, doLogout, doUpdateUsername, doUpdateAvatar } =
  accountSlice.actions;

export default accountSlice.reducer;
