import { useState } from 'react';

export const useModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = () => {
    document.body.style.overflow = 'hidden';
    setIsModalVisible(true);
  };

  const closeModal = () => {
    document.body.style.overflow = 'auto';
    setIsModalVisible(false);
  };

  return {
    openModal,
    closeModal,
    isModalVisible,
    setIsModalVisible,
  };
};
