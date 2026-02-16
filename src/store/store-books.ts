import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useShallow } from 'zustand/react/shallow';
import type { Book } from '@/types/book';

type BooksState = {
  books: Book[];
  period: 'today' | 'allTime';
};

const getTodayDateString = (): string =>
  new Date().toISOString().split('T')[0];

const getTodayCount = (book: Book): number =>
  book.readingLog
    .filter((entry) => entry.date === getTodayDateString())
    .reduce((sum, entry) => sum + entry.pagesRead, 0);

export const useBooksStore = create<BooksState>()(
  persist(
    () => ({
      books: [
        {
          id: '550e8400-e29b-41d4-a716-446655440001',
          name: 'Ulysses',
          totalPages: 3500,
          currentPage: 32,
          readingLog: [
            { date: '2021-06-01', pagesRead: 29 },
            { date: '2021-06-02', pagesRead: 3 },
          ],
          date: '2021-06-01',
        },
        {
          id: '550e8400-e29b-41d4-a716-446655440002',
          name: 'Братья Карамазовы',
          totalPages: 2500,
          currentPage: 122,
          readingLog: [
            { date: '2021-06-01', pagesRead: 117 },
            { date: '2021-06-02', pagesRead: 5 },
          ],
          date: '2021-06-01',
        },
      ],
      period: 'today',
    }),
    {
      name: 'book-stonks-storage',
      version: 1,
    }
  )
);

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
        (sum, b) => sum + getTodayCount(b),
        0,
      );
      const totalPages = state.books.reduce(
        (sum, b) => sum + b.totalPages,
        0,
      );
      const totalBooks = state.books.length;
      return {
        totalRead,
        todayRead,
        totalPages,
        totalBooks,
        period: state.period,
      };
    }),
  );

export const useBookStats = (bookId: string) =>
  useBooksStore(
    useShallow((state) => {
      const book = state.books.find((b) => b.id === bookId);
      if (!book) return null;

      const todayCount = getTodayCount(book);
      const totalLoggedPages = book.readingLog.reduce(
        (sum, e) => sum + e.pagesRead,
        0,
      );
      const uniqueDays = new Set(book.readingLog.map((e) => e.date)).size;
      const avgPagesPerDay =
        uniqueDays > 0 ? Math.round(totalLoggedPages / uniqueDays) : 0;

      const remainingPages = book.totalPages - book.currentPage;
      const estimatedDaysLeft =
        avgPagesPerDay > 0 ? Math.ceil(remainingPages / avgPagesPerDay) : null;

      let estimatedCompletionDate: string | null = null;
      if (estimatedDaysLeft !== null) {
        const d = new Date();
        d.setDate(d.getDate() + estimatedDaysLeft);
        estimatedCompletionDate = d.toLocaleDateString('ru-RU');
      }

      return {
        todayCount,
        avgPagesPerDay,
        estimatedDaysLeft,
        estimatedCompletionDate,
        percentComplete: (book.currentPage / book.totalPages) * 100,
      };
    }),
  );

export const addBook = (book: Omit<Book, 'id' | 'readingLog' | 'date'>) => {
  const newBook: Book = {
    ...book,
    id: crypto.randomUUID(),
    readingLog: [],
    date: getTodayDateString(),
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

export const logReading = (bookId: string, pagesRead: number) => {
  const { books } = useBooksStore.getState();
  const today = getTodayDateString();
  useBooksStore.setState({
    books: books.map((b) => {
      if (b.id !== bookId) return b;
      const newCurrentPage = Math.min(b.currentPage + pagesRead, b.totalPages);
      return {
        ...b,
        currentPage: newCurrentPage,
        readingLog: [...b.readingLog, { date: today, pagesRead }],
      };
    }),
  });
};

export const togglePeriod = () => {
  const { period } = useBooksStore.getState();
  useBooksStore.setState({
    period: period === 'today' ? 'allTime' : 'today',
  });
};
