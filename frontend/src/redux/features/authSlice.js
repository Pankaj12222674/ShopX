import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    user: null,
    isAuthenticate: false,
    isLoading: false,
    isError: null,
    authCheck: false,
    token: localStorage.getItem('token'),
}

const message = (error, fallback) =>
    error.response?.data?.message || fallback

const authConfig = () => ({
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
})

export const registerUser = createAsyncThunk(
    'auth/register',
    async (formData, { rejectWithValue }) => {
        try {
            const { data } = await axios.post('/api/auth/register', formData)
            return data
        } catch (error) {
            return rejectWithValue(message(error, 'Registration failed'))
        }
    },
)

export const loginUser = createAsyncThunk(
    'auth/login',
    async (formData, { rejectWithValue }) => {
        try {
            const { data } = await axios.post('/api/auth/login', formData)
            return data
        } catch (error) {
            return rejectWithValue(message(error, 'Login failed'))
        }
    },
)

export const forgotPassword = createAsyncThunk(
    'auth/forgotPassword',
    async (email, { rejectWithValue }) => {
        try {
            const { data } = await axios.post('/api/auth/forgot-password', { email })
            return data
        } catch (error) {
            return rejectWithValue(message(error, 'Unable to send reset email'))
        }
    },
)

export const resetPassword = createAsyncThunk(
    'auth/resetPassword',
    async ({ token, password }, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`/api/auth/reset-password/${token}`, { password })
            return data
        } catch (error) {
            return rejectWithValue(message(error, 'Unable to reset password'))
        }
    },
)

export const profile = createAsyncThunk(
    'auth/profile',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get('/api/auth/profile', authConfig())
            return data
        } catch (error) {
            return rejectWithValue(message(error, 'Profile failed to load'))
        }
    },
)

export const updateProfile = createAsyncThunk(
    'auth/updateProfile',
    async (profileData, { rejectWithValue }) => {
        try {
            const { data } = await axios.put(
                '/api/auth/profile',
                profileData,
                {
                    ...authConfig(),
                    headers: {
                        ...authConfig().headers,
                        'Content-Type': 'multipart/form-data',
                    },
                },
            )
            return data
        } catch (error) {
            return rejectWithValue(message(error, 'Profile update failed'))
        }
    },
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: () => {
            localStorage.removeItem('token')
            return { ...initialState, token: null }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true
                state.isError = null
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.isLoading = false
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = action.payload
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true
                state.isError = null
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isAuthenticate = true
                state.authCheck = true
                state.user = action.payload.user
                state.token = action.payload.token
                localStorage.setItem('token', action.payload.token)
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = action.payload
            })
            .addCase(profile.pending, (state) => {
                state.isLoading = true
            })
            .addCase(profile.fulfilled, (state, action) => {
                state.isLoading = false
                state.isAuthenticate = true
                state.authCheck = true
                state.user = action.payload.user
            })
            .addCase(profile.rejected, (state, action) => {
                state.isLoading = false
                state.isAuthenticate = false
                state.authCheck = false
                state.user = null
                state.token = null
                state.isError = action.payload
                localStorage.removeItem('token')
            })
            .addCase(updateProfile.pending, (state) => {
                state.isLoading = true
                state.isError = null
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.isLoading = false
                state.user = action.payload.userInfo
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.isLoading = false
                state.isError = action.payload
            })
    },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
