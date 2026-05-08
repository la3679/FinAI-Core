import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });

export interface TransactionAnalysis {
  category: string;
  isRecurring: boolean;
  confidence: number;
  explanation: string;
}

export const analyzeTransaction = async (description: string, amount: number): Promise<TransactionAnalysis> => {
  const result = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze this transaction: description="${description}", amount=${amount}. Categorize it and detect if it looks recurring.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          category: { type: Type.STRING, description: "One of: Housing, Food, Transport, Entertainment, Shopping, Healthcare, Utilities, Investment, Education, Other" },
          isRecurring: { type: Type.BOOLEAN },
          confidence: { type: Type.NUMBER },
          explanation: { type: Type.STRING }
        },
        required: ["category", "isRecurring", "confidence", "explanation"]
      }
    }
  });

  return JSON.parse(result.text);
};

export interface BehavioralInsight {
  cluster: "Saver" | "Impulse Spender" | "Investor" | "Stable Planner" | "Debt-Heavy";
  riskScore: number;
  recommendations: string[];
  forecastSummary: string;
}

export const generateBehavioralProfile = async (transactions: any[]): Promise<BehavioralInsight> => {
  const result = await ai.models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents: `Based on these transactions: ${JSON.stringify(transactions.slice(0, 50))}, generate a behavioral profile and 3 month forecast.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          cluster: { type: Type.STRING },
          riskScore: { type: Type.NUMBER, description: "0-100 scale" },
          recommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
          forecastSummary: { type: Type.STRING }
        },
        required: ["cluster", "riskScore", "recommendations", "forecastSummary"]
      }
    }
  });

  return JSON.parse(result.text);
};

export const simulateFinancialOutcome = async (scenario: string, currentStatus: any) => {
  const result = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Simulate this scenario: "${scenario}". Current financial status: ${JSON.stringify(currentStatus)}. Provide year-by-year impact for 5 years.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          projections: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                year: { type: Type.NUMBER },
                balance: { type: Type.NUMBER },
                savingsRate: { type: Type.NUMBER },
                impact: { type: Type.STRING }
              }
            }
          },
          summary: { type: Type.STRING }
        }
      }
    }
  });

  return JSON.parse(result.text);
}
