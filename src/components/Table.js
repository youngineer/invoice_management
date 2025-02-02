import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { columnConfigs } from '../../utils/constants';

export default function Table(rowList, entity) {
  return (
    <div style={{ height: 300, width: '100%' }}>
      <DataGrid editMode="row" rows={rowList} columns={columnConfigs[entity]} />
    </div>
  );
}

const columnConfigs = {
  customer: [
    { field: 'id', header: 'ID', width: 'w-20' },
    { field: 'name', header: 'Customer Name', width: 'w-48' },
    { field: 'phone', header: 'Phone', width: 'w-40' },
    { 
      field: 'totalPurchase', 
      header: 'Total Purchase', 
      width: 'w-40',
      format: (value) => `$${value.toFixed(2)}`
    }
  ],
  product: [
    { field: 'name', header: 'Product Name', width: 'w-48' },
    { 
      field: 'quantity', 
      header: 'Quantity', 
      width: 'w-32',
      format: (value) => value.toString()
    },
    { 
      field: 'unitPrice', 
      header: 'Unit Price', 
      width: 'w-32',
      format: (value) => `$${value.toFixed(2)}`
    },
    { 
      field: 'tax', 
      header: 'Tax (%)', 
      width: 'w-32',
      format: (value) => `${value}%`
    },
    { 
      field: 'priceWithTax', 
      header: 'Price with Tax', 
      width: 'w-40',
      format: (value) => `$${value.toFixed(2)}`
    }
  ],
  invoice: [
    { field: 'id', header: 'ID', width: 'w-20' },
    { field: 'serialNumber', header: 'Serial Number', width: 'w-40' },
    { field: 'customerName', header: 'Customer', width: 'w-48' },
    { field: 'productName', header: 'Product', width: 'w-48' },
    { 
      field: 'quantity', 
      header: 'Quantity', 
      width: 'w-32',
      format: (value) => value.toString()
    },
    { 
      field: 'price', 
      header: 'Price', 
      width: 'w-32',
      format: (value) => `$${value.toFixed(2)}`
    },
    { 
      field: 'taxAmount', 
      header: 'Tax', 
      width: 'w-32',
      format: (value) => `$${value.toFixed(2)}`
    },
    { 
      field: 'totalPrice', 
      header: 'Total', 
      width: 'w-40',
      format: (value) => `$${value.toFixed(2)}`
    },
    { 
      field: 'date', 
      header: 'Date', 
      width: 'w-40',
      format: (value) => new Date(value).toLocaleDateString()
    }
  ]
};