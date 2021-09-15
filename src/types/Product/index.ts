export interface Product {
  id: any;
  name: string;
  des: string;
  price: number;
  category: string;
  quantity: number;
  images: Images[];
}

interface Images {
  idI: any;
  image: string;
}
