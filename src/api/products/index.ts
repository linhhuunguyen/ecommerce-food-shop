import axios from 'axios';
import { SERVICE_API } from 'api/service';
import { Product } from 'types/Product';

export const getPrductsList = (): Promise<any> =>
  axios.get(`${SERVICE_API}/products`);

export const getPrductsGroup = (cate: string): Promise<any> =>
  axios.get(`${SERVICE_API}/products?category=${cate}`);

export const getProductDetail = (id: string | number): Promise<any> =>
  axios.get(`${SERVICE_API}/products/${id}`);

export const deleteProducts = (id: string | number): Promise<any> =>
  axios.delete(`${SERVICE_API}/products/${id}`);

export const addProducts = (product: Product): Promise<any> =>
  axios.post(`${SERVICE_API}/products`, product);

export const updateProducts = (
  id: string | number,
  product: Product
): Promise<any> => axios.put(`${SERVICE_API}/products/${id}`, product);
