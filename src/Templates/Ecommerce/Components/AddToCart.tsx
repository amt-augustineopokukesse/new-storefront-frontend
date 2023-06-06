import React from 'react';
import '../../../assets/styles/templatesStyles/Ecommerce/AddToCart.scss';
import { useAppDispatch } from '../../../store';
import { addToCart } from '../../../Redux/Payment/CartSlice';
import { ProductState } from '../../../Redux/Templates/ProjectInitialState';
interface AddToCartProps {
  product: ProductState;
}

const AddToCart: React.FC<AddToCartProps> = ({ product }) => {
  const dispatch = useAppDispatch();  

  const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation(); 
    dispatch(addToCart(product)); 
  };

  return (
    <>
      <button className="add-to-cart" onClick={handleAddToCart}>Add to Cart</button>
    </>
  );
};

export default AddToCart;
