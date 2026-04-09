
import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";

// Always initialize the client with a named parameter using process.env.API_KEY
const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
};

/**
 * Communicates with the Gemini 3 Flash model to provide agricultural advice.
 */
export const chatWithGemini = async (message: string, history: Message[], lang: string) => {
  const ai = getAIClient();
  
  // Custom system instruction tailored for Algerian agriculture
  const systemInstruction = `You are "Portal Falahi DZ AI", a world-class agricultural advisor for Algerian farmers.
  Language: ${lang === 'ar' ? 'Arabic' : lang === 'fr' ? 'French' : 'English'}.
  Expertise: Northern Tell, Highlands, and Sahara farming cycles.
  Tone: Helpful, professional, and practical.
  Guidelines: Reference Algerian specific crops like Durum Wheat, Dates (Deglet Nour), and Potatoes. Provide tips on irrigation, soil health, and pest control. 
  Important: Always mention that advice depends on local weather and ONM bulletins.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history.map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        })),
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction,
        temperature: 0.7,
        topP: 0.9,
      },
    });

    // Directly return the text property from the response
    return response.text || "I'm sorry, I couldn't process your request.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
