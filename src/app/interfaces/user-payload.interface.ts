export interface UserPayload {
    name: string;
    username?: string;
    email: string;
    password: string;
    confirm_password : string;
}

export interface UserLoginPayload {
    email: string;
    password: string;
}

export interface UserTokenPayload {
    accessToken: string;
    refreshToken: string;
}

export interface LoogedUserPayload {
    name: string;
    email: string;
    created_at: string;
}
export interface CustomerPayload {
    id: number,
    name: string,
    phone: string,
    address: string,
    age: number,
    sex: boolean,
    email: string,
    created_at : string
  }