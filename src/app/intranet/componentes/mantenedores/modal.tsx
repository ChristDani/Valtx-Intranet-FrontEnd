import React, { useState } from 'react';
import Modal from 'react-modal';

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: '999',
    backgroundColor: 'rgba(0, 0, 0, 0.5)' // Cambia el valor de opacidad según sea necesario
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: 'none',
    background: 'none'
  },
};

const ModalComponent = ({ isOpen, closeModal, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      ariaHideApp={false}
      style={customStyles}
      contentLabel="Example Modal"
    >
      {children}
    </Modal>
  );
};

export default ModalComponent;