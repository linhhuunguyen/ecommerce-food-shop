export interface Product {
  _id?: string;
  name: string;
  description: string;
  price: number;
  ratings: number;
  images?: Images[];
  category: string[];
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

export interface Productclassification {
  groupName: string;
  attributes: string[];
  _id: string;
}
export interface ValidateProductclassification {
  groupName: string[];
  attributes: string;
}

export interface ModelList {
  id_model: string;
  modelListName: string;
  price: string;
  stock: string;
  sku: string;
}
