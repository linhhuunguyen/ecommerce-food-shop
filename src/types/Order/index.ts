import { CartItem, ShippingInfo } from 'types/Cart';
import { User } from 'types/User';

export interface Order {
  shippingInfo: ShippingInfo;
  orderItem: CartItem[];
  itemsPrice: Number;
  taxPrice: Number;
  shippingPrice: Number;
  totalPrice: Number;
  orderStatus: string;
}
