
export interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  progress: number;
  pagesRead: number;
  totalPages: number;
  lastRead?: string;
  isNew?: boolean;
  bookmarkPage?: number;
  fileData?: string; // Conteúdo do arquivo (Base64 ou Blob URL)
  fileType?: 'pdf' | 'epub';
  originalSize?: number;
  compressedSize?: number;
}

export interface Annotation {
  id: string;
  text: string;
  color: string;
  note?: string;
  timestamp: number;
  bookId: string;
}

export interface AudioBookItem {
  id: string;
  title: string;
  author: string;
  cover: string;
  duration: string;
  timeLeft: string;
  progress: number;
}

export enum Page {
  Login = 'login',
  Library = 'library',
  Reader = 'reader',
  Settings = 'settings',
  Profile = 'profile',
  AudioBook = 'audiobook',
  Stats = 'stats'
}

export interface User {
  name: string;
  email: string;
  level: number;
  memberSince: string;
  stats: {
    booksRead: number;
    readTimeHours: number;
    streakDays: number;
  };
}
