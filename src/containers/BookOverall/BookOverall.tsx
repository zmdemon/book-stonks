import { Box, Card, Text } from '@chakra-ui/react';
import { useMemo } from 'react';
import {
  setPeriod,
  useBalanceHook,
} from '@/containers/BookOverall/store-book-overall.ts';

export const BookOverall = () => {
  const { balance, income, percent, period } = useBalanceHook();

  const periodText = useMemo(() => {
    let text = 'за всё время';
    if (period === 'today') {
      text = 'за сегодня';
    }
    return text;
  }, [period]);

  const incomeData = useMemo(() => {
    let incomeValue: string = income.toString();
    let incomePercentValue = percent.toFixed(2).toString();
    if (period === 'today') {
      incomeValue = (income / 30).toFixed(2);
      incomePercentValue = (Number(percent) / 30).toFixed(2);
    }
    return { incomeValue, incomePercentValue };
  }, [period]);

  const incomeText = `${incomeData.incomeValue.replace('.', ',')} стр. (${incomeData.incomePercentValue.replace('.', ',')}) %`;

  return (
    <Card.Root width="370px" mt={'8'}>
      <Card.Body>
        <Text textStyle="2xl" fontWeight="medium" letterSpacing="wide">
          {balance} стр.
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
            onClick={setPeriod}
          >
            {periodText}
          </Text>
        </Box>
      </Card.Body>
    </Card.Root>
  );
};
