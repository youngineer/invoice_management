import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { useDispatch, useSelector } from "react-redux";
import { setApiKey } from "../store/apiKeySlice";
import { validateCustomer, validateInvoice, validateProduct } from "../services/validation.js";
import { checkExcelFile } from "../services/handleExcelFile";
import ControlledPopup from "./ControlledPopup";
import { addInvoice } from "../store/invoiceSlice";
import { addProduct } from "../store/productSlice";
import { addCustomer } from "../store/customerSlice";
import { validateJsonObj } from "../services/handleAiOutput";
import {fetchApiResult, fetchApiResultJson } from "../services/fetchApiOutput.js"

const fileTypes = ["JPG", "PNG", "PDF", "XLSX", "CSV"];

const Body = () => {
  const [fileList, setFileList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [popupData, setPopupData] = useState(null);
  const [popupType, setPopupType] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [pendingDispatch, setPendingDispatch] = useState({
    customers: [],
    products: [],
    invoices: []
  });
  const dispatch = useDispatch();
  const apiKey = useSelector((state) => state.apiKey.key);

  const handleApiSubmit = (e) => {
    e.preventDefault();
    dispatch(setApiKey(inputValue));
  };

  const dispatchValidEntities = (entities) => {
    const { customers, products, invoices } = entities;

    customers.forEach((customer) => dispatch(addCustomer(customer)));
    products.forEach((product) => dispatch(addProduct(product)));
    invoices.forEach((invoice) => dispatch(addInvoice(invoice)));
  };

  const setPopupHandlers = (pendingValidation) => {
    if (pendingValidation.customers.length > 0) {
      setPopupType("customer");
      setPopupData(pendingValidation.customers[0]);
    } else if (pendingValidation.products.length > 0) {
      setPopupType("product");
      setPopupData(pendingValidation.products[0]);
    } else if (pendingValidation.invoices.length > 0) {
      setPopupType("invoice");
      setPopupData(pendingValidation.invoices[0]);
    } else {
      setIsPopupOpen(false);
      setPopupData(null);
      setPopupType(null);
    }

    setPendingDispatch(pendingValidation);
    setIsPopupOpen(true);
  };

  const handleChange = async (files) => {
    const filesArray = Array.isArray(files) ? files : Array.from(files);
    setFileList((prevList) => [...prevList, ...filesArray]);

    for (const file of filesArray) {
      try {
        const fileExtension = file.name.split(".").pop().toLowerCase();
        let jsonData = null;

        if (["jpg", "png", "pdf"].includes(fileExtension)) {
          jsonData = await fetchApiResult(file, apiKey);
        } else {
          const excelData = await checkExcelFile(file);
          jsonData = await fetchApiResultJson(excelData, apiKey);
        }

        if (jsonData) {
          // jsonData = JSON.parse(jsonData);
          console.log("Sending to validateJson with objType: ", typeof(jsonData));
          await validateJsonObj(
            jsonData,
            validateCustomer,
            validateProduct,
            validateInvoice,
            dispatchValidEntities,
            setPopupHandlers
          );
        }
      } catch (error) {
        console.error("Error processing file:", error);
      }
    }
  };

  const handlePopupSubmit = (formData) => {
    let validatedEntity;
    const currentPending = { ...pendingDispatch };

    switch (popupType) {
      case "customer":
        const { validatedCustomer } = validateCustomer(formData);
        validatedEntity = validatedCustomer;
        currentPending.customers.shift();
        dispatch(addCustomer(validatedEntity));
        break;
      case "product":
        const { validatedProduct } = validateProduct(formData);
        validatedEntity = validatedProduct;
        currentPending.products.shift();
        dispatch(addProduct(validatedEntity));
        break;
      case "invoice":
        const { validatedInvoice } = validateInvoice(formData);
        validatedEntity = validatedInvoice;
        currentPending.invoices.shift();
        dispatch(addInvoice(validatedEntity));
        break;
    }

    setPendingDispatch(currentPending);
    setPopupHandlers(currentPending);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="flex p-2 mt-4 mb-8">
        <input
          type="text"
          placeholder="Enter your Gemini API Key"
          className="mx-4 p-4 rounded-lg border-black min-w-96"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          className="p-3 bg-green-500 text-black rounded-lg"
          onClick={handleApiSubmit}
        >
          Submit
        </button>
      </div>
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          Upload Your Invoices Here
        </h1>
        <FileUploader
          handleChange={handleChange}
          name="file"
          types={fileTypes}
          multiple={true}
        />
        <div className="mt-4">
          {fileList.length > 0 ? (
            <ul className="space-y-2">
              {fileList.map((file, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center p-2 bg-gray-50 border rounded-lg"
                >
                  <span className="text-gray-700">{file.name}</span>
                  <span className="text-sm text-gray-500">{file.type}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500 text-center">
              No files uploaded yet.
            </p>
          )}
        </div>
      </div>

      {isPopupOpen && popupData && (
        <ControlledPopup
          type={popupType}
          initialData={popupData}
          onSubmit={handlePopupSubmit}
          onClose={() => {
            setIsPopupOpen(false);
            setPopupData(null);
            setPopupType(null);
          }}
        />
      )}
    </div>
  );
};

export default Body;
