import { Cart } from "types/Cart";

export interface Order {
  id: any;
  info: Info;
  orderItem: Cart;
}

export interface Info {
  name: string;
  phone: string;
  email: string;
  address: string;
}
