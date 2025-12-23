
import { GoogleGenAI } from "@google/genai";

// Always initialize GoogleGenAI with the API key from process.env.API_KEY.
export const getGeminiInstance = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const summarizeText = async (text: string) => {
  const ai = getGeminiInstance();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Você é um assistente de leitura literária. Por favor, forneça um resumo conciso, elegante e envolvente do seguinte trecho de livro em português. Foque no tom e nos eventos principais: "${text}"`,
    });
    // Use response.text directly (not a method).
    return response.text || "Não foi possível gerar um resumo no momento.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Ocorreu um erro ao conectar com a inteligência artificial. Verifique sua conexão.";
  }
};

export const explainConcept = async (concept: string, context: string) => {
  const ai = getGeminiInstance();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Explique brevemente o significado ou a importância do termo "${concept}" dentro deste contexto literário em português: "${context}"`,
    });
    // Use response.text directly (not a method).
    return response.text || "Sem explicação disponível para este termo.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Erro ao processar a explicação.";
  }
};
