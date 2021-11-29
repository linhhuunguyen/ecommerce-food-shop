import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import categoryAPI from 'api/categories';

import { Category } from 'types/Category';

// get All Categories

export const getCategories = createAsyncThunk(
  'categorys/getCategories',
  async () => {
    const response = await categoryAPI.getCategoriesAPI();
    return response;
  }
);

// getSingle Category
export const getSingleCategory = createAsyncThunk(
  'category/getSingleCategory',
  async (id: any) => {
    const response = await categoryAPI.getCategory(id);
    return response;
  }
);

// Get  all categories -- Admin
export const getAdminCategories = createAsyncThunk(
  'categories/getAdminCategories',
  async (token: any) => {
    const { data } = await categoryAPI.getAdminCategoriesAPI(token);
    return data;
  }
);

// Create category -- Admin
export const addCategory = createAsyncThunk(
  'category/addcategory',
  async (category: Category) => {
    const response = await categoryAPI.createCategoryAPI(category);
    return response;
  }
);

// Update Category -- Admin
export const updateCategory = createAsyncThunk(
  'category/updateCategory',
  async (data: any) => {
    const { id, category } = data;
    const response = await categoryAPI.updateCategoryAPI(id, category);
    return response.data;
  }
);

// delete Category -- Admin
export const deleteCategory = createAsyncThunk(
  'category/deleteCategory',
  async (id: any) => {
    const response = await categoryAPI.deleteCategoryAPI(id);
    return response;
  }
);

interface Categories {
  success: boolean;
  categories: Category[];
  categoryCount: number;
}

interface AddCategory {
  success: boolean;
  category: Category;
}

interface InitialStateType {
  cateloryList: Categories;
  singleCategory: Category;
  loading: boolean;
}

const initialState: InitialStateType = {
  cateloryList: {
    success: true,
    categories: [
      {
        _id: '',
        name: '',
        description: '',
        status: true
      }
    ],
    categoryCount: 0
  },
  singleCategory: {
    _id: '',
    name: '',
    description: '',
    status: true
  },
  loading: false
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: {
    // get all categories -- user
    [getCategories.pending.toString()](state) {
      state.loading = true;
    },
    [getCategories.fulfilled.toString()](
      state,
      action: PayloadAction<Categories>
    ) {
      if (!action.payload) return;
      state.cateloryList.categories = [...action.payload.categories];
      state.loading = false;
    },
    [getCategories.rejected.toString()]: (state) => {
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
    },
    [getSingleCategory.rejected.toString()]: (state) => {
      state.loading = false;
    },

    // get all categories -- admin
    [getAdminCategories.pending.toString()](state) {
      state.loading = true;
    },
    [getAdminCategories.fulfilled.toString()](
      state,
      action: PayloadAction<Categories>
    ) {
      if (!action.payload) return;
      state.cateloryList.categories = [...action.payload.categories];
      state.loading = false;
    },
    [getAdminCategories.rejected.toString()](state) {
      state.loading = false;
    },

    // create category -- admin
    [addCategory.pending.toString()](state) {
      state.loading = true;
    },
    [addCategory.fulfilled.toString()](
      state,
      action: PayloadAction<AddCategory>
    ) {
      if (!action.payload) return;
      state.cateloryList.categories.push(action.payload.category);
      state.loading = false;
    },
    [addCategory.rejected.toString()]: (state) => {
      state.loading = false;
    },

    // update category -- admin
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
    },
    [updateCategory.rejected.toString()]: (state) => {
      state.loading = false;
    },

    // delete category -- admin
    [deleteCategory.pending.toString()](state) {
      state.loading = true;
    },
    [deleteCategory.fulfilled.toString()](
      state,
      action: PayloadAction<Category[]>
    ) {
      if (!action.payload) return;
      state.cateloryList.categories = state.cateloryList.categories.filter(
        (item: any) => item.id !== action.payload
      );
      state.loading = false;
    },
    [deleteCategory.rejected.toString()]: (state) => {
      state.loading = false;
    }
  }
});

export default categorySlice.reducer;
