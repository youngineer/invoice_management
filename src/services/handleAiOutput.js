export const handleAiResponse = (text) => {
  console.log("Inside handleAiResponse");
  try {
    // Find the first `{` and the last `}` to locate the JSON segment
    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}") + 1;

    if (jsonStart === -1 || jsonEnd === -1) {
      console.warn("No valid JSON structure found.");
      return {};
    }

    // Extract the JSON string
    let jsonString = text.slice(jsonStart, jsonEnd);

    // Clean the JSON string
    jsonString = jsonString
      .replace(/\/\/.*/g, "") // Remove single-line comments
      .replace(/\/\*[\s\S]*?\*\//g, "") // Remove multi-line comments
      .replace(/,(\s*[}\]])/g, "$1") // Remove trailing commas
      .trim();

    // Ensure the string starts with '{' and ends with '}'
    if (!jsonString.startsWith("{")) jsonString = "{" + jsonString;
    if (!jsonString.endsWith("}")) jsonString += "}";

    // Parse the cleaned JSON string
    const parsedJson = JSON.parse(jsonString);
    console.log("Parsed JSON:", parsedJson);
    return parsedJson;
  } catch (error) {
    console.error("Error parsing JSON:", error);

    // Fallback to a default JSON object
    return {};
  }
};


export const validateJsonObj = async (
  jsonObj,
  validateCustomer,
  validateProduct,
  validateInvoice,
  dispatchValidEntities,
  setPopupHandlers
) => {
  console.log("inside ValidateJsonObj; jsonData:", jsonObj);

  const invoicesArray = Array.isArray(jsonObj.invoices) ? jsonObj.invoices : [];
  const productsArray = Array.isArray(jsonObj.products) ? jsonObj.products : [];
  const customersArray = Array.isArray(jsonObj.customers) ? jsonObj.customers : [];

  const validEntities = {
    customers: [],
    products: [],
    invoices: []
  };

  const pendingValidation = {
    customers: [],
    products: [],
    invoices: []
  };

  // Validate customers
  for (const customer of customersArray) {
    const { validatedCustomer, isDisplayPopup } = validateCustomer(customer);
    if (isDisplayPopup) {
      pendingValidation.customers.push(customer);
    } else {
      validEntities.customers.push(validatedCustomer);
    }
  }

  // Validate invoices
  for (const invoice of invoicesArray) {
    const { validatedInvoice, isDisplayPopup } = validateInvoice(invoice);
    if (isDisplayPopup) {
      pendingValidation.invoices.push(invoice);
    } else {
      validEntities.invoices.push(validatedInvoice);
    }
  }

  // Validate products
  for (const product of productsArray) {
    const { validatedProduct, isDisplayPopup } = validateProduct(product);
    if (isDisplayPopup) {
      pendingValidation.products.push(product);
    } else {
      validEntities.products.push(validatedProduct);
    }
  }

  console.log("valid entities:", validEntities);
  console.log("pending validation entities:", pendingValidation);

  // Dispatch valid entities immediately
  dispatchValidEntities(validEntities);

  // Handle pending validations via popups
  setPopupHandlers(pendingValidation);
};
