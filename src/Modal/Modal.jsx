import PropTypes from 'prop-types';
import './modal.css';

const Modal = ({ id, header, body, footer, toggleModal, isClosing }) => {
  return (
    <>
      <div
        id={id || 'modal'}
        className='modal-wrapper'
        aria-labelledby={id ? id : 'modal-header'}
        role='dialog'
        aria-modal='true'
      >
        <div className={`modal-content ${isClosing ? 'is-closing' : ''}`}>
          <div
            id={header || 'modal-header'}
            className='modal-header'
          >
            <h1>{header ? header : 'This is a Modal'}</h1>
            <button
              className='close-modal-icon'
              onClick={toggleModal}
            >
              &times;
            </button>
          </div>
          <div
            id={body || 'modal-body'}
            className='modal-body'
          >
            {body ? body : <p>This is the body of the modal</p>}
          </div>
          <div
            id={footer || 'modal-footer'}
            className='modal-footer'
          >
            {footer ? footer : 'this is the footer of the modal'}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;

Modal.propTypes = {
  id: PropTypes.string,
  header: PropTypes.node,
  body: PropTypes.node,
  footer: PropTypes.node,
  toggleModal: PropTypes.func.isRequired,
  isClosing: PropTypes.bool,
};
