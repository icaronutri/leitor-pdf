
import { Book, User, AudioBookItem } from './types';

export const MOCK_USER: User = {
  name: 'Lucas Silva',
  email: 'lucas@exemplo.com',
  level: 5,
  memberSince: '2021',
  stats: {
    booksRead: 42,
    readTimeHours: 124,
    streakDays: 5
  }
};

export const MOCK_BOOKS: Book[] = [
  {
    id: '1',
    title: 'Dom Casmurro',
    author: 'Machado de Assis',
    cover: 'https://picsum.photos/seed/casmurro/200/300',
    progress: 65,
    pagesRead: 120,
    totalPages: 180,
    lastRead: 'há 2h'
  },
  {
    id: '2',
    title: '1984',
    author: 'George Orwell',
    cover: 'https://picsum.photos/seed/1984/200/300',
    progress: 32,
    pagesRead: 102,
    totalPages: 328,
    lastRead: 'ontem'
  },
  {
    id: '3',
    title: 'Design de Dados',
    author: 'R. King',
    cover: 'https://picsum.photos/seed/data/200/300',
    progress: 0,
    pagesRead: 0,
    totalPages: 350,
    isNew: true
  },
  {
    id: '4',
    title: 'A Arte da Guerra',
    author: 'Sun Tzu',
    cover: 'https://picsum.photos/seed/war/200/300',
    progress: 15,
    pagesRead: 20,
    totalPages: 140
  }
];

export const MOCK_AUDIOBOOKS: AudioBookItem[] = [
  {
    id: 'a1',
    title: 'O Poder do Hábito',
    author: 'Charles Duhigg',
    cover: 'https://picsum.photos/seed/habit/200/300',
    duration: '10h 45min',
    timeLeft: '3h 12min restantes',
    progress: 70
  },
  {
    id: 'a2',
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    cover: 'https://picsum.photos/seed/sap/200/300',
    duration: '15h 20min',
    timeLeft: '12h 40min restantes',
    progress: 15
  }
];
