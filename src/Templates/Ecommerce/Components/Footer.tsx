import React, { useState } from 'react';
import '../../../assets/styles/templatesStyles/Ecommerce/Footer.scss';
import { useAppSelector } from '../../../store';
import TemplateData from '../../../staticDB/FinanceData';
import { GrFacebook, GrInstagram, GrTwitter } from "react-icons/gr";
import { BsFillTelephoneForwardFill } from "react-icons/bs";
import { ReviewModal } from '../../Ecommerce/Components/ReviewModal';

const Footer: React.FC = () => {
  const project = useAppSelector((state) => state.project);
  const [openModal, setOpenModal] = useState(false);

  const handleReviewModal = () => {
    setOpenModal(true);
  }
  
  return (
    <div className='ecommerce-footer'>
      <span className='ecommerce-footer-logo'>
          {project.name}
      </span>
      <button className='review-button' onClick={handleReviewModal}>Leave a review</button>
      <ReviewModal openModal={openModal} setOpenModal={setOpenModal}/>
      <div className='ecommerce-footer-text'>
        <p className='location-text'>{project.address && `Locate us:`}</p>
        <div>
          <p>{project.address !== "Add your Address" ? project.address : ""}</p>
          <p>{project.location !== "Add your location" ? project.location : ""}</p>
        </div>
      </div>
      <div className='ecommerce-contact-span'>
        <div className='social-media-span'>
          <a href={project.facebookURL || "https://www.facebook.com"}><GrFacebook className="social-icon" /> </a>
          <a href={project.instagramURL || "https://www.instagram.com"}><GrInstagram className="social-icon"/> </a>
          <a href={project.twitterURL || "https://www.instagram.com"}><GrTwitter className="social-icon"/> </a> 
        </div>
        <p>{TemplateData.footer.p1}</p>
        <a className='telephone' href={project.phoneNumber !== "024 12 345 6789" ? "tel:"+project.phoneNumber : "tel:''"}> <BsFillTelephoneForwardFill className="social-icon"/> {project.phoneNumber !== "024 12 345 6789" ? project.phoneNumber : "Store has no contact"}</a>
      </div>
  </div>
  );
};

export default Footer;
