import { Button, Dialog, Text } from '@chakra-ui/react';
import type { Book } from '@/types/book';
import { deleteBook } from '@/store/store-books';

type Props = {
  book: Book | null;
  onClose: () => void;
};

export const DeleteBookDialog = ({ book, onClose }: Props) => {
  const handleDelete = () => {
    if (!book) return;
    deleteBook(book.id);
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
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Удалить книгу</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            <Text>Вы уверены, что хотите удалить «{book?.name}»?</Text>
          </Dialog.Body>
          <Dialog.Footer>
            <Button variant="outline" onClick={onClose}>
              Отмена
            </Button>
            <Button colorPalette="red" onClick={handleDelete}>
              Удалить
            </Button>
          </Dialog.Footer>
          <Dialog.CloseTrigger />
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};
