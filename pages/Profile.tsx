
import React from 'react';
import { Page } from '../types';
import { BottomNav } from '../components/Layout';
import { MOCK_USER } from '../constants';

interface ProfileProps {
  onNavigate: (page: Page) => void;
}

const Profile: React.FC<ProfileProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark relative overflow-y-auto scrollbar-hide pb-24">
      <div className="sticky top-0 z-50 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-gray-200 dark:border-gray-800">
        <div 
          onClick={() => onNavigate(Page.Library)}
          className="flex size-10 shrink-0 items-center justify-center cursor-pointer rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        >
          <span className="material-symbols-outlined text-[#151514] dark:text-white" style={{ fontSize: '24px' }}>arrow_back</span>
        </div>
        <h2 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center text-[#151514] dark:text-white">Perfil</h2>
        <div 
          onClick={() => onNavigate(Page.Settings)}
          className="flex size-10 items-center justify-center cursor-pointer rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        >
          <span className="material-symbols-outlined text-[#151514] dark:text-white" style={{ fontSize: '24px' }}>settings</span>
        </div>
      </div>

      <div className="flex flex-col items-center pt-6 pb-2 px-4">
        <div className="relative group cursor-pointer">
          <div 
            className="bg-center bg-no-repeat bg-cover rounded-full h-28 w-28 border-4 border-white dark:border-[#232522] shadow-lg"
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB2lYZS2SFJY0iTZfC0aLdcmSEGh7dNYYHvyQHE-8e9zuvNNT3rWnJgUEK2dQNx_l1dTGnXBnXtPbbwNRbOuzMAAYyEZcbrg73p8Jbe-ZNBTevIJ6OOgEU42JDdmF7Y_sfbPtzEJOiS32mrKizw8JdrJZ29UkLQ4TacAUOCQooC6su5Tav_kCv8M20pvVyyeUiKatGIAar9yz27Ps2BqwQFiHXWJ2bQmbfBYgbQtnuNWvETZbc6PyFRb8ZcfWsIsAfMx7F9EMJHq40")' }}
          ></div>
          <div className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-1.5 border-2 border-background-light dark:border-background-dark flex items-center justify-center shadow-sm">
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>edit</span>
          </div>
        </div>
        <div className="mt-4 flex flex-col items-center text-center">
          <h1 className="text-2xl font-bold leading-tight tracking-tight text-[#151514] dark:text-white">{MOCK_USER.name}</h1>
          <p className="text-primary font-medium text-sm mt-1">Leitor Nível {MOCK_USER.level}</p>
          <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">Membro desde {MOCK_USER.memberSince}</p>
        </div>
        <div className="mt-6 w-full max-w-[200px]">
          <button className="w-full flex cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-wide hover:bg-primary/90 transition shadow-sm hover:shadow-md">
            Editar Perfil
          </button>
        </div>
      </div>

      <div className="px-4 py-6">
        <h3 className="text-[#151514] dark:text-white text-lg font-bold leading-tight mb-4 ml-1">Visão Geral</h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-col gap-2 rounded-xl p-4 bg-surface-light dark:bg-surface-dark shadow-sm border border-gray-100 dark:border-gray-800 items-center text-center">
            <div className="p-2 rounded-full bg-primary/10 text-primary mb-1">
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>menu_book</span>
            </div>
            <div>
              <p className="text-2xl font-bold leading-tight text-[#151514] dark:text-white">{MOCK_USER.stats.booksRead}</p>
              <p className="text-gray-500 dark:text-gray-400 text-xs font-medium">Livros Lidos</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 rounded-xl p-4 bg-surface-light dark:bg-surface-dark shadow-sm border border-gray-100 dark:border-gray-800 items-center text-center">
            <div className="p-2 rounded-full bg-primary/10 text-primary mb-1">
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>timer</span>
            </div>
            <div>
              <p className="text-2xl font-bold leading-tight text-[#151514] dark:text-white">{MOCK_USER.stats.readTimeHours}h</p>
              <p className="text-gray-500 dark:text-gray-400 text-xs font-medium">Tempo Total</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 rounded-xl p-4 bg-surface-light dark:bg-surface-dark shadow-sm border border-gray-100 dark:border-gray-800 items-center text-center">
            <div className="p-2 rounded-full bg-primary/10 text-primary mb-1">
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>local_fire_department</span>
            </div>
            <div>
              <p className="text-2xl font-bold leading-tight text-[#151514] dark:text-white">{MOCK_USER.stats.streakDays}</p>
              <p className="text-gray-500 dark:text-gray-400 text-xs font-medium">Sequência</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 pb-2">
        <div className="bg-surface-light dark:bg-surface-dark rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800">
          <button className="w-full flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
            <div className="flex items-center gap-3 text-left">
              <div className="size-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>target</span>
              </div>
              <span className="text-sm font-medium text-[#151514] dark:text-white">Metas de Leitura</span>
            </div>
            <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors" style={{ fontSize: '20px' }}>chevron_right</span>
          </button>
          <button className="w-full flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
            <div className="flex items-center gap-3 text-left">
              <div className="size-8 rounded-lg bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 flex items-center justify-center">
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>rate_review</span>
              </div>
              <span className="text-sm font-medium text-[#151514] dark:text-white">Minhas Avaliações</span>
            </div>
            <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors" style={{ fontSize: '20px' }}>chevron_right</span>
          </button>
          <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
            <div className="flex items-center gap-3 text-left">
              <div className="size-8 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>favorite</span>
              </div>
              <span className="text-sm font-medium text-[#151514] dark:text-white">Lista de Desejos</span>
            </div>
            <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors" style={{ fontSize: '20px' }}>chevron_right</span>
          </button>
        </div>
      </div>

      <div className="px-4 pt-4 pb-6">
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-[#151514] dark:text-white text-lg font-bold leading-tight">Atividade Recente</h3>
          <button className="text-primary text-sm font-medium hover:underline">Ver Tudo</button>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex gap-4 p-4 rounded-xl bg-surface-light dark:bg-surface-dark border border-gray-100 dark:border-gray-800 shadow-sm items-center">
            <div 
              className="bg-center bg-no-repeat bg-cover rounded w-10 h-14 shrink-0 shadow-sm"
              style={{ backgroundImage: 'url("https://picsum.photos/seed/alchemist/200/300")' }}
            ></div>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-sm font-medium text-[#151514] dark:text-white truncate">Terminou "O Alquimista"</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Livro de Paulo Coelho</p>
              <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1 uppercase font-bold tracking-wider">Há 2 horas</p>
            </div>
            <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-full text-green-600 dark:text-green-400">
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>check_circle</span>
            </div>
          </div>
          <div className="flex gap-4 p-4 rounded-xl bg-surface-light dark:bg-surface-dark border border-gray-100 dark:border-gray-800 shadow-sm items-center">
            <div 
              className="bg-center bg-no-repeat bg-cover rounded w-10 h-14 shrink-0 shadow-sm"
              style={{ backgroundImage: 'url("https://picsum.photos/seed/sapiens/200/300")' }}
            ></div>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-sm font-medium text-[#151514] dark:text-white truncate">Destacou em "Sapiens"</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Capítulo 4: O Dilúvio</p>
              <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1 uppercase font-bold tracking-wider">Ontem</p>
            </div>
            <div className="p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-full text-yellow-600 dark:text-yellow-400">
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>edit_note</span>
            </div>
          </div>
        </div>
      </div>

      <BottomNav currentPage={Page.Profile} onNavigate={onNavigate} />
    </div>
  );
};

export default Profile;
