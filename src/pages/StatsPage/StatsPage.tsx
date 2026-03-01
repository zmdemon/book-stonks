import { Box, Card, Container, Text } from '@chakra-ui/react';
import { useAnalytics } from '@/store/store-books';
import { ReadingChart } from '@/containers/ReadingChart/ReadingChart';
import { ActivityHeatmap } from '@/containers/ActivityHeatmap/ActivityHeatmap';

const StatsPage = () => {
  const { dailyData, streak, heatmap, maxDailyPages } = useAnalytics(30);

  return (
    <Container
      maxW="800px"
      display="flex"
      flexDirection="column"
      alignItems="center"
      padding="4"
      gap="4"
    >
      <Card.Root width="100%" mt="4">
        <Card.Body>
          <Box
            display="flex"
            gap="6"
            justifyContent="center"
            flexWrap="wrap"
          >
            <Box textAlign="center">
              <Text textStyle="3xl" fontWeight="bold" color="orange.500">
                {streak}
              </Text>
              <Text textStyle="sm" color="gray.600">
                {streak === 1
                  ? 'день подряд'
                  : streak >= 2 && streak <= 4
                    ? 'дня подряд'
                    : 'дней подряд'}
              </Text>
            </Box>
            <Box textAlign="center">
              <Text textStyle="3xl" fontWeight="bold" color="blue.500">
                {dailyData.reduce((s, d) => s + d.pagesRead, 0)}
              </Text>
              <Text textStyle="sm" color="gray.600">
                стр. за 30 дней
              </Text>
            </Box>
            <Box textAlign="center">
              <Text textStyle="3xl" fontWeight="bold" color="green.500">
                {Math.round(
                  dailyData.reduce((s, d) => s + d.pagesRead, 0) / 30,
                )}
              </Text>
              <Text textStyle="sm" color="gray.600">
                стр./день (среднее)
              </Text>
            </Box>
          </Box>
        </Card.Body>
      </Card.Root>

      <Card.Root width="100%">
        <Card.Body>
          <ReadingChart data={dailyData} />
        </Card.Body>
      </Card.Root>

      <Card.Root width="100%">
        <Card.Body>
          <ActivityHeatmap data={heatmap} maxCount={maxDailyPages} />
        </Card.Body>
      </Card.Root>
    </Container>
  );
};

export default StatsPage;
