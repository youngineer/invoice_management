import { createSlice } from '@reduxjs/toolkit';
import { updateInvoiceProductDetails } from './invoiceSlice';

const initialProductState = {
  getById: {},
  allIds: [],
  nextId: 1,
};

const productsSlice = createSlice({
  name: 'products',
  initialState: initialProductState,
  reducers: {
    addProduct: (state, action) => {
      const { name, quantity, unitPrice, tax } = action.payload;
      const id = state.nextId;
      const priceWithTax = (unitPrice + tax) * quantity;

      state.getById[id] = { id, name, quantity, unitPrice, tax, priceWithTax };
      state.allIds.push(id);
      state.nextId += 1;
    },
    updateProduct: (state, action) => {
      const { id, name, quantity, unitPrice, tax } = action.payload;
      if (state.getById[id]) {
        const priceWithTax = (unitPrice + tax) * quantity;
        state.getById[id] = { id, name, quantity, unitPrice, tax, priceWithTax };
      }
    },
  },
});

// Thunk to update product and invoices
export const updateProductWithInvoices = (productData) => (dispatch) => {
  dispatch(productsSlice.actions.updateProduct(productData));
  dispatch(updateInvoiceProductDetails(productData)); // Trigger invoice update
};

export const { addProduct, updateProduct } = productsSlice.actions;
export default productsSlice.reducer;
