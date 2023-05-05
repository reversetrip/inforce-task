import { useAppSelector } from '../hooks';
import { selectCurrentProduct } from '../../features/products/productsSlice';
import { ControlPanel } from '../../features/products/ControlPanel';
import { ProductsList } from '../../features/products/ProductsList';
import { ProductPage } from '../../features/products/ProductPage';
import './styles/main.scss';

export function Main() {
  const product = useAppSelector(selectCurrentProduct);

  return (
    <main className='main'>
      {
        product ? <ProductPage {...product} />
          : <>
              <ControlPanel />
              <ProductsList />
            </>
      }
    </main> 
  );
}
