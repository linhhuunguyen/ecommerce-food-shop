import axios from "axios";
import { SERVICE_API } from "api/service";

export const getCategoryList = (): Promise<any> =>
  axios.get(`${SERVICE_API}/categories`);

export const deleteCategories = (id: number): Promise<any> =>
  axios.delete(`${SERVICE_API}/categories/${id}`);
