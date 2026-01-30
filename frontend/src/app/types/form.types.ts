export interface LoginData {
  email: string;
  password: string;
  staySignedIn: boolean;
}

export interface RegisterData {
  email: string;
  password: string;
  passwordCheck: string;
}
