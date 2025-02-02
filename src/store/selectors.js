import { createSelector } from 'reselect';

// Base selectors
const getInvoicesState = state => state.invoices;
const getProductsState = state => state.products;
const getCustomersState = state => state.customers;

// Memoized selectors
export const selectAllInvoices = createSelector(
  [getInvoicesState],
  invoices => {
    console.log("Invoices State:", invoices);
    return invoices?.allIds?.map(id => invoices.getById[id]) || [];
  }
);


export const selectAllProducts = createSelector(
  [getProductsState],
  products => products.allIds.map(id => products.getById[id])
);

export const selectAllCustomers = createSelector(
  [getCustomersState],
  customers => customers.allIds.map(id => customers.getById[id])
);

export const selectInvoiceById = createSelector(
  [getInvoicesState, (state, id) => id],
  (invoices, id) => invoices.getById[id]
);

export const selectProductById = createSelector(
  [getProductsState, (state, id) => id],
  (products, id) => products.getById[id]
);

export const selectCustomerById = createSelector(
  [getCustomersState, (state, id) => id],
  (customers, id) => customers.getById[id]
);

export const selectInvoicesByCustomerId = createSelector(
  [getInvoicesState, (state, customerId) => customerId],
  (invoices, customerId) => {
    const invoiceIds = invoices.customerMap[customerId] || [];
    return invoiceIds.map(id => invoices.getById[id]);
  }
);

export const selectInvoicesByProductId = createSelector(
  [getInvoicesState, (state, productId) => productId],
  (invoices, productId) => {
    const invoiceIds = invoices.productMap[productId] || [];
    return invoiceIds.map(id => invoices.getById[id]);
  }
);

export const selectCustomerWithInvoices = createSelector(
  [selectCustomerById, selectInvoicesByCustomerId],
  (customer, invoices) => ({
    ...customer,
    invoices
  })
);

export const selectProductWithInvoices = createSelector(
  [selectProductById, selectInvoicesByProductId],
  (product, invoices) => ({
    ...product,
    invoices
  })
);