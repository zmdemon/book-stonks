import { AbsoluteCenter, Box, Heading } from '@chakra-ui/react';
import { BookOverall } from '@/containers/BookOverall/BookOverall';

const HomePage = () => {
  return (
    <>
      <AbsoluteCenter flexDirection="column">
        <Heading size="5xl" textAlign={'center'}>Welcome Home Fellow Reader!</Heading>
        <BookOverall />
        <Box width={'m'} bg={'whitesmoke'} margin={'8'} padding={'8'}>
          То чувство, когда прочитал пару страниц перед сном...
        </Box>
      </AbsoluteCenter>
    </>
  );
};

export default HomePage;
