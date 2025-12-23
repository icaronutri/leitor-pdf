
import React, { useState, useEffect } from 'react';
import { Page } from './types';
import Login from './pages/Login';
import Library from './pages/Library';
import Reader from './pages/Reader';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import AudioBook from './pages/AudioBook';
import Stats from './pages/Stats';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Login);
  const [selectedBookId, setSelectedBookId] = useState<string>('1');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').split('?')[0];
      if (Object.values(Page).includes(hash as Page)) {
        setCurrentPage(hash as Page);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (page: Page, bookId?: string) => {
    if (bookId) setSelectedBookId(bookId);
    window.location.hash = `#/${page}`;
    setCurrentPage(page);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate(Page.Library);
  };

  const renderPage = () => {
    switch (currentPage) {
      case Page.Login:
        return <Login onLogin={handleLogin} />;
      case Page.Library:
        return <Library onNavigate={navigate} />;
      case Page.Reader:
        return <Reader onNavigate={navigate} bookId={selectedBookId} />;
      case Page.Settings:
        return <Settings onNavigate={navigate} />;
      case Page.Profile:
        return <Profile onNavigate={navigate} />;
      case Page.AudioBook:
        return <AudioBook onNavigate={navigate} />;
      case Page.Stats:
        return <Stats onNavigate={navigate} />;
      default:
        return <Login onLogin={handleLogin} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 dark:bg-zinc-900 flex justify-center selection:bg-primary/30 antialiased font-display">
      <div className="relative w-full max-w-md h-screen bg-background-light dark:bg-background-dark shadow-2xl overflow-hidden border-x border-black/5 flex flex-col">
        {renderPage()}
        <div className="fixed inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply z-[99] bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] w-full h-full"></div>
      </div>
    </div>
  );
};

export default App;
