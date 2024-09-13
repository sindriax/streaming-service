export interface User {
    "id"?: number,
    "email": string,
    "password": string
}

export interface UserRegister{
    "email": string,
    "password": string
}

export interface UserLogin{
    "email": string,
    "password": string
}

export interface UserResponse{
    "email": string;
    "token": string;
}