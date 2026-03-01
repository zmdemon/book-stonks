import { create } from 'zustand';
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

export const useBooksStore = create<BooksState>(() => ({
  books: [
    {
      id: crypto.randomUUID(),
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
      id: crypto.randomUUID(),
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

type DailyData = { date: string; pagesRead: number };

const getDailyReadingData = (books: Book[], days: number): DailyData[] => {
  const today = new Date();
  const result: DailyData[] = [];

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const pagesRead = books.reduce((sum, book) => {
      return (
        sum +
        book.readingLog
          .filter((e) => e.date === dateStr)
          .reduce((s, e) => s + e.pagesRead, 0)
      );
    }, 0);
    result.push({ date: dateStr, pagesRead });
  }

  return result;
};

const getReadingStreak = (books: Book[]): number => {
  const allDates = new Set<string>();
  for (const book of books) {
    for (const entry of book.readingLog) {
      allDates.add(entry.date);
    }
  }

  let streak = 0;
  const d = new Date();

  // Check if read today; if not, start from yesterday
  const todayStr = d.toISOString().split('T')[0];
  if (!allDates.has(todayStr)) {
    d.setDate(d.getDate() - 1);
  }

  while (true) {
    const dateStr = d.toISOString().split('T')[0];
    if (allDates.has(dateStr)) {
      streak++;
      d.setDate(d.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
};

type HeatmapEntry = { date: string; count: number };

const getHeatmapData = (books: Book[], weeks: number): HeatmapEntry[] => {
  const days = weeks * 7;
  const today = new Date();
  const result: HeatmapEntry[] = [];

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const count = books.reduce((sum, book) => {
      return (
        sum +
        book.readingLog
          .filter((e) => e.date === dateStr)
          .reduce((s, e) => s + e.pagesRead, 0)
      );
    }, 0);
    result.push({ date: dateStr, count });
  }

  return result;
};

export const useAnalytics = (days = 30) =>
  useBooksStore(
    useShallow((state) => {
      const dailyData = getDailyReadingData(state.books, days);
      const streak = getReadingStreak(state.books);
      const heatmap = getHeatmapData(state.books, 12);
      const maxDailyPages = Math.max(...dailyData.map((d) => d.pagesRead), 0);
      return { dailyData, streak, heatmap, maxDailyPages };
    }),
  );
