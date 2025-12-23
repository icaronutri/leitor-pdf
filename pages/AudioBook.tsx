
import React from 'react';
import { Page } from '../types';
import { MOCK_AUDIOBOOKS } from '../constants';
import { BottomNav } from '../components/Layout';

interface AudioBookProps {
  onNavigate: (page: Page) => void;
}

const AudioBook: React.FC<AudioBookProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark relative overflow-y-auto scrollbar-hide pb-24">
      <header className="sticky top-0 z-40 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md px-5 py-4 flex items-center justify-between border-b border-black/5 dark:border-white/5 transition-colors">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-white shadow-sm">
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>headset</span>
          </div>
          <h1 className="text-xl font-extrabold tracking-tight text-text-main dark:text-white">Audio Books</h1>
        </div>
        <button className="w-10 h-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 flex items-center justify-center transition-colors">
          <span className="material-symbols-outlined">search</span>
        </button>
      </header>

      <div className="p-5">
        <div className="bg-gradient-to-br from-primary to-primary-dark rounded-3xl p-6 text-white mb-8 shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl font-black mb-1">Ouça agora</h2>
            <p className="text-white/80 text-sm mb-4">Continue de onde você parou.</p>
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-2xl p-4">
              <div className="w-16 h-16 rounded-lg bg-cover bg-center shadow-md" style={{ backgroundImage: `url(${MOCK_AUDIOBOOKS[0].cover})` }}></div>
              <div className="flex-1">
                <h3 className="font-bold text-sm line-clamp-1">{MOCK_AUDIOBOOKS[0].title}</h3>
                <p className="text-xs text-white/70 mb-2">{MOCK_AUDIOBOOKS[0].timeLeft}</p>
                <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white w-[70%]"></div>
                </div>
              </div>
              <button className="w-10 h-10 rounded-full bg-white text-primary flex items-center justify-center shadow-lg active:scale-90 transition-transform">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
              </button>
            </div>
          </div>
          <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-white/10 text-[120px] pointer-events-none">graphic_eq</span>
        </div>

        <h3 className="text-lg font-bold mb-4 ml-1">Sua Coleção</h3>
        <div className="flex flex-col gap-4">
          {MOCK_AUDIOBOOKS.map((audio) => (
            <div key={audio.id} className="bg-white dark:bg-surface-dark rounded-2xl p-4 shadow-sm border border-black/5 dark:border-white/5 flex gap-4 hover:shadow-md transition-shadow cursor-pointer group">
              <div className="w-20 h-20 rounded-xl bg-cover bg-center shadow-sm relative overflow-hidden" style={{ backgroundImage: `url(${audio.cover})` }}>
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-3xl">play_circle</span>
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <h4 className="font-bold text-text-main dark:text-white leading-tight mb-0.5">{audio.title}</h4>
                <p className="text-xs text-text-muted mb-3">{audio.author}</p>
                <div className="flex items-center justify-between text-[10px] font-bold text-text-muted uppercase tracking-wider">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">schedule</span>
                    {audio.duration}
                  </span>
                  <span className="text-primary">{audio.progress}% concluído</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 rounded-3xl bg-gray-100 dark:bg-white/5 border border-dashed border-gray-300 dark:border-white/10 flex flex-col items-center text-center gap-3">
          <div className="w-12 h-12 rounded-full bg-white dark:bg-white/10 flex items-center justify-center shadow-sm text-primary">
            <span className="material-symbols-outlined">add</span>
          </div>
          <div>
            <h4 className="font-bold text-sm">Explorar mais audiobooks</h4>
            <p className="text-xs text-text-muted">Descubra novos títulos para sua jornada.</p>
          </div>
        </div>
      </div>

      <BottomNav currentPage={Page.AudioBook} onNavigate={onNavigate} />
    </div>
  );
};

export default AudioBook;
