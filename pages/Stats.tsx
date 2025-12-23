
import React from 'react';
import { Page } from '../types';
import { BottomNav } from '../components/Layout';
import { MOCK_USER } from '../constants';

interface StatsProps {
  onNavigate: (page: Page) => void;
}

const Stats: React.FC<StatsProps> = ({ onNavigate }) => {
  const weeklyData = [
    { day: 'Seg', mins: 45 },
    { day: 'Ter', mins: 30 },
    { day: 'Qua', mins: 60 },
    { day: 'Qui', mins: 20 },
    { day: 'Sex', mins: 55 },
    { day: 'Sáb', mins: 90 },
    { day: 'Dom', mins: 40 },
  ];

  const maxMins = Math.max(...weeklyData.map(d => d.mins));

  const genres = [
    { name: 'Ficção Científica', count: 12, color: 'bg-blue-500' },
    { name: 'Clássicos', count: 8, color: 'bg-primary' },
    { name: 'Mistério', count: 7, color: 'bg-purple-500' },
    { name: 'História', count: 5, color: 'bg-orange-500' },
  ];

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark relative overflow-y-auto scrollbar-hide pb-28">
      <header className="sticky top-0 z-40 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md px-5 py-4 flex items-center justify-between border-b border-black/5 dark:border-white/5 transition-colors">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-white shadow-sm">
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>bar_chart</span>
          </div>
          <h1 className="text-xl font-extrabold tracking-tight text-text-main dark:text-white">Estatísticas</h1>
        </div>
        <button className="w-10 h-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 flex items-center justify-center transition-colors">
          <span className="material-symbols-outlined">share</span>
        </button>
      </header>

      <main className="p-5 flex flex-col gap-6">
        {/* Resumo Rápido */}
        <section className="grid grid-cols-2 gap-4">
          <div className="bg-white dark:bg-surface-dark p-4 rounded-2xl shadow-soft border border-black/5 dark:border-white/5">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-primary text-lg">history</span>
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Tempo Total</span>
            </div>
            <p className="text-2xl font-black text-text-main dark:text-white">{MOCK_USER.stats.readTimeHours}h <span className="text-xs font-normal text-text-muted">32m</span></p>
          </div>
          <div className="bg-white dark:bg-surface-dark p-4 rounded-2xl shadow-soft border border-black/5 dark:border-white/5">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-orange-500 text-lg">local_fire_department</span>
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Sequência</span>
            </div>
            <p className="text-2xl font-black text-text-main dark:text-white">{MOCK_USER.stats.streakDays} <span className="text-xs font-normal text-text-muted">dias</span></p>
          </div>
        </section>

        {/* Gráfico Semanal */}
        <section className="bg-white dark:bg-surface-dark p-6 rounded-3xl shadow-soft border border-black/5 dark:border-white/5">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h3 className="font-bold text-lg leading-tight">Leitura Semanal</h3>
              <p className="text-xs text-text-muted">Minutos por dia</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-primary">340 min</p>
              <p className="text-[10px] text-green-500">+12% vs. semana ant.</p>
            </div>
          </div>
          
          <div className="flex justify-between items-end h-32 gap-2">
            {weeklyData.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div 
                  className="w-full bg-primary/10 rounded-t-lg relative group transition-all duration-500 ease-out overflow-hidden" 
                  style={{ height: `${(d.mins / maxMins) * 100}%` }}
                >
                  <div className="absolute inset-0 bg-primary opacity-80 translate-y-full group-hover:translate-y-0 transition-transform"></div>
                  <div className="w-full h-full bg-primary/40"></div>
                </div>
                <span className="text-[10px] font-medium text-text-muted">{d.day}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Meta Anual */}
        <section className="bg-gradient-to-br from-primary to-primary-dark p-6 rounded-3xl shadow-lg text-white">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-bold text-lg">Meta Anual 2024</h3>
              <p className="text-white/70 text-xs">8 de 12 livros concluídos</p>
            </div>
            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
              <span className="material-symbols-outlined">emoji_events</span>
            </div>
          </div>
          
          <div className="w-full h-3 bg-black/10 rounded-full mb-3 overflow-hidden">
            <div className="h-full bg-white rounded-full" style={{ width: '66.6%' }}></div>
          </div>
          
          <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
            <span>66% da meta</span>
            <span>4 livros restantes</span>
          </div>
        </section>

        {/* Gêneros Favoritos */}
        <section className="bg-white dark:bg-surface-dark p-6 rounded-3xl shadow-soft border border-black/5 dark:border-white/5">
          <h3 className="font-bold text-lg mb-4">Seus Gêneros</h3>
          <div className="space-y-4">
            {genres.map((g, i) => (
              <div key={i}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs font-medium">{g.name}</span>
                  <span className="text-xs font-bold">{g.count}</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                  <div className={`h-full ${g.color}`} style={{ width: `${(g.count / 12) * 100}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Insights da IA */}
        <section className="p-4 bg-primary/5 rounded-2xl border border-primary/20 flex gap-4 items-start">
          <div className="bg-primary/10 p-2 rounded-lg text-primary">
            <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
          </div>
          <div>
            <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-1">Dica do LionReader</h4>
            <p className="text-sm text-text-main dark:text-gray-300 leading-relaxed">
              Você lê 20% mais rápido durante a manhã. Tente reservar 15 minutos extras antes do trabalho para acelerar sua meta anual!
            </p>
          </div>
        </section>
      </main>

      <BottomNav currentPage={Page.Stats} onNavigate={onNavigate} />
    </div>
  );
};

export default Stats;
