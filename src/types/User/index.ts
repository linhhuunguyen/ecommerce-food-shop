export interface Users {
  id: number;
  fullname: string;
  contact: string;
  address: string;
  gender: string;
  email: string;
  password: string;
  avatar: string;
  role: string;
}

export interface User {
  accessToken: string;
  user: {
    id: number;
    fullname: string;
    contact: string;
    address: string;
    gender: string;
    email: string;
    password: string;
    avatar: string;
    role: string;
  };
}
