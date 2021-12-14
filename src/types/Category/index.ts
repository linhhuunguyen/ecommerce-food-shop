export interface Category {
  _id?: string;
  name: string;
  slug: string;
  parent: string;
  ancestors: Ancestors[];
  description: string;
  status: boolean;
  user: string;
}

interface Ancestors {
  _id: string;
  name: string;
  slug: string;
}
