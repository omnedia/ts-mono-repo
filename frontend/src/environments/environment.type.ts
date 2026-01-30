export interface Environment {
  apiUrl: string;
  apiPoints: {
    authRegister: string;
    authLogin: string;
    authRefresh: string;
    authUser: string;
    changePassword: string;
  };
}
