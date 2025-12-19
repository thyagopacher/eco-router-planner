
import React from 'react';
import { FormState, VehicleInfo } from '../types';

interface RouteFormProps {
  onSubmit: (data: FormState) => void;
  isLoading: boolean;
}

const RouteForm: React.FC<RouteFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = React.useState<FormState>({
    startCity: '',
    endCity: '',
    vehicle: {
      model: '',
      year: '',
      fuelType: 'Gasolina'
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const updateVehicle = (updates: Partial<VehicleInfo>) => {
    setFormData(prev => ({
      ...prev,
      vehicle: { ...prev.vehicle, ...updates }
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-blue-700 flex items-center gap-2">
            <i className="fas fa-route"></i> Trajeto
          </h3>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Cidade de Origem</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="Ex: São Paulo, SP"
              value={formData.startCity}
              onChange={e => setFormData({ ...formData, startCity: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Cidade de Destino</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="Ex: Rio de Janeiro, RJ"
              value={formData.endCity}
              onChange={e => setFormData({ ...formData, endCity: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-emerald-700 flex items-center gap-2">
            <i className="fas fa-car"></i> Veículo
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Modelo do Carro</label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition"
                placeholder="Ex: Honda Civic"
                value={formData.vehicle.model}
                onChange={e => updateVehicle({ model: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Ano</label>
              <input
                type="number"
                required
                className="w-full px-4 py-2 rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition"
                placeholder="Ex: 2022"
                value={formData.vehicle.year}
                onChange={e => updateVehicle({ year: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Combustível</label>
            <select
              className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition appearance-none bg-white"
              value={formData.vehicle.fuelType}
              onChange={e => updateVehicle({ fuelType: e.target.value as any })}
            >
              <option>Gasolina</option>
              <option>Etanol</option>
              <option>Diesel</option>
              <option>Flex</option>
            </select>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
      >
        {isLoading ? (
          <>
            <i className="fas fa-spinner fa-spin"></i> Analisando Rota...
          </>
        ) : (
          <>
            <i className="fas fa-search-location"></i> Planejar Minha Viagem
          </>
        )}
      </button>
    </form>
  );
};

export default RouteForm;
