import { useState, useEffect } from 'react';
import { Button, Dialog, Field, Input } from '@chakra-ui/react';
import type { Book } from '@/types/book';
import { updateBook } from '@/store/store-books';

type Props = {
  book: Book | null;
  onClose: () => void;
};

export const EditBookDialog = ({ book, onClose }: Props) => {
  const [name, setName] = useState('');
  const [totalPages, setTotalPages] = useState('');
  const [currentPage, setCurrentPage] = useState('');

  useEffect(() => {
    if (book) {
      setName(book.name);
      setTotalPages(String(book.totalPages));
      setCurrentPage(String(book.currentPage));
    }
  }, [book]);

  const handleSubmit = () => {
    if (!book) return;
    const pages = Number(totalPages);
    const current = Number(currentPage);
    if (!name.trim() || pages <= 0 || current < 0 || current > pages) return;
    updateBook(book.id, {
      name: name.trim(),
      totalPages: pages,
      currentPage: current,
    });
    onClose();
  };

  return (
    <Dialog.Root
      open={book !== null}
      onOpenChange={(details) => {
        if (!details.open) onClose();
      }}
    >
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content
          maxWidth={{ base: 'calc(100vw - 32px)', sm: 'md' }}
          margin={{ base: 4, sm: 'auto' }}
        >
          <Dialog.Header>
            <Dialog.Title fontSize={{ base: 'lg', md: 'xl' }}>
              Редактировать книгу
            </Dialog.Title>
          </Dialog.Header>
          <Dialog.Body
            display="flex"
            flexDirection="column"
            gap={{ base: 3, md: 4 }}
            fontSize={{ base: 'sm', md: 'md' }}
          >
            <Field.Root required>
              <Field.Label>Название</Field.Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Field.Root>
            <Field.Root required>
              <Field.Label>Всего страниц</Field.Label>
              <Input
                type="number"
                value={totalPages}
                onChange={(e) => setTotalPages(e.target.value)}
              />
            </Field.Root>
            <Field.Root required>
              <Field.Label>Текущая страница</Field.Label>
              <Input
                type="number"
                value={currentPage}
                onChange={(e) => setCurrentPage(e.target.value)}
              />
            </Field.Root>
          </Dialog.Body>
          <Dialog.Footer
            flexDirection={{ base: 'column', sm: 'row' }}
            gap="2"
          >
            <Button
              variant="outline"
              onClick={onClose}
              width={{ base: '100%', sm: 'auto' }}
            >
              Отмена
            </Button>
            <Button onClick={handleSubmit} width={{ base: '100%', sm: 'auto' }}>
              Сохранить
            </Button>
          </Dialog.Footer>
          <Dialog.CloseTrigger />
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};
