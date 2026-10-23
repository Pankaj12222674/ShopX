import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { logout } from "./authSlice";

const config = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});
const errorMessage = (error, fallback) => error.response?.data?.message || fallback;

export const fetchTickets = createAsyncThunk("support/fetch", async (_, { rejectWithValue }) => {
  try { return (await axios.get("/api/support", config())).data; }
  catch (error) { return rejectWithValue(errorMessage(error, "Failed to fetch support requests")); }
});

export const createTicket = createAsyncThunk("support/create", async (data, { rejectWithValue }) => {
  try { return (await axios.post("/api/support", data, config())).data; }
  catch (error) { return rejectWithValue(errorMessage(error, "Failed to submit support request")); }
});

export const updateTicket = createAsyncThunk("support/update", async ({ id, status, response }, { rejectWithValue }) => {
  try { return (await axios.patch(`/api/support/${id}`, { status, response }, config())).data; }
  catch (error) { return rejectWithValue(errorMessage(error, "Failed to update support request")); }
});

const initialState = { tickets: [], isLoading: false, error: null };
const supportSlice = createSlice({
  name: "support",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    [fetchTickets, createTicket, updateTicket].forEach((thunk) => {
      builder
        .addCase(thunk.pending, (state) => { state.isLoading = true; state.error = null; })
        .addCase(thunk.rejected, (state, action) => { state.isLoading = false; state.error = action.payload; });
    });
    builder
      .addCase(fetchTickets.fulfilled, (state, action) => { state.isLoading = false; state.tickets = action.payload.tickets || []; })
      .addCase(createTicket.fulfilled, (state, action) => { state.isLoading = false; state.tickets.unshift(action.payload.ticket); })
      .addCase(updateTicket.fulfilled, (state, action) => { state.isLoading = false; state.tickets = state.tickets.map((ticket) => ticket._id === action.payload.ticket._id ? action.payload.ticket : ticket); })
      .addCase(logout, () => initialState);
  },
});

export default supportSlice.reducer;
