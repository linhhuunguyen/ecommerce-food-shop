import axiosClient from 'api/service';
import axios from 'axios';
import { Login } from 'types/User';
import apiConfig from '../apiConfig';

const userAPI = {
  getAllUser: (token: any) => {
    const url = `${apiConfig.baseUrl}/admin/users`;
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: token
      }
    };
    const res = axios.get(url, config);
    return res;
  },
  detailUser: (token: any) => {
    const url = '/api/v1/me';
    const config = {
      headers: {
        Authorization: token
      }
    };
    const res = axios.get(url, config);
    return res;
  },
  getUser: (id: string | number) => {
    const url: string = `/users/${id}`;
    return axiosClient.get(url);
  },
  deleteUser: (id: string | number) => {
    const url: string = `/users/${id}`;
    return axiosClient.delete(url);
  },
  addUser: (user: any) => {
    const url: string = `/users`;
    return axiosClient.post(url, user);
  },
  updateUser: (id: string | number, user: any) => {
    const url: string = `/users/${id}`;
    return axiosClient.put(url, user);
  },
  loginUser: (user: Login) => {
    const url: string = '/api/v1/login';
    const res = axios.post(url, user);
    return res;
  }
};

export default userAPI;
