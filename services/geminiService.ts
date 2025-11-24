import { GoogleGenAI, Type } from "@google/genai";

// Initialize API client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export interface GeneratedMaterialItem {
  name: string;
  category: string;
  quantityPerStudent: number;
  unit: string;
  reasoning: string;
}

export const generateCourseMaterials = async (courseName: string, description: string): Promise<GeneratedMaterialItem[]> => {
  try {
    const model = "gemini-2.5-flash";
    const prompt = `
      Act as an expert instructional designer and logistics coordinator for technical training.
      Create a detailed Bill of Materials (BOM) for a presencial course titled "${courseName}".
      Description: ${description}.
      
      List the materials needed for ONE student.
      Categorize them into: Consumible, Equipo, EPP, or Papelería.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING, description: "Name of the material in Spanish" },
              category: { type: Type.STRING, enum: ["Consumible", "Equipo", "EPP", "Papelería"] },
              quantityPerStudent: { type: Type.NUMBER, description: "Estimated quantity needed per student" },
              unit: { type: Type.STRING, description: "Unit of measure (e.g., pza, kg, mts)" },
              reasoning: { type: Type.STRING, description: "Brief reason why this is needed" }
            },
            required: ["name", "category", "quantityPerStudent", "unit", "reasoning"]
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as GeneratedMaterialItem[];
    }
    return [];
  } catch (error) {
    console.error("Error generating materials with Gemini:", error);
    throw error;
  }
};
