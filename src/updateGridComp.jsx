import Modal from 'react-modal';
import React, { useState } from 'react';

Modal.setAppElement('#root');

const UpdateGridComponent = ({ onClose }) => {
  const [modalIsOpen, setModalOpen] = useState(true);

  const closeModal = () => {
    setModalOpen(false);
    onClose(); // Call the onClose function passed as a prop
  };

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel='Update Modal'
      >
        <div>
          <br />This is where update data will be displayed<br />
          <button
            type='button'
            className='text-2xl font-bold bg-slate-400 rounded-3xl p-2'
            onClick={closeModal}
          >
            X
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default UpdateGridComponent;
