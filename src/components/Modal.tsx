import React, { useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import './styles/modal.scss';

type ModalProps = {
  show: boolean;
  title: string;
  errorMessage: boolean;
  children: JSX.Element;
  onConfirm: () => void;
  onCancel: () => void;
};

export function Modal({
  show,
  title,
  errorMessage,
  children,
  onConfirm,
  onCancel
}: ModalProps) {
  const nodeRef = useRef(null);

  const closeOnEscapeKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onCancel();
    }
  }, [onCancel]);

  useEffect(() => {
    document.body.addEventListener('keydown', closeOnEscapeKey);
    return function cleanup() {
      document.body.removeEventListener('keydown', closeOnEscapeKey);
    }
  }, [closeOnEscapeKey]);

  return createPortal(
    <CSSTransition
      in={show}
      unmountOnExit
      timeout={{ enter: 0, exit: 300 }}
      nodeRef={nodeRef}
    >
      <div ref={nodeRef} className='modal' onClick={onCancel}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3 className="modal-title">
              {title}
            </h3>
          </div>
          <div className="modal-body">
            {children}
            {errorMessage && <p className='modal-body-error'>You cannot add a product with an empty field</p>}
          </div>
          <div className="modal-footer">
            <button onClick={onConfirm} className='modal-footer-confirm'>
              Confirm
            </button>
            <button onClick={onCancel} className="modal-footer-cancel">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </CSSTransition>,
    document.getElementById('root') as Element);
}
