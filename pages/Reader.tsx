
import React, { useState, useEffect, useRef } from 'react';
import { Page, Annotation, Book } from '../types';
import { MOCK_BOOKS } from '../constants';
import { getBookFile } from '../services/storageService';

interface ReaderProps {
  onNavigate: (page: Page) => void;
  bookId: string;
}

const Reader: React.FC<ReaderProps> = ({ onNavigate, bookId }) => {
  const [currentBook, setCurrentBook] = useState<Book | null>(null);
  const [theme, setTheme] = useState<'claro' | 'sepia' | 'escuro'>('sepia');
  const [fontSize, setFontSize] = useState(18);
  const [showUI, setShowUI] = useState(true);
  const [isReadingFile, setIsReadingFile] = useState(false);
  const [pdfNumPages, setPdfNumPages] = useState(0);
  const [pdfCurrentPage, setPdfCurrentPage] = useState(1);
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [selectionToolbar, setSelectionToolbar] = useState<{ x: number, y: number, text: string } | null>(null);

  const renditionRef = useRef<any>(null);
  const pdfContainerRef = useRef<HTMLDivElement>(null);
  const pdfDocRef = useRef<any>(null);

  useEffect(() => {
    const loadBook = async () => {
      const savedBooks = JSON.parse(localStorage.getItem('user_books') || '[]');
      const allBooks = [...savedBooks, ...MOCK_BOOKS];
      const found = allBooks.find(b => b.id === bookId) || MOCK_BOOKS[0];
      setCurrentBook(found);

      const savedAnns = localStorage.getItem(`annotations_${bookId}`);
      if (savedAnns) setAnnotations(JSON.parse(savedAnns));

      const fileBlob = await getBookFile(bookId);
      if (fileBlob) {
        setIsReadingFile(true);
        if (found.fileType === 'pdf') {
          renderPDF(fileBlob);
        } else if (found.fileType === 'epub') {
          processEPUB(fileBlob);
        }
      }
    };
    loadBook();
  }, [bookId]);

  useEffect(() => {
    localStorage.setItem(`annotations_${bookId}`, JSON.stringify(annotations));
  }, [annotations, bookId]);

  // Gerenciador de Seleção Estilo Kindle
  useEffect(() => {
    const handleMouseUp = () => {
      setTimeout(() => {
        const selection = window.getSelection();
        if (selection && selection.toString().trim().length > 0) {
          try {
            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();
            setSelectionToolbar({
              x: rect.left + rect.width / 2,
              y: rect.top - 55,
              text: selection.toString().trim()
            });
          } catch (e) {
            setSelectionToolbar(null);
          }
        } else {
          setSelectionToolbar(null);
        }
      }, 50);
    };

    document.addEventListener('mouseup', handleMouseUp);
    return () => document.removeEventListener('mouseup', handleMouseUp);
  }, []);

  const handleHighlight = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectionToolbar || !currentBook) return;

    const newAnnotation: Annotation = {
      id: Math.random().toString(36).substr(2, 9),
      text: selectionToolbar.text,
      color: '#5E6A4B',
      timestamp: Date.now(),
      bookId: currentBook.id
    };

    setAnnotations([...annotations, newAnnotation]);
    window.getSelection()?.removeAllRanges();
    setSelectionToolbar(null);
  };

  const renderPDF = async (blob: Blob) => {
    try {
      const pdfjsLib = (window as any).pdfjsLib;
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      
      const arrayBuffer = await blob.arrayBuffer();
      const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
      pdfDocRef.current = pdf;
      setPdfNumPages(pdf.numPages);
      renderPdfPage(1);
    } catch (err) {
      console.error("Erro PDF:", err);
    }
  };

  const renderPdfPage = async (num: number) => {
    if (!pdfDocRef.current || !pdfContainerRef.current) return;
    
    const page = await pdfDocRef.current.getPage(num);
    const containerWidth = pdfContainerRef.current.clientWidth - 40;
    const initialViewport = page.getViewport({ scale: 1 });
    const scale = containerWidth / initialViewport.width;
    const viewport = page.getViewport({ scale: scale * 1.6 }); // Qualidade superior
    
    pdfContainerRef.current.innerHTML = '';
    
    const pageWrapper = document.createElement('div');
    pageWrapper.className = 'relative shadow-xl bg-white mb-10 mx-auto transition-opacity duration-500';
    pageWrapper.style.width = `${viewport.width}px`;
    pageWrapper.style.height = `${viewport.height}px`;
    
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    canvas.className = 'absolute top-0 left-0 w-full h-full pointer-events-none z-0';

    const textLayerDiv = document.createElement('div');
    textLayerDiv.className = 'textLayer absolute top-0 left-0 w-full h-full z-10';
    textLayerDiv.style.setProperty('--scale-factor', viewport.scale.toString());

    pageWrapper.appendChild(canvas);
    pageWrapper.appendChild(textLayerDiv);
    pdfContainerRef.current.appendChild(pageWrapper);

    const renderContext = { canvasContext: context, viewport: viewport };
    await page.render(renderContext).promise;

    const textContent = await page.getTextContent();
    textContent.items.forEach((item: any) => {
      const tx = (window as any).pdfjsLib.Util.transform(viewport.transform, item.transform);
      const fontHeight = Math.sqrt(tx[2] * tx[2] + tx[3] * tx[3]);
      const span = document.createElement('span');
      span.textContent = item.str;
      span.style.fontFamily = item.fontName;
      span.style.fontSize = `${fontHeight}px`;
      span.style.left = `${tx[4]}px`;
      span.style.top = `${tx[5] - fontHeight}px`;
      span.style.position = 'absolute';
      span.style.whiteSpace = 'pre';
      span.style.color = 'transparent';
      textLayerDiv.appendChild(span);
    });

    setPdfCurrentPage(num);
  };

  const processEPUB = async (blob: Blob) => {
    try {
      const ePub = (window as any).ePub;
      const book = ePub(blob);
      const rendition = book.renderTo("epub-viewer", { width: "100%", height: "100%", flow: "scrolled-doc" });
      renditionRef.current = rendition;
      await rendition.display();
      updateEpubStyles(rendition, theme);
    } catch (err) { console.error("Erro EPUB:", err); }
  };

  const updateEpubStyles = (rendition: any, currentTheme: string) => {
    if (!rendition) return;
    const styles: any = {
      claro: { body: { color: '#151514', background: '#F8F7F3' } },
      sepia: { body: { color: '#3C3C3C', background: '#F4F1EA' } },
      escuro: { body: { color: '#B0B0B0', background: '#121212' } }
    };
    const active = styles[currentTheme as keyof typeof styles];
    rendition.getContents().forEach((content: any) => {
      content.setStyle("color", active.body.color);
      content.setStyle("background", active.body.background);
      content.setStyle("font-family", "Lora, serif");
      content.setStyle("font-size", `${fontSize}px`);
    });
  };

  useEffect(() => { if (renditionRef.current) updateEpubStyles(renditionRef.current, theme); }, [theme, fontSize]);

  const getThemeClass = () => {
    switch (theme) {
      case 'sepia': return 'bg-[#F4F1EA] text-[#3C3C3C]';
      case 'escuro': return 'bg-[#121212] text-[#B0B0B0]';
      default: return 'bg-[#F8F7F3] text-[#151514]';
    }
  };

  if (!currentBook) return null;

  return (
    <div className={`flex flex-col h-full relative overflow-hidden ${getThemeClass()} transition-colors duration-500 font-serif`}>
      {/* Botão Flutuante 'Grifar' */}
      {selectionToolbar && (
        <div 
          className="fixed z-[1000] animate-slide-up pointer-events-auto"
          style={{ left: `${selectionToolbar.x}px`, top: `${selectionToolbar.y}px`, transform: 'translateX(-50%)' }}
        >
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={handleHighlight}
            className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full shadow-2xl active:scale-90 transition-transform font-bold text-sm"
          >
            <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>draw</span>
            Grifar
          </button>
          <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-primary mx-auto"></div>
        </div>
      )}

      {/* Barra Superior */}
      <div className={`absolute top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 pt-12 pb-5 bg-inherit/95 backdrop-blur-xl border-b border-black/5 transition-all duration-500 ${showUI ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <button onClick={() => onNavigate(Page.Library)} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/5 transition-colors">
          <span className="material-symbols-outlined">close</span>
        </button>
        <div className="flex flex-col items-center text-center px-4 max-w-[60%]">
          <h2 className="text-[11px] font-black opacity-40 uppercase tracking-[0.2em] truncate w-full mb-1">{currentBook.title}</h2>
          <div className="h-[2px] w-8 bg-primary/20 rounded-full"></div>
        </div>
        <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/5 transition-colors">
          <span className="material-symbols-outlined">bookmarks</span>
        </button>
      </div>

      {/* Conteúdo */}
      <div className="flex-1 overflow-hidden relative" onClick={() => setShowUI(!showUI)}>
        {currentBook.fileType === 'epub' ? (
          <div id="epub-viewer" className="h-full w-full"></div>
        ) : currentBook.fileType === 'pdf' ? (
          <div className="h-full w-full overflow-y-auto pt-28 pb-40 px-4 no-scrollbar flex flex-col items-center">
            <div ref={pdfContainerRef} className="w-full max-w-4xl flex flex-col items-center">
              {!isReadingFile && (
                <div className="flex flex-col items-center gap-4 py-40 text-text-muted">
                  <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                  <span className="text-[10px] font-bold uppercase tracking-widest">Carregando PDF original...</span>
                </div>
              )}
            </div>
            
            {/* Navegação Flutuante Kindle */}
            <div className={`fixed bottom-32 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-1 bg-white/95 dark:bg-black/80 backdrop-blur-2xl px-2 py-2 rounded-full shadow-2xl border border-black/5 transition-all duration-500 ${showUI ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-90'}`}>
              <button disabled={pdfCurrentPage <= 1} onClick={(e) => { e.stopPropagation(); renderPdfPage(pdfCurrentPage - 1); }} className="size-11 rounded-full flex items-center justify-center hover:bg-black/5 disabled:opacity-20 transition-all active:scale-90">
                <span className="material-symbols-outlined text-2xl">chevron_left</span>
              </button>
              <div className="px-4 py-1 flex flex-col items-center min-w-[90px]">
                <span className="text-[9px] font-black opacity-40 uppercase tracking-widest">Página</span>
                <span className="text-sm font-black leading-none">{pdfCurrentPage} <span className="opacity-20 mx-1">/</span> {pdfNumPages}</span>
              </div>
              <button disabled={pdfCurrentPage >= pdfNumPages} onClick={(e) => { e.stopPropagation(); renderPdfPage(pdfCurrentPage + 1); }} className="size-11 rounded-full flex items-center justify-center hover:bg-black/5 disabled:opacity-20 transition-all active:scale-90">
                <span className="material-symbols-outlined text-2xl">chevron_right</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="h-full w-full overflow-y-auto pt-32 pb-40 px-8 text-center">
             <div className="max-w-prose mx-auto">
                <h1 className="text-3xl font-bold mb-10">{currentBook.title}</h1>
                <p className="text-lg opacity-60">Suba seu PDF para visualizar o layout original exatamente como foi criado.</p>
             </div>
          </div>
        )}
      </div>

      {/* Rodapé de Configurações */}
      <div className={`absolute bottom-0 left-0 right-0 z-[100] bg-inherit/95 backdrop-blur-xl border-t border-black/5 transition-all duration-500 transform ${showUI ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
        <div className="px-8 py-8">
          <div className="flex items-center gap-8 mb-8">
            <button onClick={(e) => { e.stopPropagation(); setFontSize(Math.max(12, fontSize - 2)); }} className="size-12 rounded-2xl bg-black/5 flex items-center justify-center font-medium text-sm transition-colors hover:bg-black/10">Aa</button>
            <div className="flex-1 h-[3px] bg-black/10 rounded-full overflow-hidden relative">
               <div className="absolute inset-y-0 left-0 bg-primary transition-all duration-700" style={{ width: `${(pdfCurrentPage / pdfNumPages) * 100}%` }}></div>
            </div>
            <button onClick={(e) => { e.stopPropagation(); setFontSize(Math.min(32, fontSize + 2)); }} className="size-12 rounded-2xl bg-black/5 flex items-center justify-center font-bold text-lg transition-colors hover:bg-black/10">Aa</button>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex gap-5">
              {['claro', 'sepia', 'escuro'].map(t => (
                <button key={t} onClick={(e) => { e.stopPropagation(); setTheme(t as any); }} className={`size-10 rounded-full border-4 shadow-sm transition-all duration-300 ${t === 'claro' ? 'bg-white' : t === 'sepia' ? 'bg-[#F4F1EA]' : 'bg-[#121212]'} ${theme === t ? 'scale-110 ring-2 ring-primary ring-offset-2' : 'scale-100 opacity-60'}`}></button>
              ))}
            </div>
            <div className="flex flex-col items-end opacity-40">
              <span className="text-[9px] font-black uppercase tracking-[0.25em]">Motor de Leitura</span>
              <span className="text-[10px] font-bold">LION READER V2.4</span>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .textLayer { position: absolute; left: 0; top: 0; right: 0; bottom: 0; overflow: hidden; opacity: 1; pointer-events: auto; }
        .textLayer > span { color: transparent; position: absolute; white-space: pre; cursor: text; transform-origin: 0% 0%; }
        .textLayer ::selection { background: rgba(94, 106, 75, 0.3); }
      `}</style>
    </div>
  );
};

export default Reader;
