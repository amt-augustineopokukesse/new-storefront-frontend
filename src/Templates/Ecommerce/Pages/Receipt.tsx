import React, { useEffect, useState } from 'react';
import '../../../assets/styles/templatesStyles/Ecommerce/Receipt.scss';
import { useAppDispatch, useAppSelector } from '../../../store';
import { applyTemplateCustomizations } from '../Components/ProductEditUtils';
import { setProject } from '../../../Redux/Templates/ProjectSlice';
import carIcon from '../../../assets/images/Templates/Ecommerce/car.png';
import { useNavigate } from 'react-router-dom';
import NoSearchNavbar from '../Components/NoSearchNavbar';
import { InitialStripeResponse, StripeResponse } from '../../../Redux/Payment/PaymentInitialState';

const Receipt:React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const storedProject = localStorage.getItem('project');
    if (storedProject) {
      const savedProject = JSON.parse(storedProject);
      dispatch(setProject(savedProject));
    }
  }, [dispatch]);

  const project = useAppSelector((state) => state.project);

  useEffect(() => {
    applyTemplateCustomizations(project);
  }, [project]);

  const [receipt, setReceipt] = useState<StripeResponse>(InitialStripeResponse);

useEffect(() => {
  const stripeReceipt = localStorage.getItem("receipt");
  if (stripeReceipt) {
    const userReceipt = JSON.parse(stripeReceipt);
    setReceipt((prevState) => ({
      ...prevState,
      shipping_reciepient_names: userReceipt.shipping.name,
      shipping_reciepient_contacts: userReceipt.shipping.phone,
      shipping_reciepient_address: userReceipt.shipping.address.city,
      description: userReceipt.description,
      id: userReceipt.id,
      seller_message: userReceipt.outcome.seller_message,
      receipt_email: userReceipt.receipt_email, 
      receipt_url: userReceipt.receipt_url,
    }));
  }
}, []);
 
  const handleDashboardButton = () => {
    navigate('/custdashboard');
  };

  return (
    <>
      <NoSearchNavbar />
      <section className="container">
        <div className="container-header">{receipt.seller_message}<br/>{receipt.description}</div>
        <div className='receipt'>
          <div className='image-div'>
            <img src={carIcon} alt="" />
            <p>Almost there</p>
          </div>
          <div className="shipping-info">
            <p className='delivery-text'>Processing package for</p>
            <div className="information">
              <div className="name-and-number">
                <h2>{receipt.shipping_reciepient_names}</h2>
                <p>{receipt.shipping_reciepient_contacts}</p>
              </div>
              <div className="address">
                <p>{receipt.shipping_reciepient_address}</p>
                <p>{receipt.receipt_email}</p>
                <a id="http" href={receipt.receipt_url} target="_blank" rel="noreferrer">
                    click to view receipt
                </a>
              </div>
            </div>
        </div>
        </div>
          <button className='dashboard-button' onClick={handleDashboardButton}>
            Return to Dashboard
          </button>
      </section>
    </>
  );
};

export default Receipt;
