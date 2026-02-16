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
        <Dialog.Content
          maxWidth={{ base: 'calc(100vw - 32px)', sm: 'md' }}
          margin={{ base: 4, sm: 'auto' }}
        >
          <Dialog.Header>
            <Dialog.Title fontSize={{ base: 'lg', md: 'xl' }}>
              Удалить книгу
            </Dialog.Title>
          </Dialog.Header>
          <Dialog.Body fontSize={{ base: 'sm', md: 'md' }}>
            <Text>Вы уверены, что хотите удалить «{book?.name}»?</Text>
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
            <Button
              colorPalette="red"
              onClick={handleDelete}
              width={{ base: '100%', sm: 'auto' }}
            >
              Удалить
            </Button>
          </Dialog.Footer>
          <Dialog.CloseTrigger />
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};
