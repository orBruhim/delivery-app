export interface LoginResponse {
  accessToken: string;
  user: {
    email: string;
    id: number;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}
