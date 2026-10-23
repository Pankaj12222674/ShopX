import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { logout } from './authSlice'

const initialState = {
    categories: [],
    isLoading: false,
    isError: null,
    isSuccess: false,
}

const authConfig = () => ({
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
})

const getErrorMessage = (error, fallback) =>
    error.response?.data?.message || fallback

export const fetchCategories = createAsyncThunk(
    'category/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get('/api/category')
            return data
        } catch (error) {
            return rejectWithValue(getErrorMessage(error, 'Failed to fetch categories'))
        }
    },
)

export const createCategory = createAsyncThunk(
    'category/create',
    async (categoryData, { rejectWithValue }) => {
        try {
            const { data } = await axios.post('/api/category/create', categoryData, authConfig())
            return data
        } catch (error) {
            return rejectWithValue(getErrorMessage(error, 'Failed to create category'))
        }
    },
)

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        resetCategoryStatus: (state) => {
            state.isError = null
            state.isSuccess = false
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.isLoading = true
                state.isError = null
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.isLoading = false
                state.categories = action.payload.categories || []
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.isLoading = false
                state.isError = action.payload
            })
            .addCase(createCategory.pending, (state) => {
                state.isLoading = true
                state.isError = null
                state.isSuccess = false
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                if (action.payload.category) state.categories.unshift(action.payload.category)
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.isLoading = false
                state.isError = action.payload
            })
            .addCase(logout, () => initialState)
    },
})

export const { resetCategoryStatus } = categorySlice.actions
export default categorySlice.reducer
