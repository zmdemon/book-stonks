import { Box, Card, Text } from '@chakra-ui/react';
import { useMemo, useState } from 'react';

const mockBalance = 325;
const mockIncome = 48;
const mockIncomePercent = ((mockIncome / mockBalance) * 100).toFixed(2);

export const BookOverall = () => {
  const [period, setPeriod] = useState<'today' | 'allTime'>('today');
  const periodText = useMemo(() => {
    let text = 'за всё время';
    if (period === 'today') {
      text = 'за сегодня';
    }
    return text;
  }, [period]);

  const income = useMemo(() => {
    let incomeValue: string = mockIncome.toString();
    let incomePercentValue = mockIncomePercent.toString();
    if (period === 'today') {
      incomeValue = (mockIncome / 30).toFixed(2);
      incomePercentValue = (Number(mockIncomePercent) / 30).toFixed(2);
    }
    return { incomeValue, incomePercentValue };
  }, [period]);
  const incomeText = `${income.incomeValue.replace('.', ',')} стр. (${income.incomePercentValue.replace('.', ',')}) %`;

  return (
    <Card.Root width="370px" mt={'8'}>
      <Card.Body>
        <Text textStyle="2xl" fontWeight="medium" letterSpacing="wide">
          {mockBalance} стр.
        </Text>
        <Box flexDirection="row" display="flex" gap="1" cursor="pointer">
          <Text
            textStyle="sm"
            color={'green.700'}
            fontWeight="medium"
            letterSpacing="wide"
            mt="2"
            onClick={() => {}}
          >
            {incomeText}
          </Text>
          <Text
            textStyle="sm"
            color={'blue.700'}
            fontWeight="medium"
            letterSpacing="wide"
            mt="2"
            onClick={() => {
              setPeriod(period === 'allTime' ? 'today' : 'allTime');
            }}
          >
            {periodText}
          </Text>
        </Box>
      </Card.Body>
    </Card.Root>
  );
};
