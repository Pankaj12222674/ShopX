import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const api = () => ({ headers: { Authorization: "Bearer " + localStorage.getItem("token") } });
export const fetchActivity = createAsyncThunk("activity/fetch", async (_, { rejectWithValue }) => {
  try { return (await axios.get("/api/superadmin/activity", api())).data.activity; } catch (error) { return rejectWithValue(error.response?.data?.message || "Unable to load activity"); }
});
const activitySlice = createSlice({ name: "activity", initialState: { items: [], isLoading: false, error: null }, reducers: {}, extraReducers: (builder) => builder.addCase(fetchActivity.pending, (state) => { state.isLoading = true; }).addCase(fetchActivity.fulfilled, (state, action) => { state.isLoading = false; state.items = action.payload; }).addCase(fetchActivity.rejected, (state, action) => { state.isLoading = false; state.error = action.payload; }) });
export default activitySlice.reducer;
