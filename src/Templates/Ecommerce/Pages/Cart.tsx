import React, { useEffect, useState } from 'react';
import Footer from "../Components/Footer";
import '../../../assets/styles/templatesStyles/Ecommerce/Cart.scss';
import { useAppDispatch, useAppSelector } from '../../../store';
import { applyTemplateCustomizations } from '../Components/ProductEditUtils';
import { decreaseQuantity, increaseQuantity, removeFromCart } from '../../../Redux/Payment/CartSlice';
import { setProject } from '../../../Redux/Templates/ProjectSlice';
import { MdCancel } from "react-icons/md";
import ShippingAddressEditModal from '../Components/ShippingAddressEditModal';
import { OrderState, initialOrderState } from '../../../Redux/Payment/PaymentInitialState';
import { makeOrder } from '../../../Redux/Payment/PaymentSlice';
import { toast } from 'react-toastify';
import NoSearchNavbar from '../Components/NoSearchNavbar';
import { Link } from 'react-router-dom';
import { AuthLoader } from '../../../components/authComponents/AuthLoader';


const Cart:React.FC = () => {
  const dispatch = useAppDispatch();
  //const navigate = useNavigate();
  const [orderId, setOrderId] = useState({set: false, value: ""});
  const [loader, setLoader] = useState<boolean>(false);


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
  
  const cartProducts = useAppSelector((state) => state.cart.products);
  const cartItemCount = cartProducts.length;
  const totalAmount = cartProducts.reduce((total, product) => total +  ((product.discount && product.discount > 0 ? calculateDiscountedPrice(product.price, product.discount) : product.price) * (product.quantity ? product.quantity : 0)), 0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState<OrderState>({
    ...initialOrderState, 
    shipping_reciepient_names: '',
    products: cartProducts,
    amount: totalAmount,
    userId: '',
  });

  function calculateDiscountedPrice(originalPrice: number, discountPercentage: number): number {
    if (originalPrice <= 0 || discountPercentage < 0 || discountPercentage >= 100) {
      throw new Error('Invalid input. The original price and discount percentage should be positive numbers.');
    }
    const discountAmount = (originalPrice * discountPercentage) / 100;
    const discountedPrice = originalPrice - discountAmount;
  
    return discountedPrice;
  }

  useEffect(() => {
    const fetchCustomer = () => {
      const customer = localStorage.getItem("customer");
      const project = localStorage.getItem("project");
      if (customer) {
        const parsedCustomer = JSON.parse(customer);
        setOrderDetails((prevOrderDetails) => ({
          ...prevOrderDetails,
          shipping_reciepient_names: `${parsedCustomer.first_name} ${parsedCustomer.last_name}`,
          userId: parsedCustomer.id || '',
        }));
      }
      if (project) {
        const parsedProject = JSON.parse(project);
        setOrderDetails((prevOrderDetails) => ({
          ...prevOrderDetails,
          project_id: parsedProject.id || '',
        }));
      }
    };
  
    fetchCustomer();
  }, []);

  useEffect(() => {
    setOrderDetails(prevOrderDetails => ({
      ...prevOrderDetails,
      amount: totalAmount,
      products: cartProducts
    }));
  }, [totalAmount, cartProducts]);
  
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleOrderSubmit = async (data: OrderState) => {
    setLoader(true);
    const updatedOrderDetails = {
      ...orderDetails,
      ...data
    };
    setOrderDetails(updatedOrderDetails);
    closeModal();
    try {
      const response = await dispatch(makeOrder(updatedOrderDetails));
      if(response.payload.data.success){
        setOrderId({set: true, value: response.payload.data.data.id})
        window.localStorage.setItem('order', JSON.stringify(response.payload.data.data));
        setLoader(false);
        toast.success(response.payload.data.message);
      }
    } catch (error) {
      setLoader(false);
      toast.warn('Sorry, could not process orders at this time. Try agin later.')
    }
  };

  const handleQuantityIncrement = (id: string) => {
    dispatch(increaseQuantity(id));
  };
  
  const handleQuantityDecrement = (id: string) => {
    dispatch(decreaseQuantity(id));
  };
  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
  };
  

  return (
    <>
      <NoSearchNavbar />
      <section className="container">
        <h2 className="container-header">Cart ({cartItemCount})</h2>
        {cartProducts.map(product => (
          <div className="cart-info">
            <div className='cart-div-one'>
              <div style={{backgroundImage: `url(${product.image})`}} className='cart-image-div'></div>
              <div className='cart-product-detail'>
                <h5 className='product-name'><b>Name: </b>{product.productName}</h5>
                <p className='product-seller'><b>Seller: </b>{project.name}</p>
                <p className='stock-available'><b>Stock: </b>{product.initialStock} Available</p>
              </div>
            </div>
            <div className='cart-div-two'>
              <div className='math-calc'>
                <p className='math-calc-sign' onClick={() => handleQuantityDecrement(product.id || '')}>—</p>
                <p className='math-space'>{product.quantity}</p>
                <p className='math-calc-sign' onClick={() => handleQuantityIncrement(product.id || '')}>+</p>
              </div>
              <h4 className='product-value'>
              {project.currency} {
                    product.discount && product.discount > 0 
                    ? (calculateDiscountedPrice(product.price , product.discount) * 
                    (product.quantity ? product.quantity : 0)).toLocaleString()
                    : (product.price * (product.quantity ? product.quantity : 0)).toLocaleString()
                  }
              </h4>
            </div>
             
              <MdCancel onClick={() => handleRemove(product.id || '')} />
            
          </div>
        ))}
        <div className='main-checkout'>
          <div className="checkout">
            <div className="checkout-amount">
              {project.currency} {totalAmount.toLocaleString()}
            </div>
            { 
              orderId.set ? 
              (<Link to={project.currency === 'GHS' ? '/non-direct-payment' : '/payment'} state={{id: orderId.value}} className="checkout-button">
                Make Payment Now
              </Link>): (
                <div onClick={openModal} className="checkout-button">
                Order Now
              </div>
              )
            }
            
          </div>
        </div>
        
        <div className="shipping-info">
          <div className="information">
            <div className="name-and-number">
              <h2>{orderDetails.shipping_reciepient_names}</h2>
              <p>{orderDetails.shipping_reciepient_contacts}</p>
            </div>
            <div className="address">
              <p>{orderDetails.shipping_reciepient_address}</p>
              <p>{orderDetails.pickup_mode}</p>
            </div>
          </div>
          <div className="change">
            <button className="change-button" onClick={openModal}>
              Change
            </button>
            {isModalOpen && (
              <ShippingAddressEditModal
                onClose={closeModal}
                initialData={orderDetails}
                onSubmit={handleOrderSubmit}
              />
            )}
          </div>
        </div>
      </section>
      
      <Footer />
      {loader ? <AuthLoader /> : null}
    </>
  );
};

export default Cart;
