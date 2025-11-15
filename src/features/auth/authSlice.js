import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

// Async thunks
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const res = await api.post('/api/auth/signup', userData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await api.post('/api/auth/login', { email, password });
      return res.data; // { accessToken, user }
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const refreshToken = createAsyncThunk(
  'auth/refresh',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const res = await api.post('/api/auth/refresh');
      const { accessToken, user } = res.data;
      if (user) {
        dispatch(setUser(user));
      }
      return accessToken;
    } catch (err) {
      if (err.response?.status === 401) {
        return rejectWithValue(null);
      }
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  'auth/me',
  async (_, { rejectWithValue, getState }) => {
    const token = getState().auth.accessToken;
    if (!token) return rejectWithValue('Missing access token');
    try {
      const res = await api.get('/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data.user;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await api.post('/api/auth/logout');
      // Clear any stored tokens from localStorage if any (though we use httpOnly cookies)
      localStorage.removeItem('accessToken');
      sessionStorage.removeItem('user');
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    accessToken: null,
    loading: false,
    error: null,
    registered: false,
    initializing: true,
    sessionWarning: false,
    sessionExpiryTime: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
      // Set session expiry time when access token is set
      if (action.payload) {
        const decoded = JSON.parse(atob(action.payload.split('.')[1]));
        state.sessionExpiryTime = decoded.exp * 1000; // Convert to milliseconds
      }
    },
    showSessionWarning: (state) => {
      state.sessionWarning = true;
    },
    hideSessionWarning: (state) => {
      state.sessionWarning = false;
    },
    clearSession: (state) => {
      state.user = null;
      state.accessToken = null;
      state.sessionWarning = false;
      state.sessionExpiryTime = null;
    },
  },
  extraReducers: builder => {
    builder
      // register
      .addCase(registerUser.pending, state => { state.loading = true; state.error = null; state.registered = false; })
      .addCase(registerUser.fulfilled, state => { state.loading = false; state.registered = true; })
      .addCase(registerUser.rejected, (state, action) => { state.loading = false; state.error = action.payload; state.registered = false; })

      // login
      .addCase(loginUser.pending, state => { state.loading = true; state.error = null; state.initializing = true; })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.accessToken;
        state.user = action.payload.user;
        state.initializing = false;
        // Set session expiry time
        if (action.payload.accessToken) {
          const decoded = JSON.parse(atob(action.payload.accessToken.split('.')[1]));
          state.sessionExpiryTime = decoded.exp * 1000;
        }
      })
      .addCase(loginUser.rejected, (state, action) => { state.loading = false; state.error = action.payload; state.initializing = false; })

      // refresh
      .addCase(refreshToken.pending, state => { state.initializing = true; })
    .addCase(refreshToken.fulfilled, (state, action) => {
    state.accessToken = action.payload;
    state.initializing = false;   // <-- ADD THIS LINE

    if (action.payload) {
      // 👉 Automatically update axios Authorization header
      api.defaults.headers.common['Authorization'] = `Bearer ${action.payload}`;

      const decoded = JSON.parse(atob(action.payload.split('.')[1]));
      state.sessionExpiryTime = decoded.exp * 1000;
    }
})

     .addCase(refreshToken.rejected, (state, action) => {
    if (action.payload === null) {
        // refresh-token invalid, logout user
        state.user = null;
        state.accessToken = null;
        state.sessionExpiryTime = null;
    }
    state.initializing = false;
})

      // me
      .addCase(fetchCurrentUser.pending, state => { state.loading = true; state.error = null; state.initializing = true; })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.initializing = false;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
        state.accessToken = null;
        state.initializing = false;
        state.sessionWarning = false;
        state.sessionExpiryTime = null;
      })

      // logout
      .addCase(logoutUser.fulfilled, state => { state.user = null; state.accessToken = null; state.initializing = false; state.sessionWarning = false; state.sessionExpiryTime = null; })
      .addCase(logoutUser.rejected, state => { state.user = null; state.accessToken = null; state.initializing = false; state.sessionWarning = false; state.sessionExpiryTime = null; });
  }
});

export const { setUser, setAccessToken, showSessionWarning, hideSessionWarning, clearSession } = authSlice.actions;
export default authSlice.reducer;
