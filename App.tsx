
import React from 'react';
import { FormState, RouteAnalysis } from './types';
import RouteForm from './components/RouteForm';
import ResultsDisplay from './components/ResultsDisplay';
import { analyzeRoute } from './services/geminiService';

const App: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [analysis, setAnalysis] = React.useState<RouteAnalysis | null>(null);

  const handleRouteSubmit = async (data: FormState) => {
    setLoading(true);
    setError(null);
    try {
      const result = await analyzeRoute(data);
      setAnalysis(result);
      // Scroll to results
      window.scrollTo({ top: 400, behavior: 'smooth' });
    } catch (err) {
      console.error(err);
      setError('Ocorreu um erro ao analisar a rota. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-blue-700 to-emerald-600 text-white py-16 px-4 mb-[-60px]">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-white/20 p-4 rounded-full backdrop-blur-md">
              <i className="fas fa-paper-plane text-4xl"></i>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4">EcoRoute Planner</h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto font-light leading-relaxed">
            Planeje sua viagem com inteligência: calculamos o combustível, o rendimento e encontramos as melhores paradas para você.
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4">
        {/* Form Container */}
        <div className="relative z-10">
          <RouteForm onSubmit={handleRouteSubmit} isLoading={loading} />
        </div>

        {/* Status Messages */}
        {error && (
          <div className="mt-8 p-4 bg-red-50 border border-red-100 text-red-700 rounded-xl flex items-center gap-3">
            <i className="fas fa-exclamation-circle text-xl"></i>
            <span>{error}</span>
          </div>
        )}

        {/* Results Area */}
        <div className="mt-12">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-slate-800">Traçando sua rota...</h3>
                <p className="text-slate-500">Consultando postos, restaurantes e custos médios.</p>
              </div>
            </div>
          ) : analysis ? (
            <ResultsDisplay analysis={analysis} />
          ) : (
            <div className="text-center py-20 opacity-40">
              <i className="fas fa-road text-6xl text-slate-300 mb-4"></i>
              <p className="text-slate-500">Preencha o formulário acima para ver os detalhes da sua viagem.</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 py-8 text-center text-slate-400 text-sm border-t border-slate-100">
        <p>&copy; {new Date().getFullYear()} EcoRoute Planner - Inteligência Artificial para Viajantes</p>
        <p className="mt-2 flex items-center justify-center gap-4">
          <span className="flex items-center gap-1"><i className="fas fa-bolt text-amber-500"></i> Powered by Gemini 3</span>
          <span className="flex items-center gap-1"><i className="fas fa-search text-blue-500"></i> Google Search Grounding</span>
        </p>
      </footer>
    </div>
  );
};

export default App;
