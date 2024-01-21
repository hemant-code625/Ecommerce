import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {CheckGoogleUserExist, GoogleAuth, UpdateUser, checkUser, createUser, deleteUser } from './authAPI';

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
    return response;
  }
);

export const checkUserAsync = createAsyncThunk(
  'user/checkUser',
  async (userInfo) => {
    const response = await checkUser(userInfo);
    return response;
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
  'user/CheckGoogleUserExist',
  async (userData) => {
    const response = await CheckGoogleUserExist(userData);
    if(response){
      return response;
    }else{
      const addUser = await GoogleAuth(userData); // creating new user
      return addUser;
    }
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
      .addCase(createUserAsync.fulfilled, (state) => {
        state.status = 'userCreated Successfully';
        // state.loggedInUser = action.payload;

      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const responseData = action.payload;
        if (responseData && responseData.message) {
          // Handle error messages here
          state.error = { message: responseData.message }
        } else {
          state.loggedInUser = responseData;
        }
      })      
      .addCase(checkUserAsync.rejected, (state, action) => {
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
