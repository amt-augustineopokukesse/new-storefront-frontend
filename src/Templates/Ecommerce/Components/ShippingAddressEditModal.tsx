import React, { useState } from 'react';
import '../../../assets/styles/templatesStyles/Ecommerce/CustomizationModal.scss';
import { OrderState } from '../../../Redux/Payment/PaymentInitialState';
import { useAppSelector } from '../../../store';

const ShippingAddressEditModal: React.FC<{
  onClose: () => void;
  initialData: OrderState;
  onSubmit: (data: OrderState) => void;
}> = ({ onClose, initialData, onSubmit }) => {
  
  const [name, setName] = useState(initialData.shipping_reciepient_names);
  const [phoneNumber, setPhoneNumber] = useState(initialData.shipping_reciepient_contacts);
  const [address, setAddress] = useState(initialData.shipping_reciepient_address);
  const [pickup_mode, setPickupMode] = useState('Self Pickup');
  const [paymentMethod, setPaymentMethod] = useState('visa');
  const [associatedAccountNumber, setAssociatedAccountNumber] = useState('');

  const project = useAppSelector((state) => state.project);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data: OrderState = {
      shipping_reciepient_names: name,
      shipping_reciepient_contacts: phoneNumber,
      shipping_reciepient_address: address,
      pickup_mode: pickup_mode,
      payment_method: paymentMethod,
      associated_account_number: associatedAccountNumber,
      products: initialData.products,
      amount: initialData.amount,
      // userId: initialData.userId,
      project_id: initialData.project_id,
    };
    onSubmit(data);
  };

  return (
    <div className="customization-modal">
      <div className="shipping-address-content">
        <h2>Provide Your Order Information</h2>
        {project.currency === 'GHS' && 
          <p>
            Dear Customer, kindly note that this shop only accepts mobile money and bank transfer payments.
          </p>
        }
        <form onSubmit={handleFormSubmit} className="shipping-info-form">
          <div className="shipping-form-item">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="shipping-form-item">
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="number"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              pattern="[0-9]"
              maxLength={10}
              onKeyDown={(e) => {
              const allowedKeys = ['Backspace', 'Delete'];
              const onlyDigits = /[0-9]/;
              if (!onlyDigits.test(e.key) && !allowedKeys.includes(e.key)) {
                e.preventDefault();
              }
            }}
            />
          </div>
          <div className="shipping-form-item">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="shipping-form-item">
            <label htmlFor="pickupMode">Mode of Pickup:</label>
            <select
              id="pickupMode"
              value={pickup_mode}
              onChange={(e) => setPickupMode(e.target.value)}
            >
              <option value="Self Pickup">Self Pickup</option>
              <option value="Delivery">Delivery</option>
            </select>
          </div>
          <div className="shipping-form-item">
            <label htmlFor="paymentMethod">Payment Method:</label>
            <select
              id="paymentMethod"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="visa">Visa</option>
              <option value="paypal">PayPal</option>
              <option value="bank tranfer">Bank Transfer</option>
              <option value="credit card">Credit Card</option>
              <option value="mobile money">Mobile Money</option>
            </select>
          </div>
          <div className="shipping-form-item">
            <label htmlFor="associatedAccountNumber">Associated Account/Card Number:</label>
            <input
              type="text"
              id="associatedAccountNumber"
              value={associatedAccountNumber}
              onChange={(e) => setAssociatedAccountNumber(e.target.value)}
              onKeyDown={(e) => {
                const allowedKeys = ['Backspace', 'Delete'];
                const onlyDigits = /[0-9]/;
                if (!onlyDigits.test(e.key) && !allowedKeys.includes(e.key)) {
                  e.preventDefault();
                }
              }}
            />
          </div>
          <button className="save-shipping-info" type="submit">
            Save
          </button>
        </form>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ShippingAddressEditModal;
