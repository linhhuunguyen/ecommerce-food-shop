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

// get Categories Slug

export const getCategoriesSlug = createAsyncThunk(
  'category/getCategoriesSlug',
  async (slug: string) => {
    const { data } = await categoryAPI.getAdminCategoriesSlugApi(slug);
    return data;
  }
);

// get Categories Descendants

export const getCate3 = createAsyncThunk(
  'category/getCategoriesDescendants',
  async (id: string) => {
    const { data } = await categoryAPI.getAdminCategoriesDescendantsApi(id);
    return data;
  }
);

// get Cate3

export const getCate2 = createAsyncThunk(
  'category/getCategoriesDescendants3',
  async (id: string) => {
    const { data } = await categoryAPI.getAdminCate3Api(id);
    return data;
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

interface Cate2 {
  _id: '';
  name: '';
}
interface Cate3 {
  _id: '';
  name: '';
}

interface InitialStateType {
  cateloryList: Category[];
  categoriesSlug: Category[];
  cate2: Cate2[];
  cate3: Cate3[];
  singleCategory: Category;
  loading: boolean;
}

const initialState: InitialStateType = {
  cateloryList: [
    {
      _id: '',
      name: '',
      slug: '',
      parent: '',
      ancestors: [],
      description: '',
      status: true,
      user: ''
    }
  ],
  categoriesSlug: [
    {
      _id: '',
      name: '',
      slug: '',
      parent: '',
      ancestors: [],
      description: '',
      status: true,
      user: ''
    }
  ],
  cate2: [{ _id: '', name: '' }],
  cate3: [{ _id: '', name: '' }],
  singleCategory: {
    _id: '',
    name: '',
    slug: '',
    parent: '',
    ancestors: [],
    description: '',
    status: true,
    user: ''
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
      action: PayloadAction<Category[]>
    ) {
      if (!action.payload) return;
      state.cateloryList = [...action.payload];
      state.loading = false;
    },
    [getCategories.rejected.toString()]: (state) => {
      state.loading = false;
    },

    // get categories for slug
    [getCategoriesSlug.pending.toString()](state) {
      state.loading = true;
    },
    [getCategoriesSlug.fulfilled.toString()](
      state,
      action: PayloadAction<Category[]>
    ) {
      if (!action.payload) return;
      state.categoriesSlug = [...action.payload];
      state.loading = false;
    },
    [getCategoriesSlug.rejected.toString()]: (state) => {
      state.loading = true;
    },

    // get categories case 2

    [getCate3.pending.toString()](state) {
      state.loading = true;
    },
    [getCate3.fulfilled.toString()](state, action: PayloadAction<Cate3[]>) {
      if (!action.payload) return;
      state.cate3 = [...action.payload];
      state.loading = false;
    },
    [getCate3.rejected.toString()]: (state) => {
      state.loading = true;
    },

    // get categories case 3
    [getCate2.pending.toString()](state) {
      state.loading = true;
    },
    [getCate2.fulfilled.toString()](state, action: PayloadAction<Cate2[]>) {
      if (!action.payload) return;
      state.cate2 = [...action.payload];
      state.loading = false;
    },
    [getCate2.rejected.toString()]: (state) => {
      state.loading = true;
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
      action: PayloadAction<Category[]>
    ) {
      if (!action.payload) return;
      state.cateloryList = [...action.payload];
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
      state.cateloryList.push(action.payload.category);
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
      state.cateloryList = state.cateloryList.filter(
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
