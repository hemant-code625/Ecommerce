import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {UpdateUser, loginUser, createUser, deleteUser, GoogleAuth } from './authAPI';

const initialState = {
  loggedInUser: null,
  status: 'idle',
  error:null
};

export const createUserAsync = createAsyncThunk(
  'user/createUser',
  async (userData) => {
    const response = await createUser(userData);
    // The value we return becomes the `fulfilled` action payload
    console.log("response from createUserAsync", response)
    return response;
  }
);

export const loginUserAsync = createAsyncThunk(
  'user/loginUser',
  async (userInfo,{rejectWithValue}) => {
    try {
      const response = await loginUser(userInfo);
      // Check if the response contains an error message
      if (response.message) {
        // If an error message exists, reject the async thunk with the error message
        return rejectWithValue(response.message);
      } else {
        // If there's no error message, return the response data
        return response;
      }
    } catch (error) {
      console.error("Error in loginUserAsync thunk", error);
    }
  }
);
export const updateUserAsync = createAsyncThunk(
  'user/updateUser',
  async (data) => {
    const response = await UpdateUser(data);
    return response;
  }
);

export const GoogleAuthAsync = createAsyncThunk(
  'user/GoogleAuth',
  async (userData) => {
    const response = await GoogleAuth(userData);
    return response;
  }
)
export const deleteUserAsync = createAsyncThunk(
  'user/deleteUser',
  async (id) => {
      try {
          const response = await deleteUser(id);
          console.log("Deleted user:", response);
          return response.data;
      } catch (error) {
          console.error("Error in deleteUserAsync thunk", error);
          throw error;
      }
  }
);


export const counterSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state,action) => {
        state.status = 'userCreated Successfully';
        state.loggedInUser = action.payload;

      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const responseData = action.payload;
        if (responseData && responseData.message) {
          // Handle error messages here
          state.error = { message: responseData.message }
        } else {
          state.loggedInUser = responseData;
        }
      })      
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error;
      })
      .addCase(GoogleAuthAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(GoogleAuthAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(GoogleAuthAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser=(action.payload);
      })
      .addCase(updateUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.loggedInUser.error = action.error;
      })
      .addCase(deleteUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteUserAsync.fulfilled,(state)=>{
        state.status = 'idle';
        state.loggedInUser =null;
      })
      .addCase(deleteUserAsync.rejected,(state,action)=>{
        state.status = 'idle';
        state.error = action.error;
        console.log(action.error);
      })
  },
});

export const selectLoggedInUser = (state)=>state.auth.loggedInUser;
export const selectError = (state)=>state.auth.error;
export const { increment } = counterSlice.actions;


export default counterSlice.reducer;
