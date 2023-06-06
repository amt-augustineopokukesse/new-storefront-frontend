import { combineReducers } from "redux";
import authReducer from "./Authentication/AuthSlice";
import projectReducer from './Templates/ProjectSlice';
import cartReducer from "../Redux/Payment/CartSlice";
import paymentReducer from '../Redux/Payment/PaymentSlice';
import financeReducer from '../Redux/FinanceSlice'


const rootReducer = combineReducers({
  auth: authReducer,
  project: projectReducer,
  cart: cartReducer,
  payment: paymentReducer,
  finance: financeReducer
});

export default rootReducer;