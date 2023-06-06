import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store';
import { makePayment, setCustomerPaymentDetails } from '../../../Redux/Payment/PaymentSlice';
import '../../../assets/styles/templatesStyles/Ecommerce/Payment.scss';
import { InitialStripeDetails, OrderResponse, PaymentDetails, StripeDetails, initialPaymentState } from '../../../Redux/Payment/PaymentInitialState';
import { toast } from 'react-toastify';
import { setProject } from '../../../Redux/Templates/ProjectSlice';
import { applyTemplateCustomizations } from '../Components/ProductEditUtils';
import { useNavigate } from 'react-router-dom';
import NoSearchNavbar from '../Components/NoSearchNavbar';
import { AuthLoader } from '../../../components/authComponents/AuthLoader';

const Payment: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const storedProject = localStorage.getItem('project');
    if (storedProject) {
      const savedProject = JSON.parse(storedProject);
      dispatch(setProject(savedProject));
    }
  }, [dispatch]);

  const orderDetails = useAppSelector((state) => state.payment.orderDetails);
  const products = useAppSelector((state) => state.cart.products);
  const project = useAppSelector((state) => state.project);
  
  useEffect(() => {
    applyTemplateCustomizations(project);
  }, [project]);

  const itemCount = products.length;
  const currency = project.currency;
  const totalOrders = products.reduce((total, product) => total +  (product.quantity ? product.quantity : 0), 0);

  
  const [loader, setLoader] = useState<boolean>(false);
  const [isButtonClickable, setIsButtonClickable] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState<PaymentDetails>({
    ...initialPaymentState,
    paymentMethod: 'visa',
    bank: '',
    branch: '',
    cvc: '',
    expiryDate: '',
    cardNumber: orderDetails.associated_account_number || '',
    accountHolder: orderDetails.shipping_reciepient_names || '',

  });


const [newPaymentInfo, setNewPaymentInfo] = useState<StripeDetails>(InitialStripeDetails);
const [orderInformation, setOrderInformation] = useState<OrderResponse>();


useEffect(() => {
  const order = localStorage.getItem("order");
  const customer = localStorage.getItem("customer");
  const project = localStorage.getItem('project');
  if (order) {
    const userOrder = JSON.parse(order);
    setNewPaymentInfo((prevState) => ({
      ...prevState,
      shipping_reciepient_names: userOrder.shipping_reciepient_names[0],
      shipping_reciepient_contacts: userOrder.shipping_reciepient_contacts[0],
      shipping_reciepient_address: userOrder.shipping_reciepient_address,
      userId: userOrder.userId,
      orderId: userOrder.id,
      amount: userOrder.amount,
      associated_account_number: userOrder.associated_account_number,
    }));
    setOrderInformation(userOrder);
  }
  if (customer) {
    const user = JSON.parse(customer);
    setNewPaymentInfo((prevState) => ({
      ...prevState,
      customerEmail: user.email,
    }));
  }
  if (project) {
    const store = JSON.parse(project);
    setNewPaymentInfo((prevState) => ({
      ...prevState,
      currency: store.currency,
      storeName: store.name,
    }));
  }
}, []);
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'expiryDate') {
        const date = new Date(value);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const formattedDate = `${year}-${month}`;
        setPaymentInfo((prevPaymentInfo) => ({
        ...prevPaymentInfo,
        [name]: formattedDate,
        }));
    } else {
        setPaymentInfo((prevPaymentInfo) => ({
        ...prevPaymentInfo,
        [name]: value,
        }));
    }
    
  };

  const checkButtonClickable = (updatedPaymentInfo: PaymentDetails) => {
    const {bank, accountHolder, branch, cardNumber, cvc, expiryDate} = updatedPaymentInfo;
    const isAllFieldsFilled =
      bank !== '' &&
      accountHolder !== '' &&
      branch !== '' &&
      cardNumber !== '' &&
      cvc !== '' &&
      expiryDate !== '';

    setIsButtonClickable(isAllFieldsFilled);
  };

  useEffect(() => {
    checkButtonClickable(paymentInfo);
  }, [paymentInfo]);

  const handlePayButtonClick = async () => {
    if (isButtonClickable === false) {
        toast.warn('Payment fields cannot be left empty');
    }else {
      setLoader(true);
      try {
        dispatch(setCustomerPaymentDetails(paymentInfo));
        const response = await dispatch(makePayment(newPaymentInfo));
        if (response && response.payload) {
          window.localStorage.setItem('receipt', JSON.stringify(response.payload.data.data));
          setLoader(false);
          toast.success(response.payload.data.message);
          navigate('/receipt');
        }
      } catch (error) {
        setLoader(false);
        toast.error('Sorry, could not process payment at this time');
      }
    }
  };

  return (
    <>
      <NoSearchNavbar />

      <div className="payment-main-div">
        <h3 className="payment-header">Make Payment</h3>
        <div className="content-container">
          <div className="payment-panel panel1" tabIndex={0}>
            <div className="visa-form-container">
              <p className='payment-method'>Payment Method: {orderDetails.payment_method?.toLocaleUpperCase()}</p>
              <span className="section">
                <span className="input-span">
                  <h4>Bank</h4>
                  <input
                    type="text"
                    name="bank"
                    value={paymentInfo.bank}
                    onChange={handleInputChange}
                    required
                  />
                </span>
                <span className="input-span">
                  <h4>Account Holder</h4>
                  <input
                    type="text"
                    name="accountHolder"
                    value={paymentInfo.accountHolder}
                    onChange={handleInputChange}
                    required
                  />
                </span>
              </span>
              <span className="section">
                <span className="input-span">
                  <h4>Branch</h4>
                  <input
                    type="text"
                    name="branch"
                    value={paymentInfo.branch}
                    onChange={handleInputChange}
                    required
                  />
                </span>
                <span className="input-span">
                  <h4>Account/Card Number</h4>
                  <input
                    type="text"
                    name="cardNumber"
                    value={paymentInfo.cardNumber}
                    onChange={handleInputChange}
                    required
                  />
                </span>
              </span>
              <span className="section">
                <span className="input-span">
                  <h4>CVC</h4>
                  <input
                    type="text"
                    name="cvc"
                    value={paymentInfo.cvc}
                    onChange={handleInputChange}
                    required
                  />
                </span>
                <span className="input-span">
                  <h4>Expiry Date</h4>
                  <input
                    type="month"
                    name="expiryDate"
                    value={paymentInfo.expiryDate}
                    onChange={handleInputChange}
                    required
                  />
                </span>
              </span>
              <span></span>
            </div>
          </div>
          <div className="summary-div">
            <h4>summary</h4>
            <span className="list">
              <span className="list-item">
                <p>Items</p>
                <p>{itemCount}</p>
              </span>
              <span className="list-item">
                <p>Total Orders</p>
                <p>{totalOrders}</p>
              </span>
              <span className="list-item">
                <p>Payment Method</p>
                <p>Visa</p>
              </span>
              <span className="list-item">
                <p>Amount</p>
                <p>{currency} {Number(orderInformation?.amount)?.toLocaleString() || ''}</p>
              </span>
            </span>
          </div>
        </div>
        <button
          className="pay-button"
          onClick={handlePayButtonClick}
          disabled={!isButtonClickable}
          style={!isButtonClickable ? { background: 'rgb(241, 111, 111)' } : {}}
        >
          Pay
        </button>
        {loader ? <AuthLoader /> : null}
      </div>
    </>
  );
};

export default Payment;
