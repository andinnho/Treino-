
import { GoogleGenAI } from "@google/genai";
import { ProgressState, WorkoutDay } from "../types";

// Fix: Always use new GoogleGenAI({apiKey: process.env.API_KEY}) as per guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function analyzeWorkoutProgress(workouts: WorkoutDay[], history: ProgressState): Promise<string> {
  // Fix: Removed manual check for process.env.API_KEY as it's assumed to be pre-configured.
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analise o seguinte progresso de treino de musculação e dê dicas rápidas de progressão de carga ou ajuste técnico.
      Treinos: ${JSON.stringify(workouts)}
      Histórico Recente: ${JSON.stringify(history)}
      Dê uma resposta motivadora e técnica em português do Brasil, curta e direta.`,
    });
    // Fix: Access response.text property directly.
    return response.text || "Não foi possível gerar uma análise no momento.";
  } catch (error) {
    console.error("AI Analysis Error:", error);
    return "Erro ao conectar com o assistente de IA.";
  }
}
