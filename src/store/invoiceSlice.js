import { createSlice } from '@reduxjs/toolkit';

const initialInvoiceState = {
  getById: {}, // Stores all invoices by ID
  allIds: [], // Tracks the list of all invoice IDs
  nextId: 1, // Auto-increment ID for new invoices
  productMap: {}, // Maps product IDs to invoice IDs
  customerMap: {}, // Maps customer IDs to invoice IDs
};

const invoicesSlice = createSlice({
  name: 'invoices',
  initialState: initialInvoiceState,
  reducers: {
    addInvoice: (state, action) => {
      const {
        serialNumber,
        customerName,
        productName,
        quantity,
        price,
        tax,
        totalPrice,
        date,
        customerId,
        productId,
      } = action.payload;

      const id = state.nextId;

      // Create the new invoice
      state.getById[id] = {
        id,
        serialNumber,
        customerName,
        productName,
        quantity,
        price,
        tax,
        totalPrice,
        date,
        customerId,
        productId,
      };

      // Add the new invoice ID to the list of all IDs
      state.allIds.push(id);

      // Increment the nextId counter
      state.nextId += 1;

      // Update the customer-invoice relationship map
      if (!state.customerMap[customerId]) {
        state.customerMap[customerId] = [];
      }
      state.customerMap[customerId].push(id);

      // Update the product-invoice relationship map
      if (!state.productMap[productId]) {
        state.productMap[productId] = [];
      }
      state.productMap[productId].push(id);
    },

    updateInvoiceCustomerName: (state, action) => {
      const { id, customerName } = action.payload;

      // Update all invoices associated with the customer
      if (state.customerMap[id]) {
        state.customerMap[id].forEach((invoiceId) => {
          if (state.getById[invoiceId]) {
            state.getById[invoiceId].customerName = customerName;
          }
        });
      }
    },

    updateInvoiceProductDetails: (state, action) => {
      console.log("payloadAction:", action.payload)
      const { productId, name, unitPrice, tax } = action.payload;

      // Update all invoices associated with the product
      if (state.productMap[productId]) {
        state.productMap[productId].forEach((invoiceId) => {
          if (state.getById[invoiceId]) {
            const invoice = state.getById[invoiceId];
            invoice.productName = name;
            invoice.price = unitPrice;
            invoice.tax = tax;
            invoice.totalPrice = (unitPrice + tax) * invoice.quantity;
          }
        });
      }
    },

    updateInvoice: (state, action) => {
      const { id, updates } = action.payload;

      if (!state.getById[id]) {
        console.warn(`Invoice with ID ${id} does not exist.`);
        return;
      }

      const invoice = state.getById[id];

      // Apply updates to the invoice
      Object.keys(updates).forEach((key) => {
        if (invoice.hasOwnProperty(key)) {
          invoice[key] = updates[key];
        }
      });

      // Recalculate totalPrice if quantity, price, or tax was updated
      if (updates.quantity || updates.price || updates.tax) {
        invoice.totalPrice = (invoice.price + invoice.tax) * invoice.quantity;
      }
    },
  },
});

export const {
  addInvoice,
  updateInvoiceCustomerName,
  updateInvoiceProductDetails,
  updateInvoice,
} = invoicesSlice.actions;

export default invoicesSlice.reducer;
