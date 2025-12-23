
import React from 'react';
import { Page } from '../types';

interface BottomNavProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentPage, onNavigate }) => {
  const items = [
    { id: Page.Library, icon: 'library_books', label: 'Biblioteca' },
    { id: Page.AudioBook, icon: 'headset', label: 'Audio Book' },
    { id: Page.Stats, icon: 'bar_chart', label: 'Estatísticas' },
    { id: Page.Profile, icon: 'person', label: 'Perfil' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 w-full max-w-md mx-auto bg-white/95 dark:bg-surface-dark/95 backdrop-blur-xl border-t border-black/5 dark:border-white/5 pb-6 pt-3 px-6 flex justify-between items-center z-50">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => Object.values(Page).includes(item.id as Page) && onNavigate(item.id as Page)}
          className={`group flex flex-col items-center gap-1 min-w-[64px] transition-all ${
            currentPage === item.id ? 'text-primary' : 'text-text-muted hover:text-text-main'
          }`}
        >
          <span 
            className={`material-symbols-outlined transition-transform group-hover:scale-110 ${currentPage === item.id ? 'fill-[1]' : ''}`}
            style={currentPage === item.id ? { fontVariationSettings: "'FILL' 1" } : {}}
          >
            {item.icon}
          </span>
          <span className={`text-[10px] ${currentPage === item.id ? 'font-semibold' : 'font-medium'}`}>
            {item.label}
          </span>
        </button>
      ))}
    </nav>
  );
};
