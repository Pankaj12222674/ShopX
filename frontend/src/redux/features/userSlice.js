import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const api = () => ({ headers: { Authorization: "Bearer " + localStorage.getItem("token") } });
const errorText = (error) => error.response?.data?.message || "Request failed";
export const fetchUsers = createAsyncThunk("superadmin/fetchUsers", async (_, { rejectWithValue }) => {
  try { return (await axios.get("/api/superadmin/users", api())).data.users; } catch (error) { return rejectWithValue(errorText(error)); }
});
export const fetchUserDetails = createAsyncThunk("superadmin/fetchUserDetails", async (id, { rejectWithValue }) => {
  try { return (await axios.get(`/api/superadmin/users/${id}`, api())).data; } catch (error) { return rejectWithValue(errorText(error)); }
});
export const createAdmin = createAsyncThunk("superadmin/createAdmin", async (data, { rejectWithValue }) => {
  try { return (await axios.post("/api/superadmin/admins", data, api())).data.user; } catch (error) { return rejectWithValue(errorText(error)); }
});
export const updateUser = createAsyncThunk("superadmin/updateUser", async ({ id, updates }, { rejectWithValue }) => {
  try { return (await axios.patch(`/api/superadmin/users/${id}`, updates, api())).data.user; } catch (error) { return rejectWithValue(errorText(error)); }
});
const userSlice = createSlice({
  name: "superadminUsers",
  initialState: { users: [], selectedUser: null, selectedUserOrders: [], isLoading: false, error: null },
  reducers: {
    clearUserError: (state) => { state.error = null; },
    clearSelectedUser: (state) => { state.selectedUser = null; state.selectedUserOrders = []; },
  },
  extraReducers: (builder) => {
    [fetchUsers, fetchUserDetails, createAdmin, updateUser].forEach((thunk) => builder.addCase(thunk.pending, (state) => { state.isLoading = true; state.error = null; }).addCase(thunk.rejected, (state, action) => { state.isLoading = false; state.error = action.payload; }));
    builder.addCase(fetchUsers.fulfilled, (state, action) => { state.isLoading = false; state.users = action.payload; })
      .addCase(fetchUserDetails.fulfilled, (state, action) => { state.isLoading = false; state.selectedUser = action.payload.user; state.selectedUserOrders = action.payload.orders || []; })
      .addCase(createAdmin.fulfilled, (state, action) => { state.isLoading = false; state.users.unshift(action.payload); })
      .addCase(updateUser.fulfilled, (state, action) => { state.isLoading = false; state.users = state.users.map((user) => user.id === action.payload.id || user._id === action.payload._id ? action.payload : user); });
  },
});
export const { clearUserError, clearSelectedUser } = userSlice.actions;
export default userSlice.reducer;
