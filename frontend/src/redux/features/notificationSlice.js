import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const config = () => ({ headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
const errorMessage = (error, fallback) => error.response?.data?.message || fallback;

export const fetchNotifications = createAsyncThunk("notification/fetch", async (_, { rejectWithValue }) => {
  try { return (await axios.get("/api/notification", config())).data; }
  catch (error) { return rejectWithValue(errorMessage(error, "Failed to fetch notifications")); }
});

export const sendNotification = createAsyncThunk("notification/send", async (data, { rejectWithValue }) => {
  try { return (await axios.post("/api/notification", data, config())).data; }
  catch (error) { return rejectWithValue(errorMessage(error, "Failed to send notification")); }
});

export const markNotificationRead = createAsyncThunk("notification/read", async (id, { rejectWithValue }) => {
  try { return (await axios.patch(`/api/notification/${id}/read`, {}, config())).data; }
  catch (error) { return rejectWithValue(errorMessage(error, "Failed to update notification")); }
});

const notificationSlice = createSlice({
  name: "notification",
  initialState: { notifications: [], unreadCount: 0, isLoading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => { state.isLoading = true; state.error = null; })
      .addCase(fetchNotifications.fulfilled, (state, action) => { state.isLoading = false; state.notifications = action.payload.notifications || []; state.unreadCount = action.payload.unreadCount || 0; })
      .addCase(fetchNotifications.rejected, (state, action) => { state.isLoading = false; state.error = action.payload; })
      .addCase(markNotificationRead.fulfilled, (state, action) => {
        const notification = state.notifications.find((item) => item._id === action.payload.notification?._id);
        if (notification && !notification.readAt) { notification.readAt = action.payload.notification.readAt; state.unreadCount = Math.max(0, state.unreadCount - 1); }
      });
  },
});

export default notificationSlice.reducer;
