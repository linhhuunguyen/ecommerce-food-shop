import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import productAPI from 'api/products';
import { Product, Images } from 'types/Product';

// get all product -- user
export const getProducts = createAsyncThunk(
  'products/getProducts',
  async () => {
    const response = await productAPI.getProductsAPI();
    return response;
  }
);

// get all product -- admin
export const getAdminProducts = createAsyncThunk(
  'products/getAdminProduct',
  async (token?: any) => {
    const { data } = await productAPI.getAdminProductsAPI(token);
    return data;
  }
);

export const getGroup = createAsyncThunk(
  'productsGroup/getPrductsGroup',
  async (cate: string = 'juice') => {
    const response = await productAPI.getPrductGroup(cate);
    return response;
  }
);

export const getProduct = createAsyncThunk(
  'product/getProduct',
  async (id: string) => {
    const { data } = await productAPI.getProduct(id);
    return data;
  }
);

// add Product

interface addProductType {
  product: Product;
  token: string;
}

export const addProduct = createAsyncThunk(
  'product/addProduct',
  async (dataP: addProductType) => {
    const { product, token } = dataP;

    const { data } = await productAPI.addProduct(product, token);
    return data;
  }
);

// delete Product

export const deleteProduct = createAsyncThunk(
  'category/deleteCategory',
  async (id: string) => {
    const response = await productAPI.deleteProduct(id);
    return response;
  }
);

// update Products

interface UpdateProduct {
  id: string;
  product: Product;
  token: string;
}

export const updateProduct = createAsyncThunk(
  'category/deleteCategory',
  async (data: UpdateProduct) => {
    const { id, product, token } = data;
    const response = await productAPI.updateProduct(id, product, token);
    return response;
  }
);

interface ProductData {
  success: boolean;
  products: Product[];
  productCount: number;
}

interface initialStateType {
  products: Product[];
  productsUser: Product[];
  getPrductsGroup: Product[];
  productDetail: Product;
  loading: boolean;
}

const initialState: initialStateType = {
  products: [],
  productsUser: [],
  getPrductsGroup: [],
  productDetail: {
    _id: '',
    name: '',
    description: '',
    price: 0,
    ratings: 0,
    images: [{ public_id: '', url: '' }],
    category: [''],
    stock: 0,
    numOfReviews: 0,
    createAt: ''
  },
  loading: false
};

interface NameSelectCategory {
  productName: string;
  dbCategory: string[];
}

interface Demo {
  parent: string;
  name: string;
}

const productSlide = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addNameCategory(state, action: PayloadAction<NameSelectCategory>) {
      state.productDetail.name = action.payload.productName;
      state.productDetail.category = action.payload.dbCategory;
    }
  },
  extraReducers: {
    // productsList -- user
    [getProducts.pending.toString()](state) {
      state.loading = true;
    },
    [getProducts.fulfilled.toString()](
      state,
      action: PayloadAction<Product[]>
    ) {
      if (!action.payload) return;
      state.productsUser = [...action.payload];
      state.loading = false;
    },
    [getProducts.rejected.toString()]: (state) => {
      state.loading = false;
    },
    // productsList -- admin
    [getAdminProducts.pending.toString()](state) {
      state.loading = true;
    },
    [getAdminProducts.fulfilled.toString()](
      state,
      action: PayloadAction<Product[]>
    ) {
      if (!action.payload) return;
      state.products = [...action.payload];
      state.loading = false;
    },
    [getAdminProducts.rejected.toString()]: (state) => {
      state.loading = false;
    },

    // getPrductsGroup
    [getGroup.pending.toString()](state) {
      state.loading = true;
    },
    [getGroup.fulfilled.toString()](state, action: PayloadAction<Product[]>) {
      if (!action.payload) return;
      state.products = [...action.payload];
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
      state.products = state.products.filter(
        (item: any) => item.id !== action.payload._id
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
      state.products.push(action.payload);
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

export const { addNameCategory } = productSlide.actions;

export default productSlide.reducer;
