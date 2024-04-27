import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { login,registerUser,verifyOTP } from '../../Services/Authentication/AuthenticationApi';

import 'react-toastify/dist/ReactToastify.css';
const initialState = {
    status: 'idle',
    token: localStorage.getItem('token') || null, 
    role:null,
    wishlist:0,
    cart:0
  };

 

  export const RegisterCustomer = createAsyncThunk(
    'users/RegisterCustomer',
    async (data) => {
      const response = await registerUser(data);
      return response;
    }
  );

  export const LoginUser = createAsyncThunk(
    'users/LoginUser',
    async (data) => {
      const response = await login(data);
      console.log(response.data,'in ap');
      return response;

    }
  );

  export const authSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
      setToken: (state, action) => {
        state.token = action.payload.token;
      },
      getCartWish :(state,action) => {
        console.log(action,'the action hit')
        state.wishlist = action.payload.wishlist;
        state.cart = action.payload.cart
      },
    },
    extraReducers: (builder) => {
      builder
        
   .addCase(RegisterCustomer.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(RegisterCustomer.fulfilled, (state, action) => {
          state.status = 'idle';
          state.UserLoginIn = action.payload;
        })
        .addCase(LoginUser.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(LoginUser.rejected, (state, action) => {
          state.status = 'idle';
          state.UserLoginIn = action.payload;
        })
        .addCase(LoginUser.fulfilled, (state, action) => {
          state.status = 'idle';
          state.token = action.payload.data
        });
    },
  });

  export const { setToken } = authSlice.actions;
  export const {getCartWish} = authSlice.actions
  export const selectedLoggerInUser =(state) => state.auth;


 
   export default  authSlice.reducer