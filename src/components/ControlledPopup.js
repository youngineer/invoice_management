import React, { useEffect, useState } from 'react';
import Popup from 'reactjs-popup'; 

const ValidationPopup = ({ data, type, onSubmit }) => {
  const [formData, setFormData] = useState(data);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const getFields = () => {
    switch (type) {
      case 'product':
        return [
          { name: 'name', label: 'Product Name', type: 'text' },
          { name: 'quantity', label: 'Quantity', type: 'number' },
          { name: 'unitPrice', label: 'Unit Price', type: 'number' },
          { name: 'tax', label: 'Tax', type: 'number' }
        ];
      case 'customer':
        return [
          { name: 'customerName', label: 'Customer Name', type: 'text' },
          { name: 'phoneNumber', label: 'Phone Number', type: 'text' },
          { name: 'totalPurchaseAmount', label: 'Total Purchase Amount', type: 'number' }
        ];
      case 'invoice':
        return [
          { name: 'serialNumber', label: 'Serial Number', type: 'text' },
          { name: 'customerName', label: 'Customer Name', type: 'text' },
          { name: 'productName', label: 'Product Name', type: 'text' },
          { name: 'quantity', label: 'Quantity', type: 'number' },
          { name: 'price', label: 'Price', type: 'number' },
          { name: 'tax', label: 'Tax', type: 'number' },
          { name: 'date', label: 'Date', type: 'date' }
        ];
      default:
        return [];
    }
  };

  return (
    <div className="popup-content">
      <h2 className="text-xl font-bold mb-4">Please fill the misisng fields</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {getFields().map(field => (
          <div key={field.name}>
            <label className="block text-sm font-medium mb-1">{field.label}</label>
            <input
              type={field.type}
              value={formData[field.name] || ''}
              onChange={(e) => setFormData({
                ...formData,
                [field.name]: field.type === 'number' ? parseFloat(e.target.value) : e.target.value
              })}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        ))}
        <div className="flex justify-end space-x-2 mt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

const ControlledPopup = ({ type, initialData, onSubmit, onClose }) => {
  const [open, setOpen] = useState(false);
  const [entity, setEntity] = useState(null);

  // Use useEffect to handle external open/close control
  useEffect(() => {
    setOpen(true);  // Open when component mounts
  }, []);

  const handleClose = () => {
    setOpen(false);
    onClose?.();  // Call the external onClose handler if provided
  };

  const handleSubmit = (formData) => {
    setEntity(formData);
    onSubmit?.(formData);  // Call the external onSubmit handler if provided
    handleClose();
  };

  return (
    <div className=''>
    <div className="fixed inset-0 bg-black/50 backdrop-blur-2xl z-40"></div>
    <div className='border-black'>
    <Popup 
      open={true} 
      closeOnDocumentClick 
      onClose={handleClose} 
      modal
      position="center center"
      className="validation-popup"
    >
      <ValidationPopup
        data={initialData}
        type={type}
        onSubmit={handleSubmit}
      />
    </Popup></div>
    </div>
  );
};
export default ControlledPopup;