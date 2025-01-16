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
