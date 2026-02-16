import { useState } from 'react';
import { Button, Dialog, Field, Input } from '@chakra-ui/react';
import { addBook } from '@/store/store-books';

type Props = {
  open: boolean;
  onClose: () => void;
};

export const AddBookDialog = ({ open, onClose }: Props) => {
  const [name, setName] = useState('');
  const [totalPages, setTotalPages] = useState('');

  const handleSubmit = () => {
    const pages = Number(totalPages);
    if (!name.trim() || pages <= 0) return;
    addBook({ name: name.trim(), totalPages: pages, currentPage: 0 });
    setName('');
    setTotalPages('');
    onClose();
  };

  const handleClose = () => {
    setName('');
    setTotalPages('');
    onClose();
  };

  return (
    <Dialog.Root
      open={open}
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
              Добавить книгу
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
                placeholder="Название книги"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Field.Root>
            <Field.Root required>
              <Field.Label>Всего страниц</Field.Label>
              <Input
                type="number"
                placeholder="Количество страниц"
                value={totalPages}
                onChange={(e) => setTotalPages(e.target.value)}
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
              Добавить
            </Button>
          </Dialog.Footer>
          <Dialog.CloseTrigger />
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};
