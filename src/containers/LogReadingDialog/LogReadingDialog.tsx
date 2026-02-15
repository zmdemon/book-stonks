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
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Записать прочитанное</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body display="flex" flexDirection="column" gap="4">
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
          <Dialog.Footer>
            <Button variant="outline" onClick={handleClose}>
              Отмена
            </Button>
            <Button onClick={handleSubmit}>Записать</Button>
          </Dialog.Footer>
          <Dialog.CloseTrigger />
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};
