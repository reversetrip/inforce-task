import { useAppSelector } from "../hooks";
import { selectCurrentProduct } from "../../features/products/productsSlice";
import { ControlPanel } from "../../features/products/ControlPanel";
import { ProductPage } from "../../features/products/ProductPage";
import { ProductsList } from "../../features/products/ProductsList";
import './styles/main.scss';

export function Main() {
  const product = useAppSelector(selectCurrentProduct);

  return (
    <main className='app-main'>
      {
        product ? <ProductPage {...product} />
          : <><ControlPanel /><ProductsList /></>
      }
    </main> 
  );
}
