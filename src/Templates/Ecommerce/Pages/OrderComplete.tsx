import React, { useEffect } from 'react';
import '../../../assets/styles/templatesStyles/Ecommerce/Receipt.scss';
import { useAppDispatch, useAppSelector } from '../../../store';
import { applyTemplateCustomizations } from '../Components/ProductEditUtils';
import { setProject } from '../../../Redux/Templates/ProjectSlice';
import { useNavigate } from 'react-router-dom';
import NoSearchNavbar from '../Components/NoSearchNavbar';

const OrderComplete:React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const storedProject = localStorage.getItem('project');
    if (storedProject) {
      const savedProject = JSON.parse(storedProject);
      dispatch(setProject(savedProject));
    }
  }, [dispatch]);

  const project = useAppSelector((state) => state.project);

  useEffect(() => {
    applyTemplateCustomizations(project);
  }, [project]);

 
  const handleDashboardButton = () => {
    navigate('/custdashboard');
  };

  return (
    <>
      <NoSearchNavbar />
      <section className="container">
        <div className="container-header">
            Dear Customer, your order is complete. <br/>
            We are awaiting payment to be begin processing your order.
        </div>
        <p style={{marginTop: 10}}>{project.phoneNumber && `Contact us on ${project.phoneNumber} for any assistance.`}</p>
        <button className='dashboard-button' onClick={handleDashboardButton}>
        Return to Dashboard
        </button>
      </section>
    </>
  );
};

export default OrderComplete;
