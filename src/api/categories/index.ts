import axiosClient from 'api/service';
import { Category } from 'types/Category';
import axios from 'axios';
import apiConfig from '../apiConfig';

const categoryAPI = {
  getCategoriesAPI: () => {
    const url: string = '/categories';
    return axiosClient.get(url);
  },
  getAdminCategoriesAPI: (token: any) => {
    const url: string = '/api/v1/admin/categories';
    const config = {
      headers: {
        'Content-type': 'multipart/form-data',
        Authorization: token
      }
    };
    const res = axios.get(url, config);
    return res;
  },

  getAdminCategoriesSlugApi: (slug: string) => {
    const url: string = `/api/v1/categories-slug?slug=${slug}`;
    const res = axios.get(url);
    return res;
  },

  getAdminCategoriesDescendantsApi: (id: string) => {
    const url: string = `/api/v1/categories-descendants?category_id=${id}`;
    const res = axios.get(url);
    return res;
  },

  createCategoryAPI: (category: Category) => {
    const url: string = '/admin/category/new';
    return axiosClient.post(url, category);
  },
  getCategory: (id: string | number) => {
    const url: string = `categories/${id}`;
    return axiosClient.get(url);
  },
  updateCategoryAPI: (id: string | number, category: Category) => {
    const url: string = `/admin/category/${id}`;
    return axiosClient.put(url, category);
  },
  deleteCategoryAPI: (id: string | number) => {
    const url: string = `/admin/category/${id}`;
    return axiosClient.delete(url);
  }
};

export default categoryAPI;
