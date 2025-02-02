import { GoogleGenerativeAI } from "@google/generative-ai";
import { PROMPT } from "../../utils/constants.js";
import { handleAiResponse } from "./handleAiOutput.js";



export const fetchApiResult = async (file, apiKey) => {
  console.log("inside fetchApiResult")
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = async (event) => {
        const base64Data = event.target.result.split(",")[1]; 
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash" });
  
        try {
          const result = await model.generateContent([
            {
              inlineData: {
                data: base64Data,
                mimeType: file.type,
              },
            },
            PROMPT,
          ]);
          // resolve(result.response.text());
          const jsonObj = handleAiResponse(result.response.text());
          console.log("Back to fetchApiOutput with: ", jsonObj);
          resolve(jsonObj);
          return jsonObj;
        } catch (error) {
          console.error("Error generating content:", error);
          reject(error);
        }
      };
  
      reader.onerror = (error) => {
        console.error("Error reading file:", error);
        reject(error);
      };
  
      reader.readAsDataURL(file);
    });
  };


  export const fetchApiResultJson = async (data, apiKey) => {
    console.log("inside fetchApiResultJson")
    
    return new Promise(async (resolve, reject) => {
      try {
        if (!Array.isArray(data)) {
          throw new Error('Data is not an array of objects');
        }
  
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  
        // Convert data to string and format for the API
        const prompt = PROMPT + JSON.stringify(data);
  
        const result = await model.generateContent({
          contents: [{
            role: 'user',
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          }
        });
  
        const response = result.response.text();
        console.log("AiOp:", result.response.text())
        // handleAiResponse(response, dispatch);
        // resolve(response);
        const jsonObj = handleAiResponse(result.response.text());
        console.log("Back to fetchApiOutput with: ", jsonObj);
        resolve(jsonObj);
        return jsonObj;
  
      } catch (error) {
        console.error('Error processing data:', error);
        reject(error);
        return null;
      }
    });
  };
  
  export default fetchApiResultJson;
