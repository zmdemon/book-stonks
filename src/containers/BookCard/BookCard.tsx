import { Box, Button, Card, Container, Text } from '@chakra-ui/react';
import type { Book } from '@/types/book';

type Props = {
  book: Book;
  onEdit: (book: Book) => void;
  onDelete: (book: Book) => void;
};

export const BookCard = ({ book, onEdit, onDelete }: Props) => {
  const { name, totalPages, currentPage, todayCount } = book;
  const percent = ((currentPage / totalPages) * 100)
    .toFixed(2)
    .replace('.', ',');
  return (
    <Card.Root width="370px" mt={'8'}>
      <Card.Body>
        <Text textStyle="2xl" fontWeight="medium" letterSpacing="wide">
          {name}
        </Text>
        <Container
          display="flex"
          flexDirection="row"
          justifyContent={'space-between'}
          padding={'0'}
        >
          <Box flexDirection="column" display="flex" gap="1" cursor="pointer">
            <Text
              textStyle="sm"
              color={'gray.600'}
              fontWeight="medium"
              letterSpacing="wide"
              mt="2"
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
            cursor="pointer"
          >
            <Text
              textStyle="sm"
              color={'gray.600'}
              fontWeight="medium"
              letterSpacing="wide"
              mt="2"
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
      </Card.Body>
      <Card.Footer justifyContent="flex-end" gap="2">
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
