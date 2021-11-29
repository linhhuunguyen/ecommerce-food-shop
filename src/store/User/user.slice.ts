import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import userAPI from 'api/users';

import { User, Users, Login } from 'types/User';

// get all user -- admin

export const getMembers = createAsyncThunk(
  'users/getUsers',
  async (token: any) => {
    const { data } = await userAPI.getAllUser(token);
    return data;
  }
);

// add Members

export const addMembers = createAsyncThunk(
  'user/addUser',
  async (info: any) => {
    const response = await userAPI.addUser(info);
    return response;
  }
);

// delete Members

export const deleteMembers = createAsyncThunk(
  'user/deleteUser',
  async (id: any) => {
    const response = await userAPI.deleteUser(id);
    return response;
  }
);

// login

export const loginAdmin = createAsyncThunk(
  'user/loginUser',
  async (info: Login) => {
    const { data } = await userAPI.loginUser(info);
    return data;
  }
);

export const loginBuyer = createAsyncThunk(
  'buyer/loginBuyer',
  async (info: Login) => {
    const response = await userAPI.loginUser(info);
    return response;
  }
);

export const detailUserAdmin = createAsyncThunk(
  'admin/deatilAdmin',
  async (token: any) => {
    const { data } = await userAPI.detailUser(token);
    return data;
  }
);

interface InitialStateType {
  usersList: Users[];
  user: Users;
  isLogged: boolean;
  isAdmin: boolean;
  loading: boolean;
}

const initialState: InitialStateType = {
  usersList: [],
  user: {
    _id: '',
    name: '',
    email: '',
    password: '',
    avatar: {
      public_id: '',
      url: ''
    },
    role: '',
    createdAt: ''
  },
  isLogged: false,
  isAdmin: false,
  loading: false
};

const userSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {},
  extraReducers: {
    // loginUser
    [loginAdmin.pending.toString()](state) {
      state.isLogged = false;
      state.isAdmin = false;
      state.loading = true;
    },
    [loginAdmin.fulfilled.toString()](state, action: PayloadAction<Users>) {
      if (!action.payload) return;
      localStorage.setItem('token', 'true');
      // localStorage.setItem('members', JSON.stringify(state.userData.user));
      // localStorage.setItem(state.userData.user.role, state.userData.user.role);
      state.isLogged = true;
      state.isAdmin = true;
      state.loading = false;
    },
    [loginAdmin.rejected.toString()]: (state) => {
      state.isLogged = false;
      state.isAdmin = false;
      state.loading = false;
    },

    // login Buyer
    [loginBuyer.pending.toString()](state) {
      state.isLogged = false;
      state.isAdmin = false;
      state.loading = true;
    },
    [loginBuyer.fulfilled.toString()](state, action: PayloadAction<Users>) {
      if (!action.payload) return;
      state.user = { ...action.payload };
      localStorage.setItem('buyerToken', 'buyer');
      // localStorage.setItem('buyer', JSON.stringify(state.userData.user));
      state.isLogged = true;
      state.isAdmin = false;
      state.loading = false;
    },
    [loginBuyer.rejected.toString()]: (state) => {
      state.isLogged = false;
      state.isAdmin = false;
      state.loading = false;
    },

    // detailAdmin
    [detailUserAdmin.pending.toString()](state) {
      state.isLogged = false;
      state.isAdmin = false;
      state.loading = true;
    },
    [detailUserAdmin.fulfilled.toString()](
      state,
      action: PayloadAction<Users>
    ) {
      if (!action.payload) return;
      state.user = { ...action.payload };
      state.isLogged = true;
      state.isAdmin = true;
      state.loading = false;
    },
    [detailUserAdmin.rejected.toString()](state) {
      state.isLogged = false;
      state.isAdmin = false;
      state.loading = false;
    },

    // getMembers -- admin

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
        (item: any) => item.id !== action.payload._id
      );
      state.loading = false;
    },
    [deleteMembers.rejected.toString()]: (state) => {
      state.loading = false;
    }
  }
});

export default userSlice.reducer;
