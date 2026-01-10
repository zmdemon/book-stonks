import { Box, Card, Container, Text } from '@chakra-ui/react';

type Props = {
  book: {
    name: string;
    totalPages: number;
    currentPage: number;
    todayCount: number;
    date?: string;
  };
};
export const BookCard = (props: Props) => {
  const { name, totalPages, currentPage, todayCount } = props.book;
  const percent = ((todayCount / totalPages) * 100)
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
    </Card.Root>
  );
};
