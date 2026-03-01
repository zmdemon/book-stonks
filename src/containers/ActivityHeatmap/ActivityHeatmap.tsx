import { Box, Text } from '@chakra-ui/react';
import './ActivityHeatmap.css';

type HeatmapEntry = {
  date: string;
  count: number;
};

type Props = {
  data: HeatmapEntry[];
  maxCount: number;
};

const getIntensity = (count: number, max: number): string => {
  if (count === 0) return 'heatmap-0';
  if (max === 0) return 'heatmap-0';
  const ratio = count / max;
  if (ratio <= 0.25) return 'heatmap-1';
  if (ratio <= 0.5) return 'heatmap-2';
  if (ratio <= 0.75) return 'heatmap-3';
  return 'heatmap-4';
};

const MONTHS_RU = [
  'Янв',
  'Фев',
  'Мар',
  'Апр',
  'Май',
  'Июн',
  'Июл',
  'Авг',
  'Сен',
  'Окт',
  'Ноя',
  'Дек',
];

const DAYS_RU = ['Пн', '', 'Ср', '', 'Пт', '', ''];

export const ActivityHeatmap = ({ data, maxCount }: Props) => {
  // Group into weeks (columns)
  const weeks: HeatmapEntry[][] = [];
  let currentWeek: HeatmapEntry[] = [];

  for (let i = 0; i < data.length; i++) {
    const d = new Date(data[i].date + 'T00:00:00');
    const dayOfWeek = (d.getDay() + 6) % 7; // Monday = 0

    if (i === 0 && dayOfWeek > 0) {
      // Pad first week with empty cells
      for (let j = 0; j < dayOfWeek; j++) {
        currentWeek.push({ date: '', count: -1 });
      }
    }

    currentWeek.push(data[i]);

    if (dayOfWeek === 6 || i === data.length - 1) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }

  // Compute month labels
  const monthLabels: { label: string; weekIndex: number }[] = [];
  let lastMonth = -1;
  for (let w = 0; w < weeks.length; w++) {
    for (const entry of weeks[w]) {
      if (entry.date) {
        const month = new Date(entry.date + 'T00:00:00').getMonth();
        if (month !== lastMonth) {
          monthLabels.push({ label: MONTHS_RU[month], weekIndex: w });
          lastMonth = month;
        }
        break;
      }
    }
  }

  return (
    <Box>
      <Text textStyle="lg" fontWeight="medium" mb="3">
        Активность чтения
      </Text>
      <Box className="heatmap-container">
        <Box className="heatmap-months">
          {monthLabels.map((m) => (
            <Text
              key={m.label + m.weekIndex}
              className="heatmap-month-label"
              style={{ gridColumnStart: m.weekIndex + 2 }}
            >
              {m.label}
            </Text>
          ))}
        </Box>
        <Box className="heatmap-grid">
          <Box className="heatmap-day-labels">
            {DAYS_RU.map((day, i) => (
              <Text key={i} className="heatmap-day-label">
                {day}
              </Text>
            ))}
          </Box>
          <Box className="heatmap-weeks">
            {weeks.map((week, wi) => (
              <Box key={wi} className="heatmap-week">
                {week.map((entry, di) => (
                  <Box
                    key={di}
                    className={`heatmap-cell ${entry.count >= 0 ? getIntensity(entry.count, maxCount) : 'heatmap-empty'}`}
                    title={
                      entry.date
                        ? `${new Date(entry.date + 'T00:00:00').toLocaleDateString('ru-RU')}: ${entry.count} стр.`
                        : ''
                    }
                  />
                ))}
              </Box>
            ))}
          </Box>
        </Box>
        <Box className="heatmap-legend">
          <Text textStyle="xs" color="gray.500">
            Меньше
          </Text>
          <Box className="heatmap-cell heatmap-0" />
          <Box className="heatmap-cell heatmap-1" />
          <Box className="heatmap-cell heatmap-2" />
          <Box className="heatmap-cell heatmap-3" />
          <Box className="heatmap-cell heatmap-4" />
          <Text textStyle="xs" color="gray.500">
            Больше
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
