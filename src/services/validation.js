// export const validateProduct = (product) => {
//     console.log("inside validateProduct")
//     let isDisplayPopup = false;
//     let { name, quantity, unitPrice, tax } = product;
  
//     if (!name || name === "missing") {
//         product.name = null;
//         isDisplayPopup = true;
//     //   product.name = prompt(promptText + "Enter the name: ");
//     }
//     if (quantity === undefined || quantity === -1) {
//         product.quantity = null;
//         isDisplayPopup = true;
//     //   product.quantity = parseInt(prompt(promptText + "Enter the quantity: "), 10);
//     }
//     if (unitPrice === undefined || unitPrice === -1) {
//         product.unitPrice = null;
//         isDisplayPopup = true;
//     //   product.unitPrice = parseFloat(prompt(promptText +  "Enter the unit price: "));
//     }
//     if (tax === undefined || tax === -1) {
//         product.tax = null;
//         isDisplayPopup = true;
//     //   product.tax = parseFloat(prompt(promptText + "Enter the tax: "));
//     }
    
//     console.log("product, isDisplayPopup", product, isDisplayPopup);
//     return { validatedProduct: product, isDisplayPopup };
//   };
  
//   export const validateCustomer = (customer) => {
//     console.log("inside validateCustomer")
//     let isDisplayPopup = false;
//     let { customerName, phoneNumber, totalPurchaseAmount } = customer;
  
//     if (!customerName || customerName === "missing") {
//         customer.customerName = null;
//         isDisplayPopup = true;
//     //   customer.customerName = prompt(promptText + "Enter the customer name: ");
//     }
//     if (!phoneNumber || phoneNumber === "missing") {
//         customer.phoneNumber = null;
//         isDisplayPopup = true;
//     //   customer.phoneNumber = prompt(promptText + "Enter the phone number: ");
//     }
//     if (totalPurchaseAmount === undefined || totalPurchaseAmount === -1) {
//         customer.totalPurchaseAmount = null;
//         isDisplayPopup = true;
//     //   customer.totalPurchaseAmount = parseFloat(prompt(promptText + "Enter the total purchase amount: "));
//     }
//     console.log("customer, isDisplayPopup", customer, isDisplayPopup);
//     return { validatedCustomer: customer, isDisplayPopup };
//   };
  
//   export const validateInvoice = (invoice) => {
//     console.log("inside validateInvoice")
//     let isDisplayPopup = false;
//     let { serialNumber, customerName, productName, quantity, price, tax, totalPrice, date } = invoice;
  
//     if (!serialNumber || serialNumber === "missing") {
//         isDisplayPopup = true;
//     //   invoice.serialNumber = prompt(promptText + "Enter the serial number: ");
//     }
//     if (!customerName || customerName === "missing") {
//         invoice.customerName = null;
//         isDisplayPopup = true;
//     //   invoice.customerName = prompt(promptText + "Enter the customer name: ");
//     }
//     if (!productName || productName === "missing") {
//         invoice.productName = null;
//         isDisplayPopup = true;
//     //   invoice.productName = prompt(promptText + "Enter the product name: ");
//     }
//     if (quantity === undefined || quantity === -1) {
//         invoice.quantity = null;
//         isDisplayPopup = true;
//     //   invoice.quantity = parseInt(prompt(promptText + "Enter the quantity: "), 10);
//     }
//     if (price === undefined || price === -1) {
//         invoice.price = null;
//         isDisplayPopup = true;
//     //   invoice.price = parseFloat(prompt(promptText + "Enter the price: "));
//     }
//     if (tax === undefined || tax === -1) {
//         invoice.tax = null;
//         isDisplayPopup = true;
//     //   invoice.tax = parseFloat(prompt(promptText + "Enter the tax: "));
//     }
//     if (totalPrice === undefined || totalPrice === -1) {
//         invoice.totalPrice = null;
//       invoice.totalPrice = (1 + invoice.tax * 0.01) * invoice.quantity * invoice.price;
//     };

//     if (!date || date === "missing") {
//         invoice.date = null;
//         isDisplayPopup = true;
//     //   invoice.date = prompt(promptText + "Enter the date (YYYY/DD/MM): ");
//     //   invoice.date = new Date(invoice.date); 
//     }
//     console.log("invoice, isDisplayPopup", invoice, isDisplayPopup);
//     return { validatedInvoice: invoice, isDisplayPopup };
//   };


export const validateProduct = (product) => {
    console.log("inside validateProduct");
    let { name, quantity, unitPrice, tax } = product;
  
    if (!name || name === "missing") {
      product.name = "Default Product Name";
    }
    if (quantity === undefined || quantity === -1) {
      product.quantity = 1; // Default quantity
    }
    if (unitPrice === undefined || unitPrice === -1) {
      product.unitPrice = 10.0; // Default unit price
    }
    if (tax === undefined || tax === -1) {
      product.tax = 5.0; // Default tax percentage
    }
  
    console.log("product, isDisplayPopup", product, false);
    return { validatedProduct: product, isDisplayPopup: false };
  };
  
  export const validateCustomer = (customer) => {
    console.log("inside validateCustomer");
    let { customerName, phoneNumber, totalPurchaseAmount } = customer;
  
    if (!customerName || customerName === "missing") {
      customer.customerName = "Default Customer";
    }
    if (!phoneNumber || phoneNumber === "missing") {
      customer.phoneNumber = "0000000000"; // Default phone number
    }
    if (totalPurchaseAmount === undefined || totalPurchaseAmount === -1) {
      customer.totalPurchaseAmount = 100.0; // Default purchase amount
    }
  
    console.log("customer, isDisplayPopup", customer, false);
    return { validatedCustomer: customer, isDisplayPopup: false };
  };
  
  export const validateInvoice = (invoice) => {
    console.log("inside validateInvoice");
    let { serialNumber, customerName, productName, quantity, price, tax, totalPrice, date } = invoice;
  
    if (!serialNumber || serialNumber === "missing") {
      invoice.serialNumber = "SN0001"; // Default serial number
    }
    if (!customerName || customerName === "missing") {
      invoice.customerName = "Default Customer";
    }
    if (!productName || productName === "missing") {
      invoice.productName = "Default Product";
    }
    if (quantity === undefined || quantity === -1) {
      invoice.quantity = 1; // Default quantity
    }
    if (price === undefined || price === -1) {
      invoice.price = 10.0; // Default price
    }
    if (tax === undefined || tax === -1) {
      invoice.tax = 5.0; // Default tax percentage
    }
    if (totalPrice === undefined || totalPrice === -1) {
      invoice.totalPrice = (1 + invoice.tax * 0.01) * invoice.quantity * invoice.price;
    }
    if (!date || date === "missing") {
      invoice.date = new Date().toISOString().split("T")[0]; // Default to today's date
    }
  
    console.log("invoice, isDisplayPopup", invoice, false);
    return { validatedInvoice: invoice, isDisplayPopup: false };
  };
  