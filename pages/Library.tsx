
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Page, Book } from '../types';
import { MOCK_BOOKS } from '../constants';
import { BottomNav } from '../components/Layout';
import { saveBookFile } from '../services/storageService';

interface LibraryProps {
  onNavigate: (page: Page, bookId?: string) => void;
}

const Library: React.FC<LibraryProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState<Book[]>(MOCK_BOOKS);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [bookmarksMap, setBookmarksMap] = useState<Record<string, string>>({});

  useEffect(() => {
    const savedBooks = localStorage.getItem('user_books');
    if (savedBooks) {
      setBooks([...JSON.parse(savedBooks), ...MOCK_BOOKS]);
    }

    const bMap: Record<string, string> = {};
    const allBooks = savedBooks ? [...JSON.parse(savedBooks), ...MOCK_BOOKS] : MOCK_BOOKS;
    allBooks.forEach(book => {
      const savedB = localStorage.getItem(`bookmark_${book.id}`);
      if (savedB) bMap[book.id] = savedB;
    });
    setBookmarksMap(bMap);
  }, []);

  const generateCompressedCover = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      canvas.width = 160; canvas.height = 240;
      const ctx = canvas.getContext('2d')!;
      const isPdf = file.name.toLowerCase().endsWith('.pdf');
      const gradient = ctx.createLinearGradient(0, 0, 160, 240);
      gradient.addColorStop(0, isPdf ? '#C0392B' : '#2980B9');
      gradient.addColorStop(1, isPdf ? '#8E1C12' : '#1A5276');
      ctx.fillStyle = gradient; ctx.fillRect(0, 0, 160, 240);
      ctx.fillStyle = 'white'; ctx.font = 'bold 14px Inter'; ctx.textAlign = 'center';
      ctx.fillText(file.name.substring(0, 15), 80, 110);
      ctx.font = 'normal 10px Inter'; ctx.fillText(isPdf ? 'PDF' : 'EPUB', 80, 130);
      resolve(canvas.toDataURL('image/jpeg', 0.5));
    });
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setIsUploading(true); setUploadProgress(20);
    const cover = await generateCompressedCover(file);
    const bookId = Math.random().toString(36).substr(2, 9);
    try {
      await saveBookFile(bookId, file);
      const newBook: Book = {
        id: bookId, title: file.name.replace(/\.[^/.]+$/, ""), author: 'Meu Livro', cover: cover,
        progress: 0, pagesRead: 0, totalPages: 0, isNew: true,
        fileType: file.name.toLowerCase().endsWith('.pdf') ? 'pdf' : 'epub'
      };
      const saved = JSON.parse(localStorage.getItem('user_books') || '[]');
      localStorage.setItem('user_books', JSON.stringify([newBook, ...saved]));
      setBooks([newBook, ...books]);
      setUploadProgress(100);
      setTimeout(() => { setIsUploading(false); onNavigate(Page.Reader, bookId); }, 500);
    } catch (err) { setIsUploading(false); alert('Erro ao subir arquivo.'); }
  };

  const filteredBooks = useMemo(() => books.filter(b => b.title.toLowerCase().includes(searchQuery.toLowerCase())), [searchQuery, books]);

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark relative overflow-y-auto scrollbar-hide">
      {isUploading && (
        <div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-10 text-white">
          <div className="w-16 h-16 border-4 border-white/20 border-t-primary rounded-full animate-spin mb-6"></div>
          <h3 className="text-lg font-bold">Otimizando Leitura</h3>
          <p className="text-white/50 text-xs text-center">Preparando seu arquivo para o modo Kindle...</p>
        </div>
      )}
      <header className="sticky top-0 z-40 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md px-6 py-6 flex items-center justify-between border-b border-black/5 transition-colors">
        <h1 className="text-2xl font-black text-text-main dark:text-white leading-none">Minha Estante</h1>
        <button onClick={() => fileInputRef.current?.click()} className="size-11 rounded-full bg-primary text-white flex items-center justify-center shadow-lg active:scale-90 transition-transform">
          <span className="material-symbols-outlined">add</span>
        </button>
        <input type="file" ref={fileInputRef} className="hidden" accept=".pdf,.epub" onChange={handleFileUpload} />
      </header>
      <div className="px-6 py-5">
        <div className="relative flex items-center w-full h-14 rounded-2xl bg-white dark:bg-surface-dark shadow-sm border border-black/5 overflow-hidden">
          <div className="grid place-items-center w-14 opacity-40"><span className="material-symbols-outlined">search</span></div>
          <input className="h-full w-full outline-none bg-transparent text-sm" placeholder="Buscar em meus livros..." type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
      </div>
      <section className="px-6 pb-32 grid grid-cols-2 gap-x-6 gap-y-10">
        {filteredBooks.map((book) => (
          <div key={book.id} onClick={() => onNavigate(Page.Reader, book.id)} className="flex flex-col group cursor-pointer">
            <div className="relative w-full aspect-[2/3] rounded-3xl shadow-book bg-gray-200 mb-4 overflow-hidden transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2 bg-cover bg-center" style={{ backgroundImage: `url(${book.cover})` }}>
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
            </div>
            <h3 className="text-sm font-black text-text-main dark:text-white leading-tight line-clamp-2">{book.title}</h3>
            <p className="text-[10px] uppercase font-bold text-primary mt-1">{book.author}</p>
          </div>
        ))}
      </section>
      <BottomNav currentPage={Page.Library} onNavigate={onNavigate} />
    </div>
  );
};

export default Library;
