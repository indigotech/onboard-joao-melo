export interface LoginData {
  login: {
    token: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
  };
}

export interface LoginVars {
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  phone: string;
  birthDate: string;
  email: string;
  role: 'admin' | 'user';
}

export interface PageInfo {
  offset: number;
  limit: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface UsersResponse {
  users: {
    nodes: User[];
    count: number;
    pageInfo: PageInfo;
  };
}
