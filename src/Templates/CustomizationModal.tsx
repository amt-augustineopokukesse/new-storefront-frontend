import React from 'react';
import ProjectCustomizationForm from './Ecommerce/Components/ProjectCustomizationForm';
import '../assets/styles/templatesStyles/Ecommerce/CustomizationModal.scss';

const CustomizationModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="customization-modal">
      <div className="customization-modal-content">
        <ProjectCustomizationForm />
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default CustomizationModal;
