import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store';
import { setProject } from '../../../Redux/Templates/ProjectSlice';
import { useLocation } from 'react-router-dom';
import { applyTemplateCustomizations } from '../../../Templates/Ecommerce/Components/ProductEditUtils';
import Navbar from '../../../Templates/Ecommerce/Components/Navbar';
import Header from '../../../Templates/Ecommerce/Components/Header';
import Hero from '../../../Templates/Ecommerce/Components/Hero';
import Carousel from '../../../Templates/Ecommerce/Components/Carousel';
import StoreProducts from './StoreProducts';
import { Facebook, Instagram, Twitter, Location, Phone } from 'grommet-icons';
import Footer from '../../../Templates/Ecommerce/Components/Footer';
import '../../../assets/styles/templatesStyles/Ecommerce/OtherPages.scss';



const StoreHome:React.FC = () => {
  const project = useAppSelector((state) => state.project);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [search, setSearch] = useState("");
  const [ pages, setPages ] = useState({ home: "flex", about: "none", contact: "none"});

  const handleSearchValue = (value: string) => {
    setSearch(String(value).toLowerCase());
  }

  const handlePagesValue = (value: { home: string; about: string, contact: string}) => {
    setPages(value)
  }


  useEffect(() => {
    applyTemplateCustomizations(project);
  }, [project]);

  useEffect(() => {
    if (location && location.state) {
      if (location.state.linkedProject !== null) {
        const incomingProject = location.state.linkedProject;
        localStorage.setItem('project', JSON.stringify(incomingProject))
      }
    }
    const storedProject = localStorage.getItem('project');
    if (storedProject) {
      const savedProject = JSON.parse(storedProject);
      dispatch(setProject(savedProject));
    }
  }, [dispatch]);

  return (
    <div>
        <Navbar sendSearchValue={handleSearchValue} />
        <Header sendPagesValue={handlePagesValue} />
        <div style={{display: `${pages.home}`, flexFlow: "column"}}>
          <Hero />
          {project.template.carouselInclude ? <Carousel /> : ''}
          {project.products.length > 0 ? <StoreProducts searchValue={search} /> : ""}
        </div>
        <div style={{display: `${pages.contact}`}} className='other-pages contact-us' >
          <h1 className='other-header contact-us-header'>Contact Us</h1>
          <div className='other-content'>
            <div className='contact-details'>
              <p> <Location color='plain' /> Walk in to our office at {project.location} {project.address}</p>
              <p> <Phone color='plain' /> Call us on <a style={{color: "gold"}} href={project.phoneNumber !== "024 12 345 6789" ? "tel:"+project.phoneNumber : "tel:''"}>{project.phoneNumber}</a></p>
              <div className='other-pages-socials'>
                <p>See us on Social Media:</p>
                <a target='_blank' href={project.facebookURL || "https://www.facebook.com"}><Facebook size='large' color='plain' /> </a>
                <a target='_blank' href={project.instagramURL || "https://www.instagram.com"}><Instagram size='large' color='plain' /> </a>
                <a target='_blank' href={project.twitterURL || "https://www.twitter.com"}><Twitter size='large' color='plain'/> </a>
              </div>
              <p>Office Hours: 9am to 4:30pm <br /> Monday - Saturday</p>
              <p>Trading Hours: 24hrs | Everyday</p>
            </div>
          </div>
        </div>
        <div style={{display: `${pages.about}`}} className='other-pages about-us' >
          <div>
            <h1 className='other-header'>About Us</h1>
            <h4 className='other-para'>{project.description}</h4>
            <p className='other-para'>{project.template.aboutUs}</p>
          </div>
          
          <div className='other-content'>
            <div className='other-image' style={{backgroundImage: `url(${project.bannerUrl})`}}></div>
          </div>
        </div>
        <Footer />
    </div>
  )
}

export default StoreHome;