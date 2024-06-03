export type Login = {
    username: string;
    password: string;
    remember_login : boolean;
}

export type forGotPassword = {
    email: string;
}
export type SignUp = {
    userName: string;
    password: string;
    fullname : string;
    role: number
}

export interface AuthWrapperProps {
    children?: React.ReactNode;
  }