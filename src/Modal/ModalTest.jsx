import { useEffect, useState } from 'react';
import Modal from './Modal';

const Modaltest = () => {
  const [showModal, setShowModal] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleToggleModal = () => {
    if (showModal) {
      setIsClosing(true);
      setTimeout(() => {
        setShowModal(false);
        setIsClosing(false);
      }, 300);
    } else {
      setShowModal(true);
    }
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setShowModal(false);
      }
    };

    if (showModal) {
      window.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [showModal]);

  return (
    <>
      <div className='wrapper'>
        <button onClick={handleToggleModal}>Show Modal</button>
        {showModal && (
          <Modal
            id='custom-modal-id'
            header={<p>This is a custom Modal</p>}
            body={<p>This is a custom body of the modal</p>}
            footer={<p>this is the footer of the modal</p>}
            toggleModal={handleToggleModal}
            isClosing={isClosing}
          />
        )}
      </div>
    </>
  );
};

export default Modaltest;
