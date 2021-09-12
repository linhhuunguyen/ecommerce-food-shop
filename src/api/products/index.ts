import axios from "axios";
import { SERVICE_API } from "api/service";

export const getPrductsList = (): Promise<any> =>
  axios.get(`${SERVICE_API}/products`);

export const getPrductsGroup = (cate: string): Promise<any> =>
  axios.get(`${SERVICE_API}/products?category=${cate}`);

export const getProductDetail = (id: any): Promise<any> =>
  axios.get(`${SERVICE_API}/products/${id}`);

export const deleteProducts = (id: any): Promise<any> =>
  axios.delete(`${SERVICE_API}/products/${id}`);

export const addProducts = (product: any): Promise<any> =>
  axios.post(`${SERVICE_API}/products`, product);

export const updateProducts = (id: any, product: any): Promise<any> =>
  axios.put(`${SERVICE_API}/products/${id}`, product);
