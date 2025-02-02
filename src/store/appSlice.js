import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  customers: {
    byId: {},
    allIds: [],
  },
  products: {
    byId: {},
    allIds: [],
  },
  invoices: {
    byId: {},
    allIds: [],
  },
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    addCustomer: (state, action) => {
      const { id, customerName, phoneNumber, totalPurchaseAmount } = action.payload;
      state.customers.byId[id] = { id, customerName, phoneNumber, totalPurchaseAmount };
      state.customers.allIds.push(id);
    },
    updateCustomer: (state, action) => {
      const { id, ...updates } = action.payload;
      if (state.customers.byId[id]) {
        state.customers.byId[id] = { ...state.customers.byId[id], ...updates };
      }
    },

    // Products
    addProduct: (state, action) => {
      const { id, name, quantity, unitPrice, tax } = action.payload;
      state.products.byId[id] = { id, name, quantity, unitPrice, tax };
      state.products.allIds.push(id);
    },
    updateProduct: (state, action) => {
      const { id, ...updates } = action.payload;
      if (state.products.byId[id]) {
        state.products.byId[id] = { ...state.products.byId[id], ...updates };
      }
    },

    // Invoices
    addInvoice: (state, action) => {
      const { id, serialNumber, customerId, productId, quantity, totalPrice, date } = action.payload;
      state.invoices.byId[id] = { id, serialNumber, customerId, productId, quantity, totalPrice, date };
      state.invoices.allIds.push(id);
    },
    updateInvoice: (state, action) => {
      const { id, ...updates } = action.payload;
      if (state.invoices.byId[id]) {
        state.invoices.byId[id] = { ...state.invoices.byId[id], ...updates };
      }
    },
  },
});

export const {
  addCustomer,
  updateCustomer,
  addProduct,
  updateProduct,
  addInvoice,
  updateInvoice,
} = appSlice.actions;

export default appSlice.reducer;