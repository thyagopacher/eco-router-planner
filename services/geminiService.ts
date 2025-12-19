
import { GoogleGenAI, Type } from "@google/genai";
import { FormState, RouteAnalysis } from "../types";

export const analyzeRoute = async (data: FormState): Promise<RouteAnalysis> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Analise uma viagem de carro entre ${data.startCity} e ${data.endCity}.
    Veículo: ${data.vehicle.model} (${data.vehicle.year}) rodando com ${data.vehicle.fuelType}.
    
    Por favor, forneça:
    1. Distância total em KM.
    2. Tempo estimado de viagem.
    3. Rendimento médio esperado (km/L) para este veículo e combustível.
    4. Consumo total de litros estimado.
    5. Custo total estimado em Reais (use preços médios atuais no Brasil).
    6. Uma lista de pelo menos 3 bons restaurantes ao longo da rota.
    7. Uma lista de pelo menos 3 postos de combustível confiáveis na rota (como Graal, Rede Ipiranga, etc).
    8. Uma recomendação específica de ONDE e QUANDO abastecer baseado na autonomia do carro.
    9. Um breve resumo da rota e condições das estradas.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      tools: [{ googleSearch: {} }],
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          distanceKm: { type: Type.NUMBER },
          estimatedDuration: { type: Type.STRING },
          averageEfficiency: { type: Type.NUMBER },
          consumptionLiters: { type: Type.NUMBER },
          estimatedCost: { type: Type.NUMBER },
          refuelRecommendation: { type: Type.STRING },
          routeSummary: { type: Type.STRING },
          stops: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                type: { type: Type.STRING, enum: ['Restaurante', 'Posto', 'Ponto Turístico'] },
                description: { type: Type.STRING },
                rating: { type: Type.NUMBER },
                distanceFromStart: { type: Type.NUMBER }
              },
              required: ['name', 'type', 'description', 'rating', 'distanceFromStart']
            }
          }
        },
        required: [
          'distanceKm', 'estimatedDuration', 'averageEfficiency', 
          'consumptionLiters', 'estimatedCost', 'refuelRecommendation', 
          'routeSummary', 'stops'
        ]
      }
    }
  });

  const analysis = JSON.parse(response.text.trim()) as RouteAnalysis;
  
  // Extract grounding sources
  const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
  analysis.sources = groundingChunks
    .filter((chunk: any) => chunk.web)
    .map((chunk: any) => ({
      title: chunk.web.title,
      uri: chunk.web.uri
    }));

  return analysis;
};
