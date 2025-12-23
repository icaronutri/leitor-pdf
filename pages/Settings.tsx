
import React from 'react';
import { Page } from '../types';
import { BottomNav } from '../components/Layout';
import { MOCK_USER } from '../constants';

interface SettingsProps {
  onNavigate: (page: Page) => void;
}

const Settings: React.FC<SettingsProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark relative overflow-y-auto scrollbar-hide pb-24">
      <div className="sticky top-0 z-50 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-gray-200 dark:border-gray-800">
        <div 
          onClick={() => onNavigate(Page.Library)}
          className="flex size-10 shrink-0 items-center justify-center cursor-pointer rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        >
          <span className="material-symbols-outlined text-[#151514] dark:text-white" style={{ fontSize: '24px' }}>arrow_back</span>
        </div>
        <h2 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center text-[#151514] dark:text-white">Configurações</h2>
        <div className="size-10 shrink-0"></div>
      </div>

      <div className="flex flex-col gap-6 px-4 py-6">
        <div>
          <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 ml-1">Conta</h3>
          <div className="bg-surface-light dark:bg-surface-dark rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800">
            <button className="w-full flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group text-left">
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-lg bg-gray-50 dark:bg-white/5 text-gray-600 dark:text-gray-300 flex items-center justify-center">
                  <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>mail</span>
                </div>
                <div>
                  <span className="block text-sm font-medium text-[#151514] dark:text-white">E-mail</span>
                  <span className="block text-xs text-gray-400">{MOCK_USER.email}</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors" style={{ fontSize: '20px' }}>chevron_right</span>
            </button>
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group text-left">
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-lg bg-gray-50 dark:bg-white/5 text-gray-600 dark:text-gray-300 flex items-center justify-center">
                  <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>lock</span>
                </div>
                <span className="text-sm font-medium text-[#151514] dark:text-white">Alterar Senha</span>
              </div>
              <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors" style={{ fontSize: '20px' }}>chevron_right</span>
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 ml-1">Preferências de Leitura</h3>
          <div className="bg-surface-light dark:bg-surface-dark rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="w-full flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-lg bg-gray-50 dark:bg-white/5 text-gray-600 dark:text-gray-300 flex items-center justify-center">
                  <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>format_size</span>
                </div>
                <span className="text-sm font-medium text-[#151514] dark:text-white">Tamanho da Fonte Padrão</span>
              </div>
              <div className="flex items-center gap-3 bg-gray-100 dark:bg-white/5 rounded-lg p-1">
                <button className="size-7 flex items-center justify-center rounded bg-white dark:bg-white/10 shadow-sm text-gray-700 dark:text-gray-200">
                  <span className="text-xs font-bold">A</span>
                </button>
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400 w-4 text-center">14</span>
                <button className="size-7 flex items-center justify-center rounded text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                  <span className="text-sm font-bold">A</span>
                </button>
              </div>
            </div>
            <div className="w-full flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-lg bg-gray-50 dark:bg-white/5 text-gray-600 dark:text-gray-300 flex items-center justify-center">
                  <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>format_align_left</span>
                </div>
                <span className="text-sm font-medium text-[#151514] dark:text-white">Alinhamento</span>
              </div>
              <div className="flex bg-gray-100 dark:bg-white/5 rounded-lg p-1">
                <button className="p-1.5 rounded bg-white dark:bg-white/10 shadow-sm text-primary">
                  <span className="material-symbols-outlined text-[18px]">format_align_left</span>
                </button>
                <button className="p-1.5 rounded text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                  <span className="material-symbols-outlined text-[18px]">format_align_justify</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 ml-1">Geral</h3>
          <div className="bg-surface-light dark:bg-surface-dark rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="w-full flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-lg bg-gray-50 dark:bg-white/5 text-gray-600 dark:text-gray-300 flex items-center justify-center">
                  <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>notifications</span>
                </div>
                <span className="text-sm font-medium text-[#151514] dark:text-white">Notificações</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input defaultChecked className="sr-only peer" type="checkbox" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
              </label>
            </div>
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group text-left">
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-lg bg-gray-50 dark:bg-white/5 text-gray-600 dark:text-gray-300 flex items-center justify-center">
                  <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>security</span>
                </div>
                <span className="text-sm font-medium text-[#151514] dark:text-white">Privacidade</span>
              </div>
              <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors" style={{ fontSize: '20px' }}>chevron_right</span>
            </button>
          </div>
        </div>

        <button 
          onClick={() => onNavigate(Page.Login)}
          className="w-full p-4 mt-2 rounded-xl bg-surface-light dark:bg-surface-dark border border-red-100 dark:border-red-900/30 text-red-600 dark:text-red-400 font-bold flex items-center justify-center gap-2 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors shadow-sm"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>logout</span>
          Sair
        </button>

        <div className="text-center pb-4">
          <p className="text-xs text-gray-400 dark:text-gray-600 font-medium">LionReader v2.4.0</p>
        </div>
      </div>

      <BottomNav currentPage={Page.Library} onNavigate={onNavigate} />
    </div>
  );
};

export default Settings;
