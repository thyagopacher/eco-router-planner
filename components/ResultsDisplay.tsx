
import React from 'react';
import { RouteAnalysis, StopPoint } from '../types';

interface ResultsDisplayProps {
  analysis: RouteAnalysis;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ analysis }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-blue-500">
          <div className="text-slate-500 text-sm font-medium">Distância</div>
          <div className="text-2xl font-bold text-slate-800">{analysis.distanceKm} km</div>
          <div className="text-xs text-slate-400 mt-1">Tempo est.: {analysis.estimatedDuration}</div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-emerald-500">
          <div className="text-slate-500 text-sm font-medium">Consumo Est.</div>
          <div className="text-2xl font-bold text-slate-800">{analysis.consumptionLiters.toFixed(1)} L</div>
          <div className="text-xs text-slate-400 mt-1">Eficiência: {analysis.averageEfficiency} km/L</div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-amber-500">
          <div className="text-slate-500 text-sm font-medium">Gasto Estimado</div>
          <div className="text-2xl font-bold text-slate-800">{formatCurrency(analysis.estimatedCost)}</div>
          <div className="text-xs text-slate-400 mt-1">Preços médios atuais</div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-purple-500">
          <div className="text-slate-500 text-sm font-medium">Status da Rota</div>
          <div className="text-lg font-semibold text-slate-800 truncate">Rodovias Principais</div>
          <div className="text-xs text-slate-400 mt-1">Ver detalhes abaixo</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Route Summary & Stops */}
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <i className="fas fa-map-marked-alt text-blue-500"></i> Resumo do Percurso
            </h3>
            <p className="text-slate-600 leading-relaxed">{analysis.routeSummary}</p>
            
            <div className="mt-6 bg-blue-50 p-4 rounded-xl border border-blue-100">
              <h4 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
                <i className="fas fa-gas-pump"></i> Recomendação de Abastecimento
              </h4>
              <p className="text-blue-700 text-sm">{analysis.refuelRecommendation}</p>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <i className="fas fa-utensils text-orange-500"></i> Paradas Recomendadas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {analysis.stops.map((stop, idx) => (
                <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                    stop.type === 'Restaurante' ? 'bg-orange-100 text-orange-600' : 
                    stop.type === 'Posto' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'
                  }`}>
                    <i className={`fas ${
                      stop.type === 'Restaurante' ? 'fa-hamburger' : 
                      stop.type === 'Posto' ? 'fa-gas-pump' : 'fa-camera-retro'
                    }`}></i>
                  </div>
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-slate-800">{stop.name}</h4>
                      <span className="text-xs bg-slate-100 px-2 py-1 rounded-full text-slate-500 font-medium">
                        KM {stop.distanceFromStart}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-amber-400 text-xs mb-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <i key={i} className={`fas fa-star ${i < stop.rating ? '' : 'text-slate-200'}`}></i>
                      ))}
                      <span className="text-slate-400 ml-1 font-bold">{stop.rating}/5</span>
                    </div>
                    <p className="text-sm text-slate-500 line-clamp-2">{stop.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: References & Tips */}
        <div className="space-y-6">
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Dicas de Viagem</h3>
            <ul className="space-y-3">
              <li className="flex gap-3 text-sm text-slate-600">
                <i className="fas fa-check-circle text-emerald-500 mt-1"></i>
                Verifique a pressão dos pneus antes de sair.
              </li>
              <li className="flex gap-3 text-sm text-slate-600">
                <i className="fas fa-check-circle text-emerald-500 mt-1"></i>
                Leve água e snacks leves para o percurso.
              </li>
              <li className="flex gap-3 text-sm text-slate-600">
                <i className="fas fa-check-circle text-emerald-500 mt-1"></i>
                Utilize apps de GPS em tempo real para evitar congestionamentos.
              </li>
            </ul>
          </section>

          {analysis.sources && analysis.sources.length > 0 && (
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Fontes e Links Úteis</h3>
              <div className="space-y-3">
                {analysis.sources.map((source, i) => (
                  <a 
                    key={i} 
                    href={source.uri} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block p-3 rounded-lg bg-slate-50 hover:bg-blue-50 border border-slate-100 hover:border-blue-200 transition group"
                  >
                    <div className="text-sm font-semibold text-slate-700 group-hover:text-blue-700 truncate">{source.title}</div>
                    <div className="text-xs text-blue-500 truncate mt-1">Ver no Google Search <i className="fas fa-external-link-alt ml-1"></i></div>
                  </a>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;
