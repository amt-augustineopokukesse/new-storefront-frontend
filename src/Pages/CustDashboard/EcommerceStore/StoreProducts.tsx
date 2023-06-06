import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../../store';
import '../../../assets/styles/templatesStyles/Ecommerce/CustomizedMain.scss';
import { Link } from 'react-router-dom';
import { ProductState } from '../../../Redux/Templates/ProjectInitialState';
import AddToCart from '../../../Templates/Ecommerce/Components/AddToCart';

interface GroupedProducts {
  [category: string]: ProductState[];
}

interface SearchState {
  searchValue: string;
}

const StoreProducts: React.FC<SearchState> = (props) => {
  const { searchValue } = props;
  const [search, setSearch] = useState('');

  useEffect(() => {
    setSearch(searchValue);
  }, [searchValue]);


  const project = useAppSelector((state) => state.project);

  // Group products by category
  const groupedProducts: GroupedProducts = project.products.reduce((grouped: GroupedProducts, product: ProductState) => {
    if (!grouped[product.category]) {
      grouped[product.category] = [];
    }
    grouped[product.category].push(product);
    return grouped;
  }, {} as GroupedProducts); 

  function calculateDiscountedPrice(originalPrice: number, discountPercentage: number): number {
    if (originalPrice <= 0 || discountPercentage < 0 || discountPercentage >= 100) {
      throw new Error('Invalid input. The original price and discount percentage should be positive numbers.');
    }
    const discountAmount = (originalPrice * discountPercentage) / 100;
    const discountedPrice = originalPrice - discountAmount;
  
    return discountedPrice;
  }

  return (
    <section className="main-container">
      <div className="main-content">
        <h2 className="content-header">Available Products</h2>

        {/* Display products by categories */}
        {Object.entries(groupedProducts).map(([category, products]) => (
          <div key={category} className='customised-section'>
            <div className="section">
              <h2 className="section-name">{category}</h2>
              <p className="more">more...</p>
            </div>
            <div className="section-items">
              {products.filter((item) => item.productName.toLowerCase().includes(search)).map((product) => (
                <div className="tile">
                  {product.discount && product.discount > 0 && <span className='discount-hover'>-{product.discount}&#37;</span>}
                  <Link to={`/product/${product.id}`} key={product.id} className='link'>
                    <div className="image">
                      <img src={product.image} alt="" className="item-image" />
                    </div>
                    <p>{product.productName}</p>
                    <div className="price">
                      {project.currency} {calculateDiscountedPrice(product.price, product.discount as number).toLocaleString()}
                    </div>
                      {
                        product.discount && product.discount > 0 ?
                        <span className='strike-through'><s>{project.currency} {(product.price).toLocaleString()}</s> </span>
                        : ""
                      }
                    <div className="available">
                      <p className="number-available">{product.initialStock} Available</p>
                    </div>
                  </Link>
                  <AddToCart product={product}/>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StoreProducts;
