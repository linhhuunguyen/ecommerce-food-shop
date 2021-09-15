import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getOrdersList, addOrder, getOrderDetail } from 'api/order';

import { Order } from 'types/Order';

// get all orders

export const getOrders = createAsyncThunk('orders/getOrders', async () => {
  const response = await getOrdersList();
  return response.data;
});

// get order Detail

export const getOrder = createAsyncThunk(
  'orders/getOrder',
  async (id: string) => {
    const response = await getOrderDetail(id);
    return response.data;
  }
);

// add orders

export const addOrders = createAsyncThunk(
  'orders/addOrder',
  async (order: Order) => {
    const response = await addOrder(order);
    return response.data;
  }
);

interface InitialStateType {
  orderList: Order[];
  singleOrder: Order;
  loading: boolean;
}

const initialState: InitialStateType = {
  orderList: [],
  singleOrder: {
    id: '',
    info: {
      name: '',
      phone: '',
      email: '',
      address: ''
    },
    orderItem: {
      cartItems: [
        {
          id: '',
          name: '',
          des: '',
          price: 0,
          category: '',
          quantity: 0,
          images: [{ idI: '', image: '' }],
          cartQuantity: 0
        }
      ],
      cartTotalAmount: 0
    }
  },
  loading: false
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: {
    // get all orders
    [getOrders.pending.toString()](state) {
      state.loading = true;
    },
    [getOrders.fulfilled.toString()](state, action: PayloadAction<Order[]>) {
      if (!action.payload) return;
      state.orderList = [...action.payload];
      state.loading = false;
    },
    [getOrders.rejected.toString()]: (state) => {
      state.loading = false;
    },

    // get orders Detail
    [getOrder.pending.toString()](state) {
      state.loading = true;
    },
    [getOrder.fulfilled.toString()](state, action: PayloadAction<Order>) {
      if (!action.payload) return;
      state.singleOrder = { ...action.payload };
      state.loading = false;
    },
    [getOrder.rejected.toString()]: (state) => {
      state.loading = false;
    },

    // add orders

    [addOrders.pending.toString()](state) {
      state.loading = true;
    },
    [addOrders.fulfilled.toString()](state, action: PayloadAction<Order>) {
      if (!action.payload) return;
      state.orderList.unshift(action.payload);
      state.loading = false;
    },
    [addOrders.rejected.toString()]: (state) => {
      state.loading = false;
    }
  }
});

export default orderSlice.reducer;
