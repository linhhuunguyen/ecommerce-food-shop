import axios from "axios";
import { SERVICE_API } from "api/service";

export const getOrdersList = (): Promise<any> =>
  axios.get(`${SERVICE_API}/orders`);

export const getOrderDetail = (id: any): Promise<any> =>
  axios.get(`${SERVICE_API}/orders/${id}`);

export const addOrder = (order: any): Promise<any> =>
  axios.post(`${SERVICE_API}/orders`, order);
