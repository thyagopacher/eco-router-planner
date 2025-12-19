
export interface VehicleInfo {
  model: string;
  year: string;
  fuelType: 'Gasolina' | 'Etanol' | 'Diesel' | 'Flex';
}

export interface StopPoint {
  name: string;
  type: 'Restaurante' | 'Posto' | 'Ponto Turístico';
  description: string;
  rating: number;
  distanceFromStart: number;
}

export interface RouteAnalysis {
  distanceKm: number;
  estimatedDuration: string;
  consumptionLiters: number;
  estimatedCost: number;
  averageEfficiency: number; // km/L
  stops: StopPoint[];
  refuelRecommendation: string;
  routeSummary: string;
  sources: { title: string; uri: string }[];
}

export interface FormState {
  startCity: string;
  endCity: string;
  vehicle: VehicleInfo;
}
