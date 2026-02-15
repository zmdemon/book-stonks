import { Box, Card, Text } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useOverallStats, togglePeriod } from '@/store/store-books';

export const BookOverall = () => {
  const { totalRead, todayRead, totalPages, period } = useOverallStats();

  const periodText = useMemo(() => {
    return period === 'today' ? 'за сегодня' : 'за всё время';
  }, [period]);

  const incomeText = useMemo(() => {
    const pagesRead = period === 'today' ? todayRead : totalRead;
    const percent =
      totalPages > 0 ? ((pagesRead / totalPages) * 100).toFixed(2) : '0';
    return `${pagesRead} стр. (${percent.replace('.', ',')}%)`;
  }, [period, todayRead, totalRead, totalPages]);

  return (
    <Card.Root width="370px" mt={'8'}>
      <Card.Body>
        <Text textStyle="2xl" fontWeight="medium" letterSpacing="wide">
          {totalRead} стр.
        </Text>
        <Box flexDirection="row" display="flex" gap="1" cursor="pointer">
          <Text
            textStyle="sm"
            color={'green.700'}
            fontWeight="medium"
            letterSpacing="wide"
            mt="2"
          >
            {incomeText}
          </Text>
          <Text
            textStyle="sm"
            color={'blue.700'}
            fontWeight="medium"
            letterSpacing="wide"
            mt="2"
            onClick={togglePeriod}
          >
            {periodText}
          </Text>
        </Box>
      </Card.Body>
    </Card.Root>
  );
};
