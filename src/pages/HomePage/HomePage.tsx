import { useState } from 'react';
import {
  AbsoluteCenter,
  Accordion,
  Box,
  Button,
  Heading,
  Span,
} from '@chakra-ui/react';
import { BookOverall } from '@/containers/BookOverall/BookOverall';
import { BookCard } from '@/containers/BookCard/BookCard.tsx';
import { useBooks } from '@/store/store-books';
import { AddBookDialog } from '@/containers/AddBookDialog/AddBookDialog';
import { EditBookDialog } from '@/containers/EditBookDialog/EditBookDialog';
import { DeleteBookDialog } from '@/containers/DeleteBookDialog/DeleteBookDialog';
import type { Book } from '@/types/book';

const HomePage = () => {
  const books = useBooks();
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [deletingBook, setDeletingBook] = useState<Book | null>(null);

  return (
    <>
      <AbsoluteCenter flexDirection="column">
        <Heading size="5xl" textAlign={'center'}>
          Welcome Home Fellow Reader!
        </Heading>
        <BookOverall />
        <Box width={'m'} bg={'whitesmoke'} margin={'8'} padding={'8'}>
          То чувство, когда прочитал пару страниц перед сном...
        </Box>
        <Button mt="4" onClick={() => setAddDialogOpen(true)}>
          Добавить книгу
        </Button>
        <Accordion.Root collapsible defaultValue={['books']} variant={'plain'}>
          <Accordion.Item value={'books'}>
            <Accordion.ItemTrigger>
              <Span flex="1">Книги</Span>
              <Accordion.ItemIndicator />
            </Accordion.ItemTrigger>
            <Accordion.ItemContent>
              <Accordion.ItemBody>
                {books.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    onEdit={setEditingBook}
                    onDelete={setDeletingBook}
                  />
                ))}
              </Accordion.ItemBody>
            </Accordion.ItemContent>
          </Accordion.Item>
        </Accordion.Root>
      </AbsoluteCenter>

      <AddBookDialog
        open={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
      />
      <EditBookDialog
        book={editingBook}
        onClose={() => setEditingBook(null)}
      />
      <DeleteBookDialog
        book={deletingBook}
        onClose={() => setDeletingBook(null)}
      />
    </>
  );
};

export default HomePage;
