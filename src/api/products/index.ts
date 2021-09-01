import axios from "axios";
import { SERVICE_API } from "api/service";

export const getPrductsList = (): Promise<any> =>
  axios.get(`${SERVICE_API}/products`);

export const getPrductsGroup = (cate: string): Promise<any> =>
  axios.get(`${SERVICE_API}/products?category=${cate}`);

export const getProductDetail = (id?: number): Promise<any> =>
  axios.get(`${SERVICE_API}/products/${id}`);
