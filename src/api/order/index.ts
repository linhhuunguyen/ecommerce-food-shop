import axiosClient from 'api/service';

import { Order } from 'types/Order';

const orderAPI = {
  getOrderList: () => {
    const url = '/orders';
    return axiosClient.get(url);
  },
  getOrder: (id: string | number) => {
    const url: string = `/orders/${id}`;
    return axiosClient.get(url);
  },
  deleteOrder: (id: string | number) => {
    const url: string = `/orders/${id}`;
    return axiosClient.delete(url);
  },
  addOrder: (order: Order) => {
    const url: string = `/orders`;
    return axiosClient.post(url, order);
  },
  updateOrder: (id: string | number, order: Order) => {
    const url: string = `/orders/${id}`;
    return axiosClient.put(url, order);
  }
};

export default orderAPI;
