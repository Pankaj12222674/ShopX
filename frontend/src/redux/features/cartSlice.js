import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { logout } from "./authSlice";

const initialState = { items: [], totalPrice: 0, isLoading: false, isError: null };
const authConfig = () => ({
  headers: { Authorization: "Bearer " + localStorage.getItem("token") },
});
const errorMessage = (error, fallback) =>
  error.response?.data?.message || fallback;

export const fetchCart = createAsyncThunk("cart/fetch", async (_, { rejectWithValue }) => {
  try { return (await axios.get("/api/cart", authConfig())).data; }
  catch (error) { return rejectWithValue(errorMessage(error, "Failed to fetch cart")); }
});

export const addToCart = createAsyncThunk("cart/add", async ({ productId, quantity = 1 }, { rejectWithValue }) => {
  try {
    await axios.post("/api/cart", { productId, quantity }, authConfig());
    return (await axios.get("/api/cart", authConfig())).data;
  }
  catch (error) { return rejectWithValue(errorMessage(error, "Failed to add to cart")); }
});

export const removeFromCart = createAsyncThunk("cart/remove", async ({ productId, quantity = 1 }, { rejectWithValue }) => {
  try {
    await axios.post("/api/cart/remove", { productId, quantity }, authConfig());
    return (await axios.get("/api/cart", authConfig())).data;
  }
  catch (error) { return rejectWithValue(errorMessage(error, "Failed to remove item")); }
});

export const clearCart = createAsyncThunk("cart/clear", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get("/api/cart", authConfig());
    return data;
  } catch (error) {
    return rejectWithValue(errorMessage(error, "Failed to clear cart"));
  }
});

const applyCart = (state, payload) => {
  const items = payload.cartItems || payload.cart?.items || [];
  state.items = items.map((item) => ({
    product: item.product || item.productId,
    quantity: item.quantity,
  }));
  state.totalPrice = state.items.reduce(
    (sum, item) => sum + Number(item.product?.price || 0) * item.quantity,
    0,
  );
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: { resetCartError: (state) => { state.isError = null; } },
  extraReducers: (builder) => {
    [fetchCart, addToCart, removeFromCart, clearCart].forEach((thunk) => {
      builder
        .addCase(thunk.pending, (state) => { state.isLoading = true; state.isError = null; })
        .addCase(thunk.fulfilled, (state, action) => { state.isLoading = false; applyCart(state, action.payload); })
        .addCase(thunk.rejected, (state, action) => { state.isLoading = false; state.isError = action.payload; });
    });
    builder.addCase(logout, () => initialState);
  },
});

export const { resetCartError } = cartSlice.actions;
export const selectCartCount = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);
export default cartSlice.reducer;
