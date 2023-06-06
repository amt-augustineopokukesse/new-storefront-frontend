import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { carousel } from '../../../staticDB/ecommerceImagesDB';
import '../../../assets/styles/templatesStyles/Ecommerce/Carousel.scss';
import { useAppSelector } from '../../../store';
import { Link } from 'react-router-dom';


const Carousel: React.FC = () => {
    const project = useAppSelector((state) => state.project);

    const items = carousel.map((item)=>{
        return(
            <img
            className='carousel-item'
                src={item}
            />
                    
        )
    });

    const productImages = project.products.map((product) => {
        return (
            <Link to={`/product/${product.id}`} key={product.id} className='link'>
                <div className="carousel-item">
                    <img src={product.image} alt="" className="carousel-item-image" />
                </div>
            </Link>
        )
    });
    // const repeatItems = [];
    // while (repeatItems.length < 4) {
    //     repeatItems.push(...productImages);
    // }

    const responsive ={
        0:{
            items: 2,
        },
        512:{
            items: 4,
        },
        1024:{
            items: 5,
        },
    };

  return <div className='carousel'>
    <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        autoPlay
        items={project.products.length > 0 ? productImages: items}
    />
    </div>
  
}

export default Carousel;