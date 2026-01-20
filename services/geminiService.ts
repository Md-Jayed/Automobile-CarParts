
import { GoogleGenAI, Type } from "@google/genai";

export const geminiService = {
  // Helper to safely get the AI instance
  getAI() {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.error("Gemini API Key is missing. Please add API_KEY to your environment variables.");
      throw new Error("API Configuration Missing");
    }
    return new GoogleGenAI({ apiKey });
  },

  // AI Search interpretation
  async interpretSearch(query: string) {
    try {
      const ai = this.getAI();
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
    } catch (error) {
      console.error("Search interpretation failed:", error);
      return {};
    }
  },

  // Virtual Assistant for guidance
  async getAssistantResponse(history: {role: 'user'|'model', text: string}[], message: string) {
    try {
      const ai = this.getAI();
      const chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: "You are AutoPart AI Assistant. You help users with car part installation guidance, troubleshooting, and order inquiries. Keep answers professional and safety-conscious."
        }
      });
      
      const response = await chat.sendMessage({ message });
      return response.text || '';
    } catch (error) {
      console.error("Assistant response failed:", error);
      return "I'm having trouble connecting to my brain right now. Please check if the API key is configured correctly.";
    }
  },

  // Visual search: Identify part from image
  async identifyPartFromImage(base64Image: string) {
    try {
      const ai = this.getAI();
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
    } catch (error) {
      console.error("Image identification failed:", error);
      return "Unable to identify part.";
    }
  }
};
