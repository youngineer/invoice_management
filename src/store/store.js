// import { configureStore } from '@reduxjs/toolkit';
// import customerReducer from './customerSlice';
// import productReducer from './productSlice';
// import invoiceReducer from './invoiceSlice';
// import apiKeyReducer from './apiKeySlice';

// export const store = configureStore({
//   reducer: {
//     customers: customersSlice.reducer,
//     products: productsSlice.reducer,
//     invoices: invoicesSlice.reducer,
//   },
// });

// export default store;

// import { configureStore } from "@reduxjs/toolkit";
// import appReducer from "./appSlice"; // Replace with the actual path to your reducer file

// const store = configureStore({
//   reducer: {
//     app: appReducer,
//     apiKey: apiKeyReducer
//   },
// });

// export default store;

import { configureStore } from '@reduxjs/toolkit';
import invoicesReducer from './invoiceSlice';
import productsReducer from './productSlice';
import customersReducer from './customerSlice';
import apiKeyReducer from './apiKeySlice';

export const store = configureStore({
  reducer: {
    invoices: invoicesReducer,
    products: productsReducer,
    customers: customersReducer,
    apiKey: apiKeyReducer
  }
});

