export interface LoginResponse {
  email: string;
  password: string;
  id: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}
