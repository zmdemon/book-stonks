export type ReadingEntry = {
  date: string;
  pagesRead: number;
};

export type Book = {
  id: string;
  name: string;
  totalPages: number;
  currentPage: number;
  readingLog: ReadingEntry[];
  date: string;
};
