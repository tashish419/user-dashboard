import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { login, register } from "../../services/api"


interface AuthState {
  token: string | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),
  loading: false,
  error: null,
}

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const data = await login(email, password)
      localStorage.setItem("token", data.token)
      return data.token
    } catch (error: any) {
      return rejectWithValue(error.response.data)
    }
  },
)

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const data = await register(email, password)
      localStorage.setItem("token", data.token)
      return data.token
    } catch (error: any) {
      return rejectWithValue(error.response.data)
    }
  },
)

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token")
      state.token = null
      state.isAuthenticated = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.isAuthenticated = true
        state.token = action.payload
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false
        state.isAuthenticated = true
        state.token = action.payload
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer

