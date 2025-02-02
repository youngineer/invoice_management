import * as XLSX from 'xlsx';

const formatKey = (key) => {
  return key
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '');
};

const handleExcelFile = async (file) => {
  console.log("inside handleExcelFile")
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { defval: 'missing' });
        
        const seenRows = new Set();
        const formattedData = jsonData.reduce((acc, row) => {
          const formattedRow = Object.entries(row).reduce((obj, [key, value]) => ({
            ...obj,
            [formatKey(key)]: value
          }), {});
          
          const rowString = JSON.stringify(formattedRow);
          if (!seenRows.has(rowString)) {
            seenRows.add(rowString);
            acc.push(formattedRow);
          }
          return acc;
        }, []);
        
        resolve(formattedData);
      } catch (error) {
        reject(`Error parsing file: ${error.message}`);
      }
    };
    
    reader.onerror = (error) => reject(`FileReader error: ${error.message}`);
    reader.readAsArrayBuffer(file);
  });
};

export const checkExcelFile = async (file) => {
  console.log("inside checkExcelFile")
  const fileExtension = file.name.split('.').pop().toLowerCase();
  
  if (!['xlsx', 'csv'].includes(fileExtension)) {
    throw new Error('Unsupported file format. Please upload a .csv or .xlsx file.');
  }
  
  try {
    const fileContent = await handleExcelFile(file);
    return fileContent;
  } catch (error) {
    console.error('Error processing excel file:', error);
    throw error;
  }
};