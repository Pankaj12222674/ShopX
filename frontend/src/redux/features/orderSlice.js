import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { logout } from "./authSlice";

const initialState = { orders: [], order: null, isLoading: false, isError: null, isSuccess: false };
const config = () => ({ headers: { Authorization: "Bearer " + localStorage.getItem("token") } });
const errorMessage = (error, fallback) => error.response?.data?.message || fallback;

export const placeOrder = createAsyncThunk("order/place", async (data, { rejectWithValue }) => {
  try { return (await axios.post("/api/order/create", data, config())).data; } catch (error) { return rejectWithValue(errorMessage(error, "Failed to place order")); }
});
export const fetchMyOrders = createAsyncThunk("order/fetchMine", async (_, { rejectWithValue }) => {
  try { return (await axios.post("/api/order", {}, config())).data; } catch (error) { return rejectWithValue(errorMessage(error, "Failed to fetch orders")); }
});
export const fetchAllOrders = createAsyncThunk("order/fetchAll", async (_, { rejectWithValue }) => {
  try { return (await axios.get("/api/order/admin", config())).data; } catch (error) { return rejectWithValue(errorMessage(error, "Failed to fetch orders")); }
});
export const fetchOrderById = createAsyncThunk("order/fetchById", async (id, { rejectWithValue }) => {
  try { return (await axios.get("/api/order/" + id, config())).data; } catch (error) { return rejectWithValue(errorMessage(error, "Failed to fetch order")); }
});
export const updateOrderStatus = createAsyncThunk("order/updateStatus", async ({ id, orderStatus, paymentStatus }, { rejectWithValue }) => {
  try { return (await axios.patch(`/api/order/${id}/status`, { orderStatus, paymentStatus }, config())).data; } catch (error) { return rejectWithValue(errorMessage(error, "Failed to update order status")); }
});

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOrderStatus: (state) => { state.isError = null; state.isSuccess = false; },
    clearOrder: (state) => { state.order = null; },
  },
  extraReducers: (builder) => {
    [fetchMyOrders, fetchAllOrders].forEach((thunk) => {
      builder
        .addCase(thunk.pending, (state) => { state.isLoading = true; state.isError = null; })
        .addCase(thunk.fulfilled, (state, action) => { state.isLoading = false; state.orders = action.payload.orders || action.payload.allOrder || []; })
        .addCase(thunk.rejected, (state, action) => { state.isLoading = false; state.isError = action.payload; });
    });
    builder
      .addCase(placeOrder.fulfilled, (state, action) => { state.isLoading = false; state.isSuccess = true; state.order = action.payload.order; if (action.payload.order) state.orders.unshift(action.payload.order); })
      .addCase(placeOrder.rejected, (state, action) => { state.isLoading = false; state.isError = action.payload; })
      .addCase(fetchOrderById.pending, (state) => { state.isLoading = true; state.isError = null; })
      .addCase(fetchOrderById.fulfilled, (state, action) => { state.isLoading = false; state.order = action.payload.order; })
      .addCase(fetchOrderById.rejected, (state, action) => { state.isLoading = false; state.isError = action.payload; })
      .addCase(updateOrderStatus.pending, (state) => { state.isLoading = true; state.isError = null; })
      .addCase(updateOrderStatus.fulfilled, (state, action) => { state.isLoading = false; state.order = action.payload.order; state.orders = state.orders.map((order) => order._id === action.payload.order._id ? action.payload.order : order); })
      .addCase(updateOrderStatus.rejected, (state, action) => { state.isLoading = false; state.isError = action.payload; })
      .addCase(logout, () => initialState);
  },
});
export const { resetOrderStatus, clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
