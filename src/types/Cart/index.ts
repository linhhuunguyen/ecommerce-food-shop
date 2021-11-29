export interface Cart {
  cartItems: CartItem[];
  shippingInfo: ShippingInfo;
}

export interface CartItem {
  id: any;
  name: string;
  price: number;
  images: string;
  quantity: number;
  stock: number;
}

export interface ShippingInfo {
  id?: any;
  name: string;
  address: string;
  city: string;
  country: string;
  phone: string;
}
