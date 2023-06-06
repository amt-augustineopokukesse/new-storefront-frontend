import React, { useEffect, useState } from 'react';
import Footer from "../Components/Footer";
import '../../../assets/styles/templatesStyles/Ecommerce/ProductDescription.scss';
import { useAppDispatch, useAppSelector } from '../../../store';
import { applyTemplateCustomizations } from '../Components/ProductEditUtils';
import { setProject } from '../../../Redux/Templates/ProjectSlice';
import { useParams } from 'react-router-dom';
import AddToCart from '../Components/AddToCart';
import { decreaseQuantity, increaseQuantity } from '../../../Redux/Payment/CartSlice';
import { InitialProductState, ProductState } from '../../../Redux/Templates/ProjectInitialState';
import NoSearchNavbar from '../Components/NoSearchNavbar';
import { ProductReviewModal } from '../Components/ProductReviewModal';

const ProductDescription: React.FC = () => {
  const [product, setProduct] = useState<ProductState>(InitialProductState);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useAppDispatch();

  function calculateDiscountedPrice(originalPrice: number, discountPercentage: number): number {
    if (originalPrice <= 0 || discountPercentage < 0 || discountPercentage >= 100) {
      throw new Error('Invalid input. The original price and discount percentage should be positive numbers.');
    }
    const discountAmount = (originalPrice * discountPercentage) / 100;
    const discountedPrice = originalPrice - discountAmount;
  
    return discountedPrice;
  }

  

  useEffect(() => {
    const storedProject = localStorage.getItem('project');
    if (storedProject) {
      const savedProject = JSON.parse(storedProject);
      dispatch(setProject(savedProject));
    }
  }, [dispatch]);

  const project = useAppSelector((state) => state.project);
  const products = useAppSelector((state) => state.cart.products);

  useEffect(() => {
    applyTemplateCustomizations(project);
  }, [project]);

  const { id } = useParams<{ id: string }>();
  const [storeProduct] = products.filter(item => item.id === id);
  const [projectProduct] = project.products.filter(item => item.id === id);

  useEffect(() => {
    if(storeProduct){
      setProduct(storeProduct)
    } else {
      setProduct(projectProduct);
    }
  });
  
  const handleQuantityIncrement = () => {
    dispatch(increaseQuantity(product.id || ''));
  };

  const handleQuantityDecrement = () => {
    dispatch(decreaseQuantity(product.id || ''));
  };
  const handleOpen = () => {
    setOpenModal(!openModal);
  }



  return (
    <>
      <NoSearchNavbar />
      {product ? (
        <section className="container">
          <div className="product">
            <div className='product-image'>
              <img src={product.image} />
            </div>
            <div className="product-specs">
              <h2 className="product-name">{product.productName}</h2>
              <div className='rating'>
                {/* <Rating /> */}
                <p className='rating-text'>{product.initialStock} Available</p>
                <p className='rating-text'>Seller: James cottage</p>
              </div>
              <div className="price">
                  {project.currency} {
                    product.discount && product.discount > 0 
                    ? calculateDiscountedPrice(product.price , product.discount) * 
                    (product.quantity ? product.quantity : 0)
                    : (product.price * (product.quantity ? product.quantity : 0)).toLocaleString()
                  }
              </div>
              
              <div className='number-selector'>
                <p className="minus" onClick={handleQuantityDecrement}>-</p>
                <p className='number'>{product.quantity}</p>
                <p className="plus" onClick={handleQuantityIncrement}>+</p>
              </div>
              <div className="buttons">
                <button className="buy">Buy Now</button>
                <AddToCart product={product}/>
              </div>
            </div>
          </div>
          <div className="details-container">
            <h2 className="details-header">Product Details</h2>
            <ul className='details-text'>
              <li>{product.description}</li>
              <button onClick={handleOpen}>leave a review</button>
              <ProductReviewModal openModal={openModal} setOpenModal={setOpenModal}/>
            </ul>
          </div>
        </section>): "" }
      <Footer />
    </>
  );
};

export default ProductDescription;
