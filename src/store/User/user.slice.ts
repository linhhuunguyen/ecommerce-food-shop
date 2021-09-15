import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { getUsersList, registerUser, loginUser, deleteUser } from 'api/users';

import { User, Users, LoginUer } from 'types/User';

// get all user

export const getMembers = createAsyncThunk('users/getUsers', async () => {
  const response = await getUsersList();
  return response.data;
});

// add Members

export const addMembers = createAsyncThunk(
  'user/addUser',
  async (info: any) => {
    const response = await registerUser(info);
    return response.data;
  }
);

// delete Members

export const deleteMembers = createAsyncThunk(
  'user/deleteUser',
  async (id: any) => {
    const response = await deleteUser(id);
    return response.data;
  }
);

// login

export const loginMembers = createAsyncThunk(
  'user/loginUser',
  async (info: LoginUer) => {
    const response = await loginUser(info);
    return response.data;
  }
);

export const loginBuyer = createAsyncThunk(
  'buyer/loginBuyer',
  async (info: LoginUer) => {
    const response = await loginUser(info);
    return response.data;
  }
);

interface InitialStateType {
  usersList: Users[];
  user: Users;
  userData: User;
  loading: boolean;
}

const initialState: InitialStateType = {
  usersList: [],
  user: {
    id: 0,
    fullname: '',
    contact: '',
    address: '',
    gender: '',
    email: '',
    password: '',
    avatar: '',
    role: ''
  },
  userData: {
    accessToken: '',
    user: {
      id: 0,
      fullname: '',
      contact: '',
      address: '',
      gender: '',
      email: '',
      password: '',
      avatar: '',
      role: ''
    }
  },
  loading: false
};

const userSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {},
  extraReducers: {
    [getMembers.pending.toString()](state) {
      state.loading = true;
    },
    [getMembers.fulfilled.toString()](state, action: PayloadAction<Users[]>) {
      if (!action.payload) return;
      state.usersList = [...action.payload];
      state.loading = false;
    },
    [getMembers.rejected.toString()]: (state) => {
      state.loading = false;
    },

    // add members

    [addMembers.pending.toString()](state) {
      state.loading = true;
    },
    [addMembers.fulfilled.toString()](state, action: PayloadAction<Users>) {
      if (!action.payload) return;
      state.user = { ...action.payload };
      state.loading = false;
    },
    [addMembers.rejected.toString()]: (state) => {
      state.loading = false;
    },

    // delete members
    [deleteMembers.pending.toString()](state) {
      state.loading = true;
    },
    [deleteMembers.fulfilled.toString()](state, action: PayloadAction<Users>) {
      if (!action.payload) return;
      state.usersList = state.usersList.filter(
        (item: any) => item.id !== action.payload.id
      );
      state.loading = false;
    },
    [deleteMembers.rejected.toString()]: (state) => {
      state.loading = false;
    },

    // loginUser
    [loginMembers.pending.toString()](state) {
      state.loading = true;
    },
    [loginMembers.fulfilled.toString()](state, action: PayloadAction<User>) {
      if (!action.payload) return;
      state.userData = { ...action.payload };
      localStorage.setItem('accessToken', state.userData.accessToken);
      localStorage.setItem('members', JSON.stringify(state.userData.user));
      localStorage.setItem(state.userData.user.role, state.userData.user.role);
      state.loading = false;
    },
    [loginMembers.rejected.toString()]: (state) => {
      state.loading = false;
    },

    // login Buyer
    [loginBuyer.pending.toString()](state) {
      state.loading = true;
    },
    [loginBuyer.fulfilled.toString()](state, action: PayloadAction<User>) {
      if (!action.payload) return;
      state.userData = { ...action.payload };
      localStorage.setItem('buyerToken', state.userData.accessToken);
      localStorage.setItem('buyer', JSON.stringify(state.userData.user));
      state.loading = false;
    },
    [loginBuyer.rejected.toString()]: (state) => {
      state.loading = false;
    }
  }
});

export default userSlice.reducer;
