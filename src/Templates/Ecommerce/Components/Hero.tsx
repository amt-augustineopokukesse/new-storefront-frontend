import React from 'react';
import '../../../assets/styles/templatesStyles/Ecommerce/Hero.scss';
import { useAppSelector } from '../../../store';

const Hero: React.FC = () => {
  const project = useAppSelector((state) => state.project);

  const hasDiscountPromotion = project.products.some(
    (product) => Number(product?.discount) ?? 0 > 0
  );

  return (
    <div className="hero" style={{backgroundImage: `url(${project.bannerUrl})`}}>
      {hasDiscountPromotion && (
        <div className='scroll-div'>
          <p className="promotion-message">Discount promotions on selected products!</p>
          <p className="promotion-message">Discount promotions on selected products!</p>
          <p className="promotion-message">Discount promotions on selected products!</p>
        </div>
      )}
      <h1 className="hero-header">
        {project.name}
      </h1>
      <p className="hero-text">
        {project.description}
      </p>
      
      <div className="subscribe">
        <input
          className="subscribe-input"
          placeholder="example@gmail.com"
        />
        <button className="subscribe-button">
          Subscribe
        </button>
        
      </div>
    </div>
  );
};

export default Hero;
