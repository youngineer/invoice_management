import { DataGrid, GridActionsCellItem, GridRowModes } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import { updateProductWithInvoices } from '../store/productSlice';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import { selectAllProducts } from '../store/selectors';
import { useCallback, useState } from 'react';

const Product = () => {
  const dispatch = useDispatch();
  const rows = useSelector(selectAllProducts);
  console.log("rows fetched from the product tab:", rows);
  const [rowModesModel, setRowModesModel] = useState({});
  const [editedRows, setEditedRows] = useState({});


  const handleEditClick = (id) => () => {
    const rowToEdit = rows.find(row => row.id === id);
    setEditedRows(prev => ({
      ...prev,
      [id]: { ...rowToEdit }
    }));
    
    setRowModesModel(prev => ({
      ...prev,
      [id]: { mode: GridRowModes.Edit }
    }));
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel(prev => ({
      ...prev,
      [id]: { mode: GridRowModes.View }
    }));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel(prev => ({
      ...prev,
      [id]: { mode: GridRowModes.View }
    }));
    
    if (editedRows[id]) {
      dispatch(updateProductWithInvoices(editedRows[id]));
      setEditedRows(prev => {
        const newState = { ...prev };
        delete newState[id];
        return newState;
      });
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = {
      ...newRow,
      priceWithTax: (newRow.unitPrice + newRow.tax) * newRow.quantity
    };
    dispatch(updateProductWithInvoices(updatedRow));
    setEditedRows(prev => {
      const newState = { ...prev };
      delete newState[newRow.id];
      return newState;
    });
    return updatedRow;
  };

  const handleProcessRowUpdateError = useCallback((error) => {
    console.error('Error updating row:', error);
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'name', headerName: 'Product Name', width: 180, editable: true },
    { field: 'quantity', headerName: 'Quantity', type: 'number', width: 100, editable: true },
    { field: 'unitPrice', headerName: 'Unit Price', type: 'number', width: 120, editable: true },
    { field: 'tax', headerName: 'Tax', type: 'number', width: 100, editable: true },
    { field: 'priceWithTax', headerName: 'Price with Tax', type: 'number', width: 140, editable: false },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
              key="save"
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              onClick={handleCancelClick(id)}
              key="cancel"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            onClick={handleEditClick(id)}
            key="edit"
          />,
        ];
      },
    },
  ];

  return (
    <Box sx={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={setRowModesModel}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={handleProcessRowUpdateError}
        slotProps={{
          toolbar: { setRowModesModel },
        }}
      />
    </Box>
  );
};

export default Product;