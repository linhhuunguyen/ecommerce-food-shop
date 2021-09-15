export interface Cart {
  cartItems: CartItem[];
  cartTotalAmount: number;
}

interface CartItem {
  id: any;
  name: string;
  des: string;
  price: number;
  category: string;
  quantity: number;
  images: Images[];
  cartQuantity: number;
}

interface Images {
  idI: string;
  image: string;
}
