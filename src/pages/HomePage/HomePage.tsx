import { useState } from 'react';
import {
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
import { LogReadingDialog } from '@/containers/LogReadingDialog/LogReadingDialog';
import type { Book } from '@/types/book';

const HomePage = () => {
  const books = useBooks();
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [deletingBook, setDeletingBook] = useState<Book | null>(null);
  const [loggingBook, setLoggingBook] = useState<Book | null>(null);

  return (
    <>
      <Box
        minHeight={{ base: 'auto', md: '100vh' }}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent={{ base: 'flex-start', md: 'center' }}
        paddingTop={{ base: 4, md: 0 }}
        paddingBottom={{ base: 8, md: 0 }}
        paddingX={{ base: 4, md: 0 }}
      >
        <Heading
          size={{ base: '2xl', sm: '3xl', md: '4xl', lg: '5xl' }}
          textAlign={'center'}
          marginBottom={{ base: 4, md: 0 }}
        >
          Welcome Home Fellow Reader!
        </Heading>
        <BookOverall />
        <Box
          width={{ base: '100%', md: 'm' }}
          maxWidth={{ base: '100%', md: '370px' }}
          bg="gray.50"
          margin={{ base: 4, md: 8 }}
          padding={{ base: 4, md: 8 }}
          borderRadius="md"
          fontSize={{ base: 'sm', md: 'md' }}
          textAlign="center"
        >
          То чувство, когда прочитал пару страниц перед сном...
        </Box>
        <Button
          mt={{ base: 2, md: 4 }}
          onClick={() => setAddDialogOpen(true)}
          width={{ base: '100%', sm: 'auto' }}
          maxWidth={{ base: 'calc(100vw - 32px)', sm: 'none' }}
        >
          Добавить книгу
        </Button>
        <Accordion.Root
          collapsible
          defaultValue={['books']}
          variant={'plain'}
          width={{ base: '100%', md: 'auto' }}
          maxWidth={{ base: '100%', md: 'none' }}
        >
          <Accordion.Item value={'books'}>
            <Accordion.ItemTrigger fontSize={{ base: 'md', md: 'lg' }}>
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
                    onLogReading={setLoggingBook}
                  />
                ))}
              </Accordion.ItemBody>
            </Accordion.ItemContent>
          </Accordion.Item>
        </Accordion.Root>
      </Box>

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
      <LogReadingDialog
        book={loggingBook}
        onClose={() => setLoggingBook(null)}
      />
    </>
  );
};

export default HomePage;
