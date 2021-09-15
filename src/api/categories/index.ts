import axios from 'axios';
import { SERVICE_API } from 'api/service';
import { Category } from 'types/Category';

export const getCategoryList = (): Promise<any> =>
  axios.get(`${SERVICE_API}/categories`);

export const getCategory = (id: string | number): Promise<any> =>
  axios.get(`${SERVICE_API}/categories/${id}`);

export const deleteCategories = (id: string | number): Promise<any> =>
  axios.delete(`${SERVICE_API}/categories/${id}`);

export const addCategories = (category: Category): Promise<any> =>
  axios.post(`${SERVICE_API}/categories`, category);

export const updateCategories = (
  id: string | number,
  category: Category
): Promise<any> => axios.put(`${SERVICE_API}/categories/${id}`, category);
