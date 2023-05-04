import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  getProductsList,
  selectAllProducts,
  selectProductStatus,
  selectProductError
} from './productsSlice';
import { ProductCard } from './ProductCard';
import '../../features/products/styles/productsList.scss';

export function ProductsList() {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectAllProducts);
  const productStatus = useAppSelector(selectProductStatus);
  const error = useAppSelector(selectProductError);

  useEffect(() => {
    if (productStatus === 'idle') {
      dispatch(getProductsList());
    }
  }, [productStatus, dispatch]);

  const errorMessage = error && <h3 className='productList-error'>something went wrong: {error.message}</h3>;
  const productCards = products.map(p => {
    return <ProductCard key={p.name} {...p}/>;
  });

  return (
    <div className='productList'>
      {(productStatus === 'loading') ? <h3 className='productList-loader'>Loading...</h3>
          : error ? errorMessage : productCards}
    </div>
  );
}
