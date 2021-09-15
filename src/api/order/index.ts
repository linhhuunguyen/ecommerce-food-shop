import axios from 'axios';
import { SERVICE_API } from 'api/service';
import { Order } from 'types/Order';

export const getOrdersList = (): Promise<any> =>
  axios.get(`${SERVICE_API}/orders`);

export const getOrderDetail = (id: string): Promise<any> =>
  axios.get(`${SERVICE_API}/orders/${id}`);

export const addOrder = (order: Order): Promise<any> =>
  axios.post(`${SERVICE_API}/orders`, order);
