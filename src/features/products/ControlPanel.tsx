import React, { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { addProduct } from "./productsSlice";
import { sortProductsList } from './productsSlice';
import { DropdownMenu } from '../../components/DropdownMenu';
import { Modal } from '../../components/Modal';
import { ProductForm } from './ProductForm';
import { v4 as uuidv4 } from 'uuid';
import './styles/controlPanel.scss';

const initialParams = {
  imageUrl: '',
  name: '',
  count: '',
  width: '',
  height: '',
  weight: ''
};

export function ControlPanel() {
  const [showModal, setShowModal] = useState(false);
  const [fieldError, setFieldError] = useState(false);
  const [productParams, setProductParams] = useState(initialParams);
  const dispatch = useAppDispatch();

  function handleFormInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    let { name, value } = e.target;

    // checking for numbers only (for numeric fields)
    switch (name) {
      case 'count':
      case 'width':
      case 'height':
        if (!isNaN(+value.trim())) {
          value = value.trim();
        } else return;
    }

    setProductParams({
      ...productParams,
      [name]: value
    });
  }

  const isParamsEmpty = () => Object.values(productParams).some(f => f.trim() === '');

  function confirmAddingProduct() {
    if (isParamsEmpty()) {
      setFieldError(true);
      return;
    }

    const p = productParams;
    const newItem = {
      id: uuidv4(),
      imageUrl: p.imageUrl.trim(),
      name: p.name.trim(),
      count: +p.count,
      size: {
        width: +p.width,
        height: +p.height
      },
      weight: p.weight.trim(),
      comments: []
    };

    dispatch(addProduct(newItem));
    dispatch(sortProductsList('alphabetically'))
    setShowModal(false);
    setProductParams(initialParams);
  }

  function cancelAddingProduct() {
    setShowModal(false);
    setFieldError(false);
    setProductParams(initialParams);
  }

  return (
    <div className='controlPanel'>
      <span>Sort products:</span>
      <DropdownMenu
        modes={['alphabetically', 'by quantity']}
        onMenuOption={(mode) => dispatch(sortProductsList(mode))}
      />
      <button className='controlPanel-addBtn' onClick={() => setShowModal(true)}>
        add product
      </button>
      <Modal
        show={showModal}
        title='Setting new product details'
        errorMessage={fieldError}
        onConfirm={confirmAddingProduct}
        onCancel={cancelAddingProduct}
      >
        <ProductForm params={productParams} handler={handleFormInputChange} />
      </Modal>
    </div>
  );
}
