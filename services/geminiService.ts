
import { GoogleGenAI, Type } from "@google/genai";

export const geminiService = {
  // AI Search interpretation
  async interpretSearch(query: string) {
    // Correct initialization: always use {apiKey: process.env.API_KEY}
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Interpret this car parts search query and return a JSON object with: make, model, year (as number), and category. Query: "${query}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            make: { type: Type.STRING },
            model: { type: Type.STRING },
            year: { type: Type.NUMBER },
            category: { type: Type.STRING }
          }
        }
      }
    });
    return JSON.parse(response.text || '{}');
  },

  // Virtual Assistant for guidance
  async getAssistantResponse(history: {role: 'user'|'model', text: string}[], message: string) {
    // Correct initialization: always use {apiKey: process.env.API_KEY}
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: "You are AutoPart AI Assistant. You help users with car part installation guidance, troubleshooting, and order inquiries. Keep answers professional and safety-conscious."
      }
    });
    
    // sendMessage only accepts message parameter
    const response = await chat.sendMessage({ message });
    return response.text || '';
  },

  // Visual search: Identify part from image
  async identifyPartFromImage(base64Image: string) {
    // Correct initialization: always use {apiKey: process.env.API_KEY}
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          { inlineData: { data: base64Image, mimeType: 'image/jpeg' } },
          { text: "Identify this automotive part. Return a short name and a category from [Engine, Brakes, Suspension, Electrical, Lighting, Maintenance]." }
        ]
      }
    });
    return response.text || '';
  }
};
