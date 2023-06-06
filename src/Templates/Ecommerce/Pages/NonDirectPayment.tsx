import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store';
import { setProject } from '../../../Redux/Templates/ProjectSlice';
import { applyTemplateCustomizations } from '../Components/ProductEditUtils';
import { useNavigate } from 'react-router-dom';
import NoSearchNavbar from '../Components/NoSearchNavbar';
import { AuthLoader } from '../../../components/authComponents/AuthLoader';
import '../../../assets/styles/templatesStyles/Ecommerce/NonDirectPayment.scss';
import { OrderResponse } from '../../../Redux/Payment/PaymentInitialState';
import { referenceGenerator } from '../Components/EcommerceUtils';
import PaymentDocument from '../Components/PaymentDocument';
import { PDFDownloadLink } from '@react-pdf/renderer';

const NonDirectPayment: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const storedProject = localStorage.getItem('project');
    if (storedProject) {
      const savedProject = JSON.parse(storedProject);
      dispatch(setProject(savedProject));
    }
  }, [dispatch]);

  const products = useAppSelector((state) => state.cart.products);
  const project = useAppSelector((state) => state.project);
  //const orderDetails = useAppSelector((state) => state.payment.orderDetails);


  useEffect(() => {
    applyTemplateCustomizations(project);
  }, [project]);

  const itemCount = products.length;
  //const totalAmount = products.reduce((total, product) => total + (product.price * (product.quantity ? product.quantity : 0)), 0);
  const currency = project.currency;
  const totalOrders = products.reduce((total, product) => total + (product.quantity ? product.quantity : 0), 0);

  const [currentTab, setCurrentTab] = useState<'Bank' | 'Mobile Money'>('Bank');
  const [orderInformation, setOrderInformation] = useState<OrderResponse>();

  useEffect(() => {
    const order = localStorage.getItem("order");
    if (order) {
        const userOrder = JSON.parse(order);
        setOrderInformation(userOrder);
    }
  },[]);

  const handleCompleteOrder = () => {
    navigate('/order-complete');
  };

  return (
    <>
      <NoSearchNavbar />

      <div className="ndp-main-div">
        <h3 className="ndp-header">{project.name} Payment Information</h3>
        <div className="ndp-content-container">
          <div className="ndp-payment-panel" tabIndex={0}>
            <div className="ndp-tabs-container">
              <button className={`tab ${currentTab === 'Bank' ? 'active' : ''}`} onClick={() => setCurrentTab('Bank')}>
                Bank Transfer
              </button>
              <button className={`tab ${currentTab === 'Mobile Money' ? 'active' : ''}`} onClick={() => setCurrentTab('Mobile Money')}>
                Mobile Money Transfer
              </button>
            </div>
            <div className="ndp-payment-details">
              {currentTab === 'Bank' && (
                <div className="bank-transfer-details">
                  <h4 className="transfer-details-header">Bank Transfer Details</h4>
                  <ul>
                    <li>
                      <span>Account Name:</span> {project.name}
                    </li>
                    <li>
                      <span>Account Number:</span> 00157655478
                    </li>
                    <li>
                      <span>SWIFT CODE:</span> BARCGHAC
                    </li>
                    <li>
                      <span>SORT CODE:</span> 030475
                    </li>
                    <li>
                      <span>Bank Name:</span> Absa Bank
                    </li>
                    <li>
                      <span>Bank Branch:</span> Adenta
                    </li>
                    <li>
                      <span>Payment Reference:</span> {orderInformation?.id && referenceGenerator(orderInformation.id)}
                    </li>
                  </ul>
                </div>
              )}

              {currentTab === 'Mobile Money' && (
                <div className="mobile-money-details">
                  <h4 className="transfer-details-header">Mobile Money Transfer Details</h4>
                  <ul>
                    <li>
                      <span>Account Name:</span> {project.name}
                    </li>
                    <li>
                      <span>Mobile Money Number:</span> {project.phoneNumber}
                    </li>
                    <li>
                      <span>Mobile Money Network:</span> MTN
                    </li>
                    <li>
                      <span>Payment Reference:</span> {orderInformation?.id && referenceGenerator(orderInformation.id)}
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="ndp-summary-div">
            <h4>Your Order Summary</h4>
            <ul className="ndp-summary-list">
              <li>
                <span>Items:</span>
                <span>{itemCount}</span>
              </li>
              <li>
                <span>Total Orders:</span>
                <span>{totalOrders}</span>
              </li>
              <li>
                <span>Payment Method:</span>
                <span>{currentTab} Transfer</span> {/* Change dynamically based on the selected tab */}
              </li>
              <li>
                <span>Amount:</span>
                <span>
                  {currency} {Number(orderInformation?.amount)?.toLocaleString() || ''}
                </span>
              </li>
              <li>
                <span>Order ID:</span>
                <span>
                  {orderInformation?.id}
                </span>
              </li>
            </ul>
          </div>
        </div>
        {/* <button className="ndp-pay-button">Download</button> */}
        <PDFDownloadLink document={<PaymentDocument {...{ project, itemCount, totalOrders, currentTab, currency: currency ?? '', orderInformation }} />} fileName="payment_summary.pdf">
          {({ loading }) =>
            loading ? <AuthLoader /> : <button className="ndp-pay-button">Save</button>
          }
        </PDFDownloadLink>
        <button onClick={handleCompleteOrder} className="ndp-pay-button complete-order">Complete Order</button>
        
      </div>
    </>
  );
};

export default NonDirectPayment;
