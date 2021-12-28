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

interface Category {
  parent: string;
  name: string;
}

export interface Productclassification {
  groupName: string;
  attributes: string[];
  _id: string;
}

export interface Attributes {
  nameA: string;
  id: string;
}

export interface ModelList {
  name: string;
}
