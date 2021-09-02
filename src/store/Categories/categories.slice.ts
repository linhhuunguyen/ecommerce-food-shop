import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import {
  getCategoryList,
  deleteCategories,
  addCategories,
  getCategory,
  updateCategories
} from "api/categories";
import { Category } from "types/Category";

export const getCategorys = createAsyncThunk(
  "categorys/getCategorys",
  async () => {
    const response = await getCategoryList();
    return response.data;
  }
);

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (id: any) => {
    const response = await deleteCategories(id);
    return response.data;
  }
);

export const addCategory = createAsyncThunk(
  "category/addcategory",
  async (cate: any) => {
    const response = await addCategories(cate);
    return response.data;
  }
);

export const getSingleCategory = createAsyncThunk(
  "category/getSingleCategory",
  async (id: any) => {
    const response = await getCategory(id);
    return response.data;
  }
);

export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async (id: any, cate: any) => {
    const response = await updateCategories(id, cate);
    return response.data;
  }
);

interface InitialStateType {
  cateloryList: Category[];
  singleCategory: Category;
  loading: boolean;
}

const initialState: InitialStateType = {
  cateloryList: [],
  singleCategory: {
    id: "",
    name: "",
    sku: "",
    image: ""
  },
  loading: false
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: {
    [getCategorys.pending.toString()](state) {
      state.loading = true;
    },
    [getCategorys.fulfilled.toString()](
      state,
      action: PayloadAction<Category[]>
    ) {
      if (!action.payload) return;
      state.cateloryList = [...action.payload];
      state.loading = false;
    },
    [getCategorys.rejected.toString()]: (state) => {
      state.loading = false;
    },

    // delete category
    [deleteCategory.pending.toString()](state) {
      state.loading = true;
    },
    [deleteCategory.fulfilled.toString()](
      state,
      action: PayloadAction<Category[]>
    ) {
      if (!action.payload) return;
      state.cateloryList = state.cateloryList.filter(
        (item: any) => item.id !== action.payload
      );

      state.loading = false;
    },
    [deleteCategory.rejected.toString()]: (state) => {
      state.loading = false;
    },

    // add category
    [addCategory.pending.toString()](state) {
      state.loading = true;
    },
    [addCategory.fulfilled.toString()](state, action: PayloadAction<Category>) {
      if (!action.payload) return;
      state.cateloryList.push(action.payload);

      state.loading = false;
    },
    [addCategory.rejected.toString()]: (state) => {
      state.loading = false;
    },

    // get Single Category
    [getSingleCategory.pending.toString()](state) {
      state.loading = true;
    },
    [getSingleCategory.fulfilled.toString()](
      state,
      action: PayloadAction<Category>
    ) {
      if (!action.payload) return;
      state.singleCategory = { ...action.payload };
      state.loading = false;

      state.loading = false;
    },
    [getSingleCategory.rejected.toString()]: (state) => {
      state.loading = false;
    },

    // update category
    [updateCategory.pending.toString()](state) {
      state.loading = true;
    },
    [updateCategory.fulfilled.toString()](
      state,
      action: PayloadAction<Category>
    ) {
      if (!action.payload) return;
      state.singleCategory = { ...action.payload };
      state.loading = false;

      state.loading = false;
    },
    [updateCategory.rejected.toString()]: (state) => {
      state.loading = false;
    }
  }
});

export default categorySlice.reducer;
