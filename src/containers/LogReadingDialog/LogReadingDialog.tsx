import { useState } from 'react';
import {
  Button,
  Dialog,
  Field,
  Input,
  NativeSelect,
  Text,
} from '@chakra-ui/react';
import type { Book } from '@/types/book';
import { logReading } from '@/store/store-books';

type Props = {
  book: Book | null;
  onClose: () => void;
};

type InputMode = 'pages' | 'currentPage';

const getTodayString = () => new Date().toISOString().split('T')[0];

export const LogReadingDialog = ({ book, onClose }: Props) => {
  const [inputMode, setInputMode] = useState<InputMode>('pages');
  const [value, setValue] = useState('');
  const [date, setDate] = useState(getTodayString);

  const remaining = book ? book.totalPages - book.currentPage : 0;

  const computedPages =
    inputMode === 'currentPage' && book
      ? Number(value) - book.currentPage
      : Number(value);

  const isValid =
    book !== null &&
    date !== '' &&
    value !== '' &&
    computedPages > 0 &&
    computedPages <= remaining;

  const handleSubmit = () => {
    if (!isValid || !book) return;
    logReading(book.id, computedPages, date);
    setValue('');
    setDate(getTodayString());
    setInputMode('pages');
    onClose();
  };

  const handleClose = () => {
    setValue('');
    setDate(getTodayString());
    setInputMode('pages');
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
              <Field.Label>Дата</Field.Label>
              <Input
                type="date"
                value={date}
                max={getTodayString()}
                onChange={(e) => setDate(e.target.value)}
              />
            </Field.Root>
            <Field.Root>
              <Field.Label>Режим ввода</Field.Label>
              <NativeSelect.Root>
                <NativeSelect.Field
                  value={inputMode}
                  onChange={(e) => {
                    setInputMode(e.target.value as InputMode);
                    setValue('');
                  }}
                >
                  <option value="pages">Прочитано страниц</option>
                  <option value="currentPage">Остановился на странице</option>
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
            </Field.Root>
            {inputMode === 'pages' ? (
              <Field.Root required>
                <Field.Label>Прочитано страниц</Field.Label>
                <Input
                  type="number"
                  placeholder="Количество страниц"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </Field.Root>
            ) : (
              <Field.Root required>
                <Field.Label>Текущая страница</Field.Label>
                <Input
                  type="number"
                  placeholder={
                    book ? String(book.currentPage + 1) : 'Номер страницы'
                  }
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
                {value !== '' && computedPages > 0 && (
                  <Text textStyle="xs" color="gray.500" mt="1">
                    = {computedPages} стр. прочитано
                  </Text>
                )}
              </Field.Root>
            )}
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
