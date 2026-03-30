import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// ================= LOGIN =================
export const loginUser = createAsyncThunk(
  'auth/login',
  async (userData, thunkAPI) => {
    try {
      // Login → sets cookie (session)
      await axios.post('/api/auth/login', userData, {
        withCredentials: true
      });

      // Fetch logged-in user
      const res = await axios.get('/api/auth/session', {
        withCredentials: true
      });

      return res.data.data; // ✅ extract user
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Login Failed'
      );
    }
  }
);

// ================= SESSION =================
export const getSessionUser = createAsyncThunk(
  'auth/session',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get('/api/auth/session', {
        withCredentials: true
      });

      return res.data.data; // ✅ user
    } catch (error) {
      return null; // user not logged in
    }
  }
);

// ================= REGISTER =================
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, thunkAPI) => {
    try {
      const res = await axios.post('/api/auth/register', userData, {
        withCredentials: true
      });

      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Signup Failed'
      );
    }
  }
);

// ================= LOGOUT =================
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      await axios.get('/api/auth/sessions/logout', {
        withCredentials: true
      });

      return true;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Logout Failed'
      );
    }
  }
);

// ================= INITIAL STATE =================
const initialState = {
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false
};

// ================= SLICE =================
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearAuthState: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder

      // ===== LOGIN =====
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })

      // ===== SESSION =====
      .addCase(getSessionUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSessionUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = !!action.payload;
      })
      .addCase(getSessionUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })

      // ===== REGISTER =====
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // ===== LOGOUT =====
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      });
  }
});

export const { clearError, clearAuthState } = authSlice.actions;
export default authSlice.reducer;