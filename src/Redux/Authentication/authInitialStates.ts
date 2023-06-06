import { OrderResponse } from "../Payment/PaymentInitialState";

export interface ResetPwEmail {
    email: string;
}

export const initialEmailFormState: ResetPwEmail = {
    email: '',
};
export interface NewPassword {
    id?: string;
    password: string;
    confirm_password: string;
}

export const initialPasswordState: NewPassword = {
    id: '',
    password: '',
    confirm_password: ''
};

export interface NewUser {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    confirm_password: string;
}

export interface NewBusiness {
    business_name: string;
    email: string;
    password: string;
    confirm_password: string;
}

export const initialNewUserFormState: NewUser = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
};

export const initialNewBusinessFormState: NewBusiness = {
    business_name: '',
    email: '',
    password: '',
    confirm_password: '',
};

export interface User {
    email: string;
    password: string;
}

export const initialLoginFormState: User = {
    email: '',
    password: '',
};
  
export interface AuthState {
    newUser: NewUser[],
    user: User[],
    isLoggedIn: boolean,
    
}
  
export interface CustomerResponse {
    token:           string;
    id:              string;
    email:           string;
    password:        string;
    contact:         null;
    first_name:      string;
    last_name:       string;
    address:         null;
    business_name:   null;
    activated:       boolean;
    role:            string;
    profile_picture: null;
    business:        null;
    orders:          OrderResponse[];
}

  