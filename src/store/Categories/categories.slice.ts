import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { getCategoryList, deleteCategories } from "api/categories";
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
  async (id: number) => {
    const response = await deleteCategories(id);
    return response.data;
  }
);

interface InitialStateType {
  cateloryList: Category[];
  loading: boolean;
}

const initialState: InitialStateType = {
  cateloryList: [],
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
      state.cateloryList = [...action.payload];
      state.loading = false;
    },
    [deleteCategory.rejected.toString()]: (state) => {
      state.loading = false;
    }
  }
});

export default categorySlice.reducer;
