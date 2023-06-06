import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrderState, PaymentDetails, PaymentState, StripeDetails } from './PaymentInitialState';
import { AxiosError } from 'axios';
import api from '../axiosClient';

export const initialPaymentState: PaymentState = {
  orderDetails: {
    shipping_reciepient_names: '',
    shipping_reciepient_contacts: '',
    shipping_reciepient_address: '',
    pickup_mode: '',
    project_id: '',
    products: [],
    userId: '',
    amount: 0,
    payment_method: '',
    associated_account_number: '',
  },
  paymentDetails: {
    paymentMethod: 'visa',
    bank: '',
    accountHolder: '', 
    branch: '',
    cardNumber: '', 
    cvc: '',
    expiryDate: '',
  },
  stripeDetails: {
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
};

export const makeOrder = createAsyncThunk(
  'payment/makeOrder',
  async (order: OrderState) => {
    try {
      const response = await api.post("/market/order/new", order);
      if (response) return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          return error.response.data.message;
        }
      }
      return 'An error occurred';
    }
  }
);

export const makePayment = createAsyncThunk(
  'payment/makePayment',
  async (stripeDetails: StripeDetails) => {
    try {
      const response = await api.post('/market/payment', stripeDetails);
      if (response) {
        return response
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          return error.response.data.message;
        }
      }
      return 'An error occurred';
    }
  }
);

export const PaymentSlice = createSlice({
  name: 'payment',
  initialState: initialPaymentState,
  reducers: {
    setCustomerPaymentDetails: (state, action: PayloadAction<PaymentDetails>) => {
      state.paymentDetails = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(makeOrder.fulfilled, (state, action) => {
      state.orderDetails = action.payload.data.data;
    });
    builder.addCase(makePayment.fulfilled, (state, action) => {
      state.stripeDetails = action.payload.data.data;
    });
  },
});

export const { setCustomerPaymentDetails } = PaymentSlice.actions;

export default PaymentSlice.reducer;
