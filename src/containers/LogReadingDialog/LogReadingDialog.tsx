import { useState } from 'react';
import { Button, Dialog, Field, Input, Text } from '@chakra-ui/react';
import type { Book } from '@/types/book';
import { logReading } from '@/store/store-books';

type Props = {
  book: Book | null;
  onClose: () => void;
};

export const LogReadingDialog = ({ book, onClose }: Props) => {
  const [pagesRead, setPagesRead] = useState('');

  const remaining = book ? book.totalPages - book.currentPage : 0;

  const handleSubmit = () => {
    if (!book) return;
    const pages = Number(pagesRead);
    if (pages <= 0 || pages > remaining) return;
    logReading(book.id, pages);
    setPagesRead('');
    onClose();
  };

  const handleClose = () => {
    setPagesRead('');
    onClose();
  };

  return (
    <Dialog.Root
      open={book !== null}
      onOpenChange={(details) => {
        if (!details.open) handleClose();
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
              Записать прочитанное
            </Dialog.Title>
          </Dialog.Header>
          <Dialog.Body
            display="flex"
            flexDirection="column"
            gap={{ base: 3, md: 4 }}
            fontSize={{ base: 'sm', md: 'md' }}
          >
            <Text>
              {book?.name} — осталось {remaining} стр.
            </Text>
            <Field.Root required>
              <Field.Label>Прочитано страниц</Field.Label>
              <Input
                type="number"
                placeholder="Количество страниц"
                value={pagesRead}
                onChange={(e) => setPagesRead(e.target.value)}
              />
            </Field.Root>
          </Dialog.Body>
          <Dialog.Footer
            flexDirection={{ base: 'column', sm: 'row' }}
            gap="2"
          >
            <Button
              variant="outline"
              onClick={handleClose}
              width={{ base: '100%', sm: 'auto' }}
            >
              Отмена
            </Button>
            <Button onClick={handleSubmit} width={{ base: '100%', sm: 'auto' }}>
              Записать
            </Button>
          </Dialog.Footer>
          <Dialog.CloseTrigger />
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};
