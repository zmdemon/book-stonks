import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
import type { Book } from '@/types/book';

type BooksState = {
  books: Book[];
  period: 'today' | 'allTime';
};

export const useBooksStore = create<BooksState>(() => ({
  books: [
    {
      id: crypto.randomUUID(),
      name: 'Ulysses',
      totalPages: 3500,
      currentPage: 32,
      todayCount: 3,
      date: '2021-06-01',
    },
    {
      id: crypto.randomUUID(),
      name: 'Братья Карамазовы',
      totalPages: 2500,
      currentPage: 122,
      todayCount: 5,
      date: '2021-06-01',
    },
  ],
  period: 'today',
}));

export const useBooks = () =>
  useBooksStore(useShallow((state) => state.books));

export const useOverallStats = () =>
  useBooksStore(
    useShallow((state) => {
      const totalRead = state.books.reduce(
        (sum, b) => sum + b.currentPage,
        0,
      );
      const todayRead = state.books.reduce(
        (sum, b) => sum + b.todayCount,
        0,
      );
      const totalPages = state.books.reduce(
        (sum, b) => sum + b.totalPages,
        0,
      );
      return {
        totalRead,
        todayRead,
        totalPages,
        period: state.period,
      };
    }),
  );

export const addBook = (book: Omit<Book, 'id' | 'todayCount' | 'date'>) => {
  const newBook: Book = {
    ...book,
    id: crypto.randomUUID(),
    todayCount: 0,
    date: new Date().toISOString().split('T')[0],
  };
  const { books } = useBooksStore.getState();
  useBooksStore.setState({ books: [...books, newBook] });
};

export const updateBook = (
  id: string,
  updates: Partial<Pick<Book, 'name' | 'totalPages' | 'currentPage'>>,
) => {
  const { books } = useBooksStore.getState();
  useBooksStore.setState({
    books: books.map((b) => (b.id === id ? { ...b, ...updates } : b)),
  });
};

export const deleteBook = (id: string) => {
  const { books } = useBooksStore.getState();
  useBooksStore.setState({
    books: books.filter((b) => b.id !== id),
  });
};

export const togglePeriod = () => {
  const { period } = useBooksStore.getState();
  useBooksStore.setState({
    period: period === 'today' ? 'allTime' : 'today',
  });
};
