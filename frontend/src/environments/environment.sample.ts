import type { Environment } from './environment.type';

export const environment: Environment = {
  apiUrl: 'http://localhost:3800',
  apiPoints: {
    authRegister: '/auth/register',
    authLogin: '/auth/login',
    authLogout: '/auth/logout',
    authCsrf: '/auth/csrf',
    authRefresh: '/auth/refresh',
    authUser: '/auth/user',
    changePassword: '/auth/change-password',
  },
};
