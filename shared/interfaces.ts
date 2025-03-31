export interface IUser {
    id: number;
    email: string;
    role: string;
    createdAt: Date;
}

export interface IAuthResponse {
    access_token: string;
    refresh_token?: string;
}