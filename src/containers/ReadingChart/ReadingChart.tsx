import { Box, Text } from '@chakra-ui/react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

type DailyData = {
  date: string;
  pagesRead: number;
};

type Props = {
  data: DailyData[];
};

const formatDate = (date: string) => {
  const d = new Date(date + 'T00:00:00');
  return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
};

export const ReadingChart = ({ data }: Props) => {
  return (
    <Box>
      <Text textStyle="lg" fontWeight="medium" mb="3">
        Страниц в день
      </Text>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="date"
            tickFormatter={formatDate}
            tick={{ fontSize: 11 }}
            interval="preserveStartEnd"
          />
          <YAxis tick={{ fontSize: 11 }} width={40} />
          <Tooltip
            labelFormatter={(label) => formatDate(String(label))}
            formatter={(value) => [`${value} стр.`, 'Прочитано']}
          />
          <Bar dataKey="pagesRead" fill="#3182ce" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};
