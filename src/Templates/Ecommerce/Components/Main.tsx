import { women, men, kids } from "../../../staticDB/ecommerceImagesDB";
import '../../../assets/styles/templatesStyles/Ecommerce/Main.scss';
import Rating from '../../../Templates/Ecommerce/Components/Rating';
//import AddToCart from "./AddToCart";

const Main: React.FC = () => {
  return (
    <section className="main-container">
      <div className="main-content">
        <h2 className="content-header">Today's Deals</h2>

        {/* Women section */}
        <div className="section">
          <h2 className="section-name">Women</h2>
          <p className="more">more...</p>
        </div>
        <div className="section-items">
          {women.map((item) => (
            <div className="tile" key={item}>
              <div className="image">
                <img src={item} alt="" />
              </div>
              <div className="price">
                GH&#8373; 1,093.00
              </div>
              <Rating />
              <div className="available">
                <p className="number-available">2 Available</p>
                <button className="addToCart">Add To Cart</button>
              </div>
            </div>
          ))}
        </div>

        {/* Men section */}
        <div className="section">
          <h2 className="section-name">Men</h2>
          <p className="more">more...</p>
        </div>
        <div className="section-items">
          {men.map((item) => (
            <div className="tile" key={item}>
              <div className="image">
                <img src={item} alt="" />
              </div>
              <div className="price">
                GH&#8373; 1,093.00
              </div>
              <Rating />
              <div className="available">
                <p className="number-available">2 Available</p>
                <button className="addToCart">Add To Cart</button>
              </div>
            </div>
          ))}
        </div>

        {/* Kids section*/}
        <div className="section">
          <h2 className="section-name">Kids</h2>
          <p className="more">more...</p>
        </div>
        <div className="section-items">
          {kids.map((item) => (
            <div className="tile" key={item}>
              <div className="image">
                <img src={item} alt="" />
              </div>
              <div className="price">
                GH&#8373; 1,093.00
              </div>
              <Rating />
              <div className="available">
                <p className="number-available">2 Available</p>
                <button className="addToCart">Add To Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Main;
