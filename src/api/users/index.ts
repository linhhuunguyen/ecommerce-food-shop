import axios from "axios";
import { SERVICE_API } from "api/service";

export const getUsersList = (): Promise<any> =>
  axios.get(`${SERVICE_API}/users`);

export const deleteUser = (id: any): Promise<any> =>
  axios.delete(`${SERVICE_API}/users/${id}`);

export const registerUser = (info: any): Promise<any> =>
  axios.post(`${SERVICE_API}/register`, info);

export const loginUser = (info: any): Promise<any> =>
  axios.post(`${SERVICE_API}/login`, info);
