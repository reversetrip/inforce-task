import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Product } from '../../app/types';

interface ProductsState {
  products: Product[];
  selectedProduct: Product | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: any;
}

const initialState: ProductsState = {
  products: [],
  selectedProduct: null,
  status: 'idle',
  error: null
};

export const getProductsList = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await fetch('http://localhost:3001/products');
    const products = await response.json();
    return products;
  }
);

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    removeProduct: (state, action: PayloadAction<number | string>) => {
      state.products = state.products.filter(p => p.id !== action.payload);
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    selectProduct: (state, action: PayloadAction<number | string>) => {
      state.selectedProduct = state.products.find(p => p.id === action.payload) || null;
    },
    sortProductsList: (state, action: PayloadAction<string>) => {
      switch (action.payload) {
        case 'alphabetically':
          state.products = state.products.sort(sortAlphabetically);
          break;
        case 'by quantity':
          state.products = state.products.sort(sortByQuantity);
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductsList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getProductsList.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = 'succeeded';
        state.products = action.payload.sort(sortAlphabetically);
      })
      .addCase(getProductsList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      });
  },
});

export const {
  addProduct,
  removeProduct,
  updateProduct,
  selectProduct,
  sortProductsList
} = productsSlice.actions;

export const selectAllProducts = (state: RootState) => state.products.products;
export const selectCurrentProduct = (state: RootState) => state.products.selectedProduct;
export const selectProductStatus = (state: RootState) => state.products.status;
export const selectProductError = (state: RootState) => state.products.error;

export default productsSlice.reducer;

function sortAlphabetically(p1: Product, p2: Product) {
  if (p1.name.toLowerCase() > p2.name.toLowerCase()) return 1;
  if (p1.name.toLowerCase() < p2.name.toLowerCase()) return -1;
  return 0;
}

function sortByQuantity(p1: Product, p2: Product) {
  if (+p1.count < +p2.count) return 1;
  if (+p1.count > +p2.count) return -1;
  return 0
}
