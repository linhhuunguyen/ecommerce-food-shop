import axiosClient from 'api/service';
import axios from 'axios';
import { Product } from 'types/Product';
import apiConfig from '../apiConfig';

const productAPI = {
  getProductsAPI: () => {
    const url = '/products';
    return axiosClient.get(url);
  },
  getAdminProductsAPI: (token: any) => {
    const url = '/api/v1/admin/products';
    const config = {
      headers: {
        'Content-type': 'multipart/form-data',
        Authorization: token
      }
    };
    const res = axios.get(url, config);
    return res;
  },
  getProduct: (id: string) => {
    const url: string = `/api/v1/product/${id}`;
    const res = axios.get(url);
    return res;
  },
  getPrductGroup: (cate: string) => {
    const url: string = `ddd/products?category=${cate}`;
    return axiosClient.get(url);
  },
  deleteProduct: (id: string | number) => {
    const url: string = `/products/${id}`;
    return axiosClient.delete(url);
  },
  addProduct: (product: Product, token: any) => {
    const url: string = '/api/v1/admin/product/new';
    const config = {
      headers: {
        Authorization: token
      }
    };
    const res = axios.post(url, product, config);
    return res;
  },
  updateProduct: (id: any, product: Product, token: any) => {
    const url: string = `/api/v1/admin/product/${id}`;
    const config = {
      headers: {
        Authorization: token
      }
    };
    const res = axios.put(url, product, config);
    return res;
  }
};

export default productAPI;
