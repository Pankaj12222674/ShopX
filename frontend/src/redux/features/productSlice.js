import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = { products: [], product: null, isLoading: false, isError: null, isSuccess: false };
const config = () => ({ headers: { Authorization: "Bearer " + localStorage.getItem("token") } });
const errorMessage = (error, fallback) => error.response?.data?.message || fallback;

export const fetchAllProduct = createAsyncThunk("product/fetchAll", async (_, { rejectWithValue }) => {
  try { return (await axios.get("/api/product")).data; } catch (error) { return rejectWithValue(errorMessage(error, "Failed to fetch products")); }
});
export const fetchProductById = createAsyncThunk("product/fetchById", async (id, { rejectWithValue }) => {
  try { return (await axios.get("/api/product/" + id)).data; } catch (error) { return rejectWithValue(errorMessage(error, "Failed to fetch product")); }
});
export const createProduct = createAsyncThunk("product/create", async (formData, { rejectWithValue }) => {
  try { return (await axios.post("/api/product", formData, config())).data; } catch (error) { return rejectWithValue(errorMessage(error, "Failed to create product")); }
});
export const updateProduct = createAsyncThunk("product/update", async ({ id, updates }, { rejectWithValue }) => {
  try { return (await axios.put("/api/product/" + id, updates, config())).data; } catch (error) { return rejectWithValue(errorMessage(error, "Failed to update product")); }
});

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    resetProductStatus: (state) => { state.isError = null; state.isSuccess = false; },
    clearProduct: (state) => { state.product = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProduct.pending, (state) => { state.isLoading = true; state.isError = null; })
      .addCase(fetchAllProduct.fulfilled, (state, action) => { state.isLoading = false; state.products = action.payload.products || []; })
      .addCase(fetchAllProduct.rejected, (state, action) => { state.isLoading = false; state.isError = action.payload; })
      .addCase(fetchProductById.pending, (state) => { state.isLoading = true; state.isError = null; })
      .addCase(fetchProductById.fulfilled, (state, action) => { state.isLoading = false; state.product = action.payload.product; })
      .addCase(fetchProductById.rejected, (state, action) => { state.isLoading = false; state.isError = action.payload; })
      .addCase(createProduct.fulfilled, (state, action) => { state.isLoading = false; state.isSuccess = true; if (action.payload.newProduct) state.products.unshift(action.payload.newProduct); })
      .addCase(updateProduct.fulfilled, (state, action) => { state.isLoading = false; state.isSuccess = true; state.product = action.payload.product; })
      .addMatcher((action) => [createProduct, updateProduct].some((thunk) => action.type === thunk.pending.type), (state) => { state.isLoading = true; state.isError = null; state.isSuccess = false; })
      .addMatcher((action) => [createProduct, updateProduct].some((thunk) => action.type === thunk.rejected.type), (state, action) => { state.isLoading = false; state.isError = action.payload; });
  },
});
export const { resetProductStatus, clearProduct } = productSlice.actions;
export default productSlice.reducer;
