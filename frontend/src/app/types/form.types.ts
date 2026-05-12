import { LoginDto, RegisterDto } from '../api';

export type LoginFormData = LoginDto & {
  staySignedIn: boolean;
};

export type RegisterFormData = RegisterDto & {
  passwordCheck: string;
};
