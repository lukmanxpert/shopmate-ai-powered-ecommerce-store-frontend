import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";
import { toast } from "react-toastify";
import { toggleAuthPopup } from "./popupSlice";

// register
export const register = createAsyncThunk(
  "auth/register",
  async (data, thunkApi) => {
    try {
      const res = await axiosInstance.post("/auth/register", data);
      toast.success(res.data.message);
      thunkApi.dispatch(toggleAuthPopup());
      return res.data.user;
    } catch (error) {
      toast.error(error.response.data.message);
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);
// login
export const login = createAsyncThunk("auth/login", async (data, thunkApi) => {
  try {
    const res = await axiosInstance.post("/auth/login", data);
    toast.success(res.data.message);
    thunkApi.dispatch(toggleAuthPopup());
    return res.data.user;
  } catch (error) {
    toast.error(error.response.data.message);
    return thunkApi.rejectWithValue(error.response.data.message);
  }
});
// getUser
export const getUser = createAsyncThunk("auth/getUser", async (_, thunkApi) => {
  try {
    const res = await axiosInstance.get("/auth/me");
    return res.data.user;
  } catch (error) {
    return thunkApi.rejectWithValue(
      error.response.data.message || "Failed to get user."
    );
  }
});
// logout
export const logout = createAsyncThunk("auth/logout", async (_, thunkApi) => {
  try {
    // eslint-disable-next-line no-unused-vars
    const res = await axiosInstance.get("/auth/logout");
    thunkApi.dispatch(toggleAuthPopup());
    return null;
  } catch (error) {
    toast.error(error.response.data.message);
    return thunkApi.rejectWithValue(
      error.response.data.message || "Failed to logout user."
    );
  }
});
// forgot password
export const forgotPassword = createAsyncThunk(
  "auth/forgot/password",
  async (email, thunkApi) => {
    try {
      const res = await axiosInstance.post(
        "/auth/password/forgot?frontendUrl=http://localhost:5173",
        email
      );
      toast.success(res.data.message);
      return null;
    } catch (error) {
      toast.error(error.response.data.message);
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);
// reset password
export const resetPassword = createAsyncThunk(
  "auth/password/reset",
  async ({ token, password, confirmPassword }, thunkApi) => {
    try {
      const res = await axiosInstance.put(`/auth/password/reset/${token}`, {
        password,
        confirmPassword,
      });
      toast.success(res.data.message);
      return res.data.user;
    } catch (error) {
      const message =
        error.response.data.message ||
        "Something went wrong, please try again.";
      toast.error(message);
      return thunkApi.rejectWithValue(message);
    }
  }
);
// update password
export const updatePassword = createAsyncThunk(
  "auth/password/update",
  async (data, thunkApi) => {
    try {
      const res = await axiosInstance.put(`/auth/password/update`, data);
      toast.success(res.data.message);
      return null;
    } catch (error) {
      const message = error.response.data.message;
      toast.error(message);
      return thunkApi.rejectWithValue(message);
    }
  }
);
// update password
export const updateProfile = createAsyncThunk(
  "auth/me/update",
  async (data, thunkApi) => {
    try {
      const res = await axiosInstance.put(`/auth/profile/update`, data);
      toast.success(res.data.message);
      return res.data.user;
    } catch (error) {
      const message = error.response.data.message;
      toast.error(message);
      return thunkApi.rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isUpdatingPassword: false,
    isRequestingForToken: false,
    isCheckingAuth: true,
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isSigningUp = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isSigningUp = false;
        state.authUser = action.payload;
      })
      .addCase(register.rejected, (state) => {
        state.isSigningUp = false;
      })
      .addCase(login.pending, (state) => {
        state.isLoggingIn = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoggingIn = false;
        state.authUser = action.payload;
      })
      .addCase(register.rejected, (state) => {
        state.isLoggingIn = false;
      })
      .addCase(getUser.pending, (state) => {
        state.isCheckingAuth = true;
        state.authUser = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isCheckingAuth = false;
        state.authUser = action.payload;
      })
      .addCase(getUser.rejected, (state) => {
        state.isCheckingAuth = false;
        state.authUser = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.authUser = {};
      })
      .addCase(logout.rejected, (state) => {
        // eslint-disable-next-line no-self-assign
        state.authUser = state.authUser;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.isRequestingForToken = true;
      })
      .addCase(register.fulfilled, (state) => {
        state.isRequestingForToken = false;
      })
      .addCase(register.rejected, (state) => {
        state.isRequestingForToken = false;
      })
      .addCase(resetPassword.pending, (state) => {
        state.isUpdatingPassword = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isUpdatingPassword = false;
        state.authUser = action.payload;
      })
      .addCase(resetPassword.rejected, (state) => {
        state.isUpdatingPassword = false;
      })
      .addCase(updatePassword.pending, (state) => {
        state.isUpdatingPassword = true;
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.isUpdatingPassword = false;
      })
      .addCase(updatePassword.rejected, (state) => {
        state.isUpdatingPassword = false;
      })
      .addCase(updateProfile.pending, (state) => {
        state.isUpdatingProfile = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isUpdatingProfile = false;
        state.authUser = action.payload;
      })
      .addCase(updateProfile.rejected, (state) => {
        state.isUpdatingProfile = false;
      });
  },
});

export default authSlice.reducer;
