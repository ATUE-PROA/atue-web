import { useEffect, useState } from 'react';
import { RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts';
import { mockGetDiagnostic } from '../mocks/api';
import type { DiagnosticReport } from '../types/api';

export function Dashboard() {
  const [relatorio, setRelatorio] = useState<DiagnosticReport | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarDados() {
      const dados = await mockGetDiagnostic();
      setRelatorio(dados);
      setCarregando(false);
    }
    carregarDados();
  }, []);

  if (carregando) {
    return <div className="min-h-screen flex items-center justify-center">Carregando diagnóstico...</div>;
  }

  const corSemaforo = 
    relatorio?.status === 'verde' ? 'bg-green-500' : 
    relatorio?.status === 'amarelo' ? 'bg-yellow-500' : 'bg-red-500';

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Painel de Controle</h1>
            <p className="text-muted-foreground">Bem-vindo(a)!</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Status Geral:</span>
            <div className={`w-4 h-4 rounded-full ${corSemaforo}`} />
          </div>
        </header>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-card border rounded-xl p-6 flex flex-col items-center justify-center shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Score de Conformidade</h2>
            <div className="relative w-48 h-48">
              <RadialBarChart 
                width={200} 
                height={200} 
                cx="50%" cy="50%" 
                innerRadius="70%" outerRadius="100%" 
                barSize={10} 
                data={[{ name: 'Score', value: relatorio?.score, fill: '#eab308' }]}
                startAngle={90} endAngle={-270}
              >
                <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                <RadialBar background dataKey="value" cornerRadius={10} />
              </RadialBarChart>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold">{relatorio?.score}</span>
                <span className="text-sm text-muted-foreground">de 100</span>
              </div>
            </div>
          </div>

          <div className="bg-card border rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Pendências Encontradas</h2>
            <ul className="space-y-3">
              {relatorio?.issues.map((issue) => (
                <li key={issue.id} className="p-3 bg-muted rounded-md border flex flex-col">
                  <span className="font-medium">{issue.name}</span>
                  <span className="text-sm text-muted-foreground">{issue.description}</span>
                </li>
              ))}
              {relatorio?.issues.length === 0 && (
                <p className="text-muted-foreground text-sm">Nenhuma pendência encontrada.</p>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}