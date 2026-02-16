import {
  Box,
  Button,
  Card,
  Container,
  Progress,
  Text,
} from '@chakra-ui/react';
import type { Book } from '@/types/book';
import { useBookStats } from '@/store/store-books';

type Props = {
  book: Book;
  onEdit: (book: Book) => void;
  onDelete: (book: Book) => void;
  onLogReading: (book: Book) => void;
};

export const BookCard = ({ book, onEdit, onDelete, onLogReading }: Props) => {
  const { name, totalPages, currentPage } = book;
  const stats = useBookStats(book.id);
  const todayCount = stats?.todayCount ?? 0;
  const percent = stats?.percentComplete.toFixed(2).replace('.', ',') ?? '0';

  return (
    <Card.Root width="370px" mt={'8'}>
      <Card.Body>
        <Text textStyle="2xl" fontWeight="medium" letterSpacing="wide">
          {name}
        </Text>
        <Progress.Root
          value={currentPage}
          max={totalPages}
          mt="3"
          size="sm"
        >
          <Progress.Track>
            <Progress.Range />
          </Progress.Track>
        </Progress.Root>
        <Container
          display="flex"
          flexDirection="row"
          justifyContent={'space-between'}
          padding={'0'}
          mt="2"
        >
          <Box flexDirection="column" display="flex" gap="1">
            <Text
              textStyle="sm"
              color={'gray.600'}
              fontWeight="medium"
              letterSpacing="wide"
            >
              {totalPages} стр.
            </Text>
            <Text
              textStyle="sm"
              color={'gray.600'}
              fontWeight="medium"
              letterSpacing="wide"
            >
              {currentPage - todayCount} стр. → {currentPage} стр.
            </Text>
          </Box>
          <Box
            flexDirection="column"
            alignItems={'flex-end'}
            display="flex"
            gap="1"
          >
            <Text
              textStyle="sm"
              color={'gray.600'}
              fontWeight="medium"
              letterSpacing="wide"
            >
              {currentPage} стр.
            </Text>
            <Text
              textStyle="sm"
              color={'green.700'}
              fontWeight="medium"
              letterSpacing="wide"
            >
              + {percent}%
            </Text>
          </Box>
        </Container>
        <Box mt="2">
          <Text textStyle="xs" color="gray.500">
            Средняя скорость: {stats?.avgPagesPerDay ?? 0} стр./день
          </Text>
          {stats?.estimatedCompletionDate && (
            <Text textStyle="xs" color="gray.500">
              Примерная дата окончания: {stats.estimatedCompletionDate}
            </Text>
          )}
        </Box>
      </Card.Body>
      <Card.Footer justifyContent="flex-end" gap="2">
        <Button
          size="sm"
          variant="solid"
          colorPalette="green"
          onClick={() => onLogReading(book)}
        >
          Записать
        </Button>
        <Button size="sm" variant="outline" onClick={() => onEdit(book)}>
          Редактировать
        </Button>
        <Button
          size="sm"
          variant="outline"
          colorPalette="red"
          onClick={() => onDelete(book)}
        >
          Удалить
        </Button>
      </Card.Footer>
    </Card.Root>
  );
};
