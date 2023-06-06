import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import {AxiosError} from 'axios';
import { NewBusiness, NewUser, User, ResetPwEmail, NewPassword } from './authInitialStates';
import api from '../axiosClient';

interface AuthState {
  auth: {
    newUser: NewUser | NewBusiness | null,
    user: User | null,
    rpdEmail: ResetPwEmail | null,
    newPassword: NewPassword | null
  };
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  auth: {
    newUser: null,
    user: null,
    rpdEmail: null,
    newPassword: null
  },
  isLoading: false,
  error: null,
};

export const addNewUser = createAsyncThunk(
  'auth/addNewUser',
  async (user: NewUser | NewBusiness) => {
    try {
      const usertype = "business_name" in user ? "merchant" : "customer";
      const response = await api.post(`/api/${usertype}/signup`, user);
      if (response.data) return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response) {
          return error.response.data.message;
        }
      }
      return 'An error occurred';
    }
  }
);

export const userLogin = createAsyncThunk(
  "auth/userLogin",
  async (user: User) => {
    try {
      const response = await api.post(`/api/user/login`, user);

      localStorage.setItem("accessToken", response.data.data.token);
      api.defaults.headers["Authorization"] =
        "Bearer " + response.data?.data["token"];
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response) {
          return error.response.data.message;
        }
      }
      return 'An error occurred';
    }
  }
);
export const sendEmail = createAsyncThunk(
    'auth/sendEmail',
    async (userEmail: ResetPwEmail) => {
      try {
        const response = await api.post(`/reset`, userEmail);
        return response.data;
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          if (error.response) {
            return error.response.data.message;
          }
        }
        return 'An error occurred';
      }
    }
);

export const resetPassword = createAsyncThunk(
    'auth/resetPassword',
    async (newpassword: NewPassword) => {
      try {
        const response = await api.put(`/verify/reset`, newpassword);
        return response.data;
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          if (error.response) {
            return error.response.data.message;
          }
        }
        return 'An error occurred';
      }
    }
);

export const resetAuthState = createAction<void>('auth/resetAuthState');


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthState: () => initialState,
  },
  extraReducers: builder => {
    /**Signup */
    builder.addCase(addNewUser.pending, state => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(addNewUser.fulfilled, (state, action) => {
      state.auth.newUser = action.payload;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(addNewUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    /**Login */
    builder.addCase(userLogin.pending, state => {
        state.isLoading = true;
        state.error = null;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
        state.auth.user = action.payload;
        state.isLoading = false;
        state.error = null;
    });
    builder.addCase(userLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });      

    /**Send email */
    builder.addCase(sendEmail.pending, state => {
        state.isLoading = true;
        state.error = null;
    });
    builder.addCase(sendEmail.fulfilled, (state, action) => {
        state.auth.rpdEmail = action.payload;
        state.isLoading = false;
        state.error = null;
    });
        builder.addCase(sendEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
    });
    
    /**Reset Password */
    builder.addCase(resetPassword.pending, state => {
        state.isLoading = true;
        state.error = null;
    });
    builder.addCase(resetPassword.fulfilled, (state, action) => {
        state.auth.newPassword = action.payload;
        state.isLoading = false;
        state.error = null;
    });
        builder.addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
    });
  },
});

export default authSlice.reducer;
