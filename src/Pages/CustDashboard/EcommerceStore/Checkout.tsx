// import React, { useEffect, useState } from 'react'
// import '../../../assets/styles/templatesStyles/Ecommerce/Checkout.scss';
// import '../../../assets/styles/templatesStyles/Ecommerce/Cart.scss';
// import { useAppDispatch, useAppSelector } from '../../../store.ts';
// import { decreaseQuantity, increaseQuantity, removeFromCart } from '../../../Redux/CartSlice.ts';
// import { setProject } from '../../../Redux/ProjectSlice.ts';
// import { Link } from 'react-router-dom';
// import { setCustomerShippingAddress } from '../../../Redux/PaymentSlice.ts';
// import { applyTemplateCustomizations } from '../../../Templates/Ecommerce/Components/ProductEditUtils.ts';
// import Navbar from '../../../Templates/Ecommerce/Components/Navbar.tsx';
// import ShippingAddressEditModal from '../../../Templates/Ecommerce/Components/ShippingAddressEditModal.tsx';

// interface ShippingAddressState {
//   name: string;
//   phoneNumber: string;
//   address: string;
//   pickupMode: string;
// }

// const Checkout:React.FC = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [shippingAddress, setShippingAddress] = useState<ShippingAddressState>({
//     name: 'Robert Elinam',
//     phoneNumber: '0240 000 000',
//     address: 'Western Region Sekondi Takoradi Metro Takoradi 17/8 old john saba road.',
//     pickupMode: 'Self-pick: Takoradi office',
//   });

//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   const dispatch = useAppDispatch();
  
//   useEffect(() => {
//     const storedProject = localStorage.getItem('project');
//     if (storedProject) {
//       const savedProject = JSON.parse(storedProject);
//       dispatch(setProject(savedProject));
//       //setActive(true);
//     }
//   }, [dispatch]);

//   const project = useAppSelector((state) => state.project);
//   const cartProducts = useAppSelector((state) => state.cart.products);
//   const payment = useAppSelector((state) => state.payment);

//   console.log(payment);
  
//   useEffect(() => {
//     applyTemplateCustomizations(project);
//   }, [project]);

//   const handleQuantityIncrement = (id: string) => {
//     dispatch(increaseQuantity(id));
//   };
  
//   const handleQuantityDecrement = (id: string) => {
//     dispatch(decreaseQuantity(id));
//   };
//   const handleRemove = (id: string) => {
//     dispatch(removeFromCart(id));
//   };

//   const totalAmount = cartProducts.reduce((total, product) => total + (product.price * product.quantity), 0);

//   const handleAddressSubmit = (data: ShippingAddressState) => {
//     setShippingAddress(data);
//     closeModal();
//     dispatch(setCustomerShippingAddress(data));
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="checkout-container">
//         <div className="process-stages">Payment process stages</div>
//         <h2 className="address-header">Shipping Address</h2>
//         <div className="shipping-info">
//           <div className="information">
//             <div className="name-and-number">
//               <h2>{shippingAddress.name}</h2>
//               <p>{shippingAddress.phoneNumber}</p>
//             </div>
//             <div className="address">
//               <p>{shippingAddress.address}</p>
//               <p>{shippingAddress.pickupMode}</p>
//             </div>
//           </div>
//           <div className="change">
//             <button className="change-button" onClick={openModal}>
//               Change
//             </button>
//             {isModalOpen && (
//               <ShippingAddressEditModal
//                 onClose={closeModal}
//                 initialData={shippingAddress}
//                 onSubmit={handleAddressSubmit}
//               />
//             )}
//           </div>
//         </div>
//         <section className="container">
//         {cartProducts.map(product => (
//           <div className="cart-info">
//             <img src={product.image} className='cart-product-image'/>
//             <div className="cart-product-info">
//               <h2 className="cart-product-name">{product.productName}</h2>
//               <p className="cart-product-seller">Seller: {project.name}</p>
//               <p className="product-number-available">{product.initialStock} available</p>
//             </div>
//             <div className="cart-product-price">
//               {project.currency} {(product.price * product.quantity).toLocaleString()}
//             </div>
//             <div className="quantity">
//               <div className="number-selector">
//                 <p className="minus" onClick={() => handleQuantityDecrement(product.id)}>
//                   -
//                 </p>
//                 <p className="number">{product.quantity}</p>
//                 <p className="plus" onClick={() => handleQuantityIncrement(product.id)}>
//                   +
//                 </p>
//               </div>
//             </div>
//             <div className="cart-buttons">
//               <button className="remove" onClick={() => handleRemove(product.id)}>Remove</button>
//               <button className="buy">Buy Now</button>
//             </div>
//           </div>
//         ))}
        
//         <div className="checkout">
//           <div className="checkout-amount">
//             GH&#8373; {totalAmount.toLocaleString()}
//           </div>
//           <Link to='/checkout' className="checkout-button">
//             Checkout
//           </Link>
//         </div>
//       </section>
//       </div>
      
//     </>
//   )
// }

// export default Checkout;