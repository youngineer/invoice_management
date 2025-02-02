import { createSlice } from '@reduxjs/toolkit';
import { updateInvoiceCustomerName } from './invoiceSlice';

const initialCustomerState = {
  getById: {},
  allIds: [],
  nextId: 1,
};

const customersSlice = createSlice({
  name: 'customers',
  initialState: initialCustomerState,
  reducers: {
    addCustomer: (state, action) => {
      const { customerName, phoneNumber, totalPurchaseAmount } = action.payload;
      const id = state.nextId;
      state.getById[id] = { id, customerName, phoneNumber, totalPurchaseAmount };
      state.allIds.push(id);
      state.nextId += 1;
    },
    updateCustomer: (state, action) => {
      const { id, ...updates } = action.payload;
      if (state.getById[id]) {
        state.getById[id] = { ...state.getById[id], ...updates };
      }
    },
  },
});

// Thunk to update customer and invoices
export const updateCustomerWithInvoices = (customerData) => (dispatch) => {
  dispatch(customersSlice.actions.updateCustomer(customerData));
  dispatch(updateInvoiceCustomerName(customerData)); // Trigger invoice update
};

export const { addCustomer, updateCustomer } = customersSlice.actions;
export default customersSlice.reducer;
