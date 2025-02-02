import { addEntity, updateEntity } from "../store/appSlice";


export const dispatchHelper = (dispatch, type, data, id = null) => {
  console.log("inside dispatchHelper")
  const entityData = { ...data, type };

  if (id) {
    dispatch(updateEntity({ data: entityData, id }));
  } else {
    dispatch(addEntity(entityData));
  }
};


export const fetchDataHelper = (state, type, id = null) => {
  console.log("inside fetchDataHelper")
  const entities = Object.values(state.allEntities).filter(entity => entity.type === type);

  if (id) {
    return entities.find(entity => entity.id === id) || null;
  }

  return entities;
};


export const bifurcateEntities = (data) => {
  console.log("inside bifurcateEntities")
    // Extract product data
    const product = {
      id: data.id || null,
      name: data.productName || '',
      quantity: data.quantity || 0,
      unitPrice: data.unitPrice || 0,
      priceWithTax: data.priceWithTax || 0,
      tax: data.tax || 0,
    };
  
    // Extract customer data
    const customer = {
      id: data.id || null,
      customerName: data.customerName || '',
      phoneNumber: data.phoneNumber || '',
      totalPurchaseAmount: data.totalPurchaseAmount || 0,
    };
  
    // Extract invoice data
    const invoice = {
      serialNumber: data.id || null,
      customerName: data.customerName || '',
      productName: data.productName || '',
      quantity: data.quantity || 0,
      tax: data.tax || 0,
      totalAmount: data.totalAmount || 0,
      date: data.date || '',
    };
  
    return { product, customer, invoice };
  };
  