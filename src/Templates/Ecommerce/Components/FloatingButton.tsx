import React, { useState } from 'react';
import CustomizationModal from '../../CustomizationModal';
import '../../../assets/styles/templatesStyles/Ecommerce/FloatingButton.scss';

const FloatingButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="floating-button-container">
      <button className="floating-button" onClick={openModal}>
        Customize
      </button>
      {isModalOpen && <CustomizationModal onClose={closeModal} />}
    </div>
  );
};

export default FloatingButton;
