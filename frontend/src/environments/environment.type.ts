export interface Environment {
  apiUrl: string;
  apiPoints: {
    authRegister: string;
    authLogin: string;
    authLogout: string;
    authCsrf: string;
    authRefresh: string;
    authUser: string;
    changePassword: string;
  };
}
