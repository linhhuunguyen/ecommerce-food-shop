export interface Users {
  _id: string;
  name: string;
  email: string;
  password: string;
  avatar: Avatar;
  role: string;
  createdAt: string;
}

interface Avatar {
  public_id: string;
  url: string;
}

export interface User {
  success: boolean;
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    password: string;
    avatar: Avatar;
    role: string;
    createdAt: string;
  };
}

export interface Login {
  email: string;
  password: string;
}
