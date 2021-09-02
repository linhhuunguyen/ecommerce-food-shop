import axios from "axios";
import { SERVICE_API } from "api/service";

export const getCategoryList = (): Promise<any> =>
  axios.get(`${SERVICE_API}/categories`);

export const getCategory = (id: any): Promise<any> =>
  axios.get(`${SERVICE_API}/categories/${id}`);

export const deleteCategories = (id: any): Promise<any> =>
  axios.delete(`${SERVICE_API}/categories/${id}`);

export const addCategories = (cate: any): Promise<any> =>
  axios.post(`${SERVICE_API}/categories`, cate);

export const updateCategories = (id: any, cate: any): Promise<any> =>
  axios.put(`${SERVICE_API}/categories/${id}`, cate);
