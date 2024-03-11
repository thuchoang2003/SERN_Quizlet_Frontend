import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllLessonByUserId } from "../../apiService/lesson.service";
const initialState = {
  data: [],
};

export const lessonSlice = createSlice({
  name: "lesson",
  initialState,
  reducers: {
    getLesson: (state, action) => {
      state.data = action?.payload;
    },
  },
  extraReducers: (builder) => {},
});

// export const { doLogin, doGetAccount, doLogout, doUpdateInfomation } =
//   accountSlice.actions;
export const { getLesson } = lessonSlice.actions;

export default lessonSlice.reducer;
