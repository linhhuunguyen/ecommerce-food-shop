import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import {
  getPrductsList,
  getProductDetail,
  getPrductsGroup
} from "api/products";
import { Product } from "types/Product";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    const response = await getPrductsList();
    return response.data;
  }
);

export const getGroup = createAsyncThunk(
  "productsGroup/getPrductsGroup",
  async (cate: string = "juice") => {
    const response = await getPrductsGroup(cate);
    return response.data;
  }
);

export const getProduct = createAsyncThunk(
  "product/getProduct",
  async (id: number) => {
    const response = await getProductDetail(id);
    return response.data;
  }
);

interface initialStateType {
  productsList: Product[];
  getPrductsGroup: Product[];
  productDetail: Product;
  loading: boolean;
}

const initialState: initialStateType = {
  productsList: [],
  getPrductsGroup: [],
  productDetail: {
    id: 0,
    name: "",
    des: "",
    price: 0,
    category: "",
    cartQuantity: 1,
    images: []
  },
  loading: false
};

const productSlide = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: {
    // productsList
    [getProducts.pending.toString()](state) {
      state.loading = true;
    },
    [getProducts.fulfilled.toString()](
      state,
      action: PayloadAction<Product[]>
    ) {
      if (!action.payload) return;
      state.productsList = [...action.payload];
      state.loading = false;
    },
    [getProducts.rejected.toString()]: (state) => {
      state.loading = false;
    },

    // getPrductsGroup
    [getGroup.pending.toString()](state) {
      state.loading = true;
    },
    [getGroup.fulfilled.toString()](state, action: PayloadAction<Product[]>) {
      if (!action.payload) return;
      state.productsList = [...action.payload];
      state.loading = false;
    },
    [getGroup.rejected.toString()]: (state) => {
      state.loading = false;
    },

    // getProduct
    [getProduct.pending.toString()]: (state) => {
      state.loading = true;
    },
    [getProduct.fulfilled.toString()]: (
      state,
      action: PayloadAction<Product>
    ) => {
      if (!action.payload) return;
      state.productDetail = { ...action.payload };
      state.loading = false;
    },
    [getProduct.rejected.toString()]: (state) => {
      state.loading = true;
    }
  }
});

export default productSlide.reducer;
