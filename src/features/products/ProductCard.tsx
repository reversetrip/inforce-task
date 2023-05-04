import React, { useState } from 'react';
import { Product } from '../../app/types';
import { useAppDispatch } from '../../app/hooks';
import { removeProduct, selectProduct } from './productsSlice';
import { Modal } from '../../components/Modal';
import './styles/productCard.scss';

export function ProductCard({ id, imageUrl, name }: Product) {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();

  return (
    <div className='card'>
      <div className='card-image'>
        <img
          src={imageUrl}
          alt='laptop'
          width='300px'
          height='auto'
        />
      </div>
      <span>{name}</span>
      <div className='card-buttons'>
        <button className='card-viewBtn' onClick={() => dispatch(selectProduct(id))}>
          view
        </button>
        <button className='card-removeBtn' onClick={() => setShowModal(true)}>
          remove
        </button>
      </div>
      <Modal
        show={showModal}
        title='Product removal'
        errorMessage={false}
        onConfirm={() => dispatch(removeProduct(id))}
        onCancel={() => setShowModal(false)}
      >
        <p>Are you sure you want to remove the product?</p>
      </Modal>
    </div>
  );
}
