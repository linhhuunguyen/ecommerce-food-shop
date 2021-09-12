import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import {
  getPrductsList,
  getProductDetail,
  getPrductsGroup,
  deleteProducts,
  addProducts,
  updateProducts
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

// add Product

export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (product: Product) => {
    const response = await addProducts(product);
    return response.data;
  }
);

// delete Product

export const deleteProduct = createAsyncThunk(
  "category/deleteCategory",
  async (id: any) => {
    const response = await deleteProducts(id);
    return response.data;
  }
);

// update Products

export const updateProduct = createAsyncThunk(
  "category/deleteCategory",
  async (data: any) => {
    const { id, product } = data;
    const response = await updateProducts(id, product);
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
    quantity: 0,
    images: [{ id: "", image: "" }]
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
    },

    // delete Products
    [deleteProduct.pending.toString()]: (state) => {
      state.loading = true;
    },
    [deleteProduct.fulfilled.toString()]: (
      state,
      action: PayloadAction<Product>
    ) => {
      if (!action.payload) return;
      state.productsList = state.productsList.filter(
        (item: any) => item.id !== action.payload.id
      );
      state.loading = false;
    },
    [deleteProduct.rejected.toString()]: (state) => {
      state.loading = true;
    },

    // add Product
    [addProduct.pending.toString()]: (state) => {
      state.loading = true;
    },
    [addProduct.fulfilled.toString()]: (
      state,
      action: PayloadAction<Product>
    ) => {
      if (!action.payload) return;
      state.productsList.push(action.payload);
      state.loading = false;
    },
    [addProduct.rejected.toString()]: (state) => {
      state.loading = true;
    },

    // upadate Product
    [updateProduct.pending.toString()]: (state) => {
      state.loading = true;
    },
    [updateProduct.fulfilled.toString()]: (
      state,
      action: PayloadAction<Product>
    ) => {
      if (!action.payload) return;
      state.productDetail = { ...action.payload };
      state.loading = false;
    },
    [updateProduct.rejected.toString()]: (state) => {
      state.loading = true;
    }
  }
});

export default productSlide.reducer;
