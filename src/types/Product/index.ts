export interface Product {
  _id?: string;
  name: string;
  description: string;
  price: number;
  ratings: number;
  images?: Images[];
  category: string;
  stock: number;
  numOfReviews: number;
  reviews?: Reviews[];
  createAt?: string;
}

export type Images = {
  public_id: string;
  url: string;
};

interface Reviews {
  user: string;
  name: string;
  rating: number;
  comment: string;
}
