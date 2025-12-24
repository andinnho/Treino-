
import { GoogleGenAI } from "@google/genai";
import { ProgressState, WorkoutDay } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export async function analyzeWorkoutProgress(workouts: WorkoutDay[], history: ProgressState): Promise<string> {
  if (!process.env.API_KEY) return "Configure a API Key para receber análises da IA.";

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analise o seguinte progresso de treino de musculação e dê dicas rápidas de progressão de carga ou ajuste técnico.
      Treinos: ${JSON.stringify(workouts)}
      Histórico Recente: ${JSON.stringify(history)}
      Dê uma resposta motivadora e técnica em português do Brasil, curta e direta.`,
    });
    return response.text || "Não foi possível gerar uma análise no momento.";
  } catch (error) {
    console.error("AI Analysis Error:", error);
    return "Erro ao conectar com o assistente de IA.";
  }
}
