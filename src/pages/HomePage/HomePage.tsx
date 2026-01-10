import {
  AbsoluteCenter,
  Accordion,
  Box,
  Heading,
  Span,
} from '@chakra-ui/react';
import { BookOverall } from '@/containers/BookOverall/BookOverall';
import { BookCard } from '@/containers/BookCard/BookCard.tsx';
const mockBooks = [
  {
    name: 'Ulysses',
    totalPages: 3500,
    currentPage: 32,
    date: '2021-06-01',
    todayCount: 3,
  },
  {
    name: 'Братья Карамазовы',
    totalPages: 2500,
    currentPage: 122,
    date: '2021-06-01',
    todayCount: 5,
  },

];
const HomePage = () => {
  return (
    <>
      <AbsoluteCenter flexDirection="column">
        <Heading size="5xl" textAlign={'center'}>
          Welcome Home Fellow Reader!
        </Heading>
        <BookOverall />
        <Box width={'m'} bg={'whitesmoke'} margin={'8'} padding={'8'}>
          То чувство, когда прочитал пару страниц перед сном...
        </Box>
        <Accordion.Root collapsible defaultValue={['books']} variant={'plain'}>
          <Accordion.Item value={'books'}>
            <Accordion.ItemTrigger>
              <Span flex="1">Книги</Span>
              <Accordion.ItemIndicator />
            </Accordion.ItemTrigger>
            <Accordion.ItemContent>
              <Accordion.ItemBody>
                {mockBooks.map((book) => {
                  return <BookCard book={book} />;
                })}
              </Accordion.ItemBody>
            </Accordion.ItemContent>
          </Accordion.Item>
        </Accordion.Root>
      </AbsoluteCenter>
    </>
  );
};

export default HomePage;
