import React, { useState } from 'react';
import '../../../assets/styles/templatesStyles/Ecommerce/Header.scss';
import { useAppSelector } from '../../../store';
import { extractCategories } from './ProductEditUtils';
import { Link } from 'react-router-dom';
import { IoMdArrowRoundForward } from "react-icons/io";


interface HeaderState {
  sendPagesValue: (value: Pages) => void;
}

interface Pages {
  home: string;
  about: string;
  contact: string;
}
  
  const Header: React.FC<HeaderState> = ({ sendPagesValue }) => {
    const project = useAppSelector((state) => state.project);
    const categories = extractCategories(project);
  
    const [ navmap, setNavmap ] = useState({home: "flex", about: "none", contact: "none"});
  
  
    const handleHomeClick = () => {
      setNavmap({home: "flex", about: "none", contact: "none"})
      sendPagesValue({home: "flex", about: "none", contact: "none"})
    }
  
    const handleAboutClick = () => {
      setNavmap({home: "none", about: "flex", contact: "none"})
      sendPagesValue({home: "none", about: "flex", contact: "none"})
    }
  
    const handleContactClick = () => {
      setNavmap({home: "none", about: "none", contact: "flex"})
      sendPagesValue({home: "none", about: "none", contact: "flex"})
    }
  
    return (
      <>
        <div className="header">
          <ul className="menu">
            <Link to={"."}><li onClick={handleHomeClick} className="menu-item" style={navmap.home === "flex" ? {backgroundColor: "gold", color: "#fff"} : { color: ""}}>Home</li></Link>
            { project.template.aboutUs && <Link to={"."}><li onClick={handleAboutClick} className="menu-item" style={navmap.about === "flex" ? {backgroundColor: "var(--primary-color)", color: "#fff"} : { color: ""}}>About Us</li></Link>}
            { project.template.contactUs && <Link to={"."}><li onClick={handleContactClick} className="menu-item" style={navmap.contact === "flex" ? {backgroundColor: "var(--primary-color)", color: "#fff"} : { color: ""}}>Contact Us</li></Link> }
          </ul>
        </div>
        <div className="header-two">
          { project.products.length ? <h2 className='category-header' style={{display: `${navmap.home}`}}>Categories <IoMdArrowRoundForward /></h2>: ""}
          <ul className="menu">
            {
              project.products.length !== 0 ?
                  categories.map(category => (
                    <a href={`#${category}`}><li style={{display: `${navmap.home}`}} key={category} className="menu-item">{category} </li></a>
                  ))
              : ""
            }
          </ul>
        </div>
      </>
    );
};

export default Header;
