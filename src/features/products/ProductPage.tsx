import React, { useState } from 'react';
import { Product } from '../../app/types';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectProduct, updateProduct, sortProductsList } from './productsSlice';
import { addComment, selectAllProductComments } from '../comments/commentsSlice';
import { Modal } from '../../components/Modal';
import { ProductForm } from './ProductForm';
import { SingleComment } from '../comments/SingleComment';
import { v4 as uuidv4 } from 'uuid';
import './styles/productPage.scss';

export function ProductPage({
  id,
  imageUrl,
  name,
  count,
  size: { width, height },
  weight,
}: Product) {
  const [showModal, setShowModal] = useState(false);
  const [fieldError, setFieldError] = useState(false);
  const initialParams = {
    imageUrl: imageUrl,
    name: name,
    count: count.toString(),
    width: width.toString(),
    height: height.toString(),
    weight: weight
  };
  const [params, setParams] = useState(initialParams);
  const [commentField, setCommentField] = useState('');
  const comments = useAppSelector((state) => selectAllProductComments(state, id));
  const dispatch = useAppDispatch();

  const commentsList = comments.map(c => {
    return <SingleComment key={c.id} {...c} />
  });

  function handleFormInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    let { name, value } = e.target;

    switch (name) {
      case 'count':
      case 'width':
      case 'height':
        if (!isNaN(+value.trim())) {
          value = value.trim();
        } else return;
    }

    setParams({
      ...params,
      [name]: value
    });
  }

  const isParamsEmpty = () => Object.values(params).some(f => f.trim() === '');

  function confirmUpdatingProduct() {
    if (isParamsEmpty()) {
      setFieldError(true);
      return;
    }

    const updatedItem = {
      id: id,
      imageUrl: params.imageUrl.trim(),
      name: params.name.trim(),
      count: +params.count,
      size: {
        width: +params.width,
        height: +params.height
      },
      weight: params.weight.trim(),
      comments: [...comments]
    };

    dispatch(updateProduct(updatedItem));
    dispatch(sortProductsList('alphabetically'));
    dispatch(selectProduct(id));
    setShowModal(false);
    setFieldError(false);
  }

  function cancelUpdatingProduct() {
    setShowModal(false);
    setFieldError(false);
    setParams(initialParams);
  }

  function handleAddComment() {
    if (commentField.trim() === '') return;

    const newComment = {
      id: uuidv4(),
      productId: id,
      description: commentField.trim(),
      date: getCurrentDate()
    };

    dispatch(addComment(newComment));
    setCommentField('');
  }

  return (
    <div className='productPage'>
      <div className='productPage__main'>
        <div className='productPage__main__image'>
          <img src={imageUrl} alt='laptop' width='500px' height='auto' />
        </div>
        <div className='productPage__main__about'>
          <div className='productPage__main__about__params'>
            <h2>{name}</h2>
            <p>In stock: {count} pieces</p>
            <p>Product width: {width}mm</p>
            <p>Product height: {height}mm</p>
            <p>Product weight: {weight}</p>
          </div>
          <div className='productPage__main__about__controls'>
            <button onClick={() => setShowModal(true)}>edite product</button>
            <button onClick={() => dispatch(selectProduct(-1))}>back</button>
            <Modal
              show={showModal}
              title='Updating product details'
              errorMessage={fieldError}
              onConfirm={confirmUpdatingProduct}
              onCancel={cancelUpdatingProduct}
            >
              <ProductForm params={params} handler={handleFormInputChange} />
            </Modal>
          </div>
        </div>
      </div>
      <div className='productPage__comments'>
        <div className='productPage__comments__list'>
          {commentsList}
        </div>
        <div className='productPage__comments__newComment'>
          <textarea
            value={commentField}
            onChange={(e) => setCommentField(e.target.value)}
            placeholder='write your comment'
            rows={5}
          />
          <button onClick={handleAddComment}>add</button>
        </div>
      </div>
    </div >
  );
}

function getCurrentDate() {
  const date = new Date();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();

  return `${hours}:${minutes} ${day}.${month}.${year}`;
}
