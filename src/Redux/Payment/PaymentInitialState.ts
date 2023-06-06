import { ProductState } from "../Templates/ProjectInitialState";

export interface PaymentDetails {
    paymentMethod?: string;
    bank?: string;
    accountHolder?: string;
    branch?: string;
    cardNumber?: string;
    cvc?: string;
    expiryDate?: string;
}

export interface StripeDetails {
    shipping_reciepient_names?: string;
    shipping_reciepient_contacts?: string;
    shipping_reciepient_address?: string;
    userId?: string;
    orderId?: string;
    currency?: string;
    storeName?: string;
    customerEmail?: string;
    amount?: number;
    associated_account_number?: string;
}

export const InitialStripeDetails = {
    shipping_reciepient_names: '',
    shipping_reciepient_contacts: '',
    shipping_reciepient_address: '',
    userId: '',
    orderId: '',
    currency: '',
    storeName: '',
    customerEmail: '',
    amount: 0,
    associated_account_number: '',
}

export interface StripeResponse {
    shipping_reciepient_names?: string;
    shipping_reciepient_contacts?: string;
    shipping_reciepient_address?: string;
    userId?: string;
    orderId?: string;
    currency?: string;
    storeName?: string;
    customerEmail?: string;
    amount?: number;
    associated_account_number?: string;
    description?: string;
    id?: string;
    seller_message?: string;
    payment_method?: string;
    receipt_email?: string; 
    receipt_url?: string; 
}

export const InitialStripeResponse = {
    shipping_reciepient_names: '',
    shipping_reciepient_contacts: '',
    shipping_reciepient_address: '',
    userId: '',
    orderId: '',
    currency: '',
    storeName: '',
    customerEmail: '',
    amount: 0,
    associated_account_number: '',
    description: '',
    id: '',
    seller_message: '',
    payment_method: '',
    receipt_email: '', 
    receipt_url: '',
}

export interface PaymentState {
    orderDetails: OrderState;
    paymentDetails: PaymentDetails;
    stripeDetails: StripeDetails;
}
  
export interface OrderState {
    shipping_reciepient_names?: string;
    shipping_reciepient_contacts?: string;
    shipping_reciepient_address?: string;
    pickup_mode?: string;
    project_id?: string;
    products?: ProductState[];
    userId?: string;
    amount?: number;
    payment_method?: string;
    associated_account_number?: string;
}

export interface OrderResponse {
    id:                           string;
    project_id:                   string;
    products?:                     string;
    userId:                       string;
    amount?:                       number;
    paid:                         boolean;
    shipping_reciepient_names:    string[];
    shipping_reciepient_contacts: string[];
    shipping_reciepient_address:  string;
    pickup_mode?:                  string;
    payment_method?:               string;
    associated_account_number:    string;
    delivery_level_reached:       string;
    delivery_completed:           boolean;
    created_at:                   Date;
    updated_at:                   Date;
}


export const initialOrderState = {
    shipping_reciepient_names: '',
    shipping_reciepient_contacts: 'No contact added for Delivery',
    shipping_reciepient_address: 'No address added for Delivery',
    pickup_mode: 'No pickup mode included',
    project_id: '',
    products: [],
    userId: '',
    amount: 0,
    payment_method: 'visa',
    associated_account_number: '',
}



export const initialPaymentState = {
    paymentMethod: 'visa',
    bank: '',
    accountHolder: '', 
    branch: '',
    cardNumber: '', 
    cvc: '',
    expiryDate: '',
}
