import './MainPages.css';
import { Link, Outlet } from '@tanstack/react-router';
import { Box, Heading } from '@chakra-ui/react';
import { ColorModeButton } from '@/components/ui/color-mode';

import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

const MainPage = () => {
  return (
    <>
      <Box
        className="MainPage"
        paddingY={{ base: 2, md: 0 }}
        justifyContent="space-between"
      >
        <Box display="flex" gap={{ base: 3, md: 2 }}>
          <Link to="/" className="[&.active]:font-bold">
            <Heading size={{ base: 'md', md: 'lg' }} fontWeight="medium">
              Home
            </Heading>
          </Link>
          <Link to="/about" className="[&.active]:font-bold">
            <Heading size={{ base: 'md', md: 'lg' }} fontWeight="medium">
              About
            </Heading>
          </Link>
        </Box>
        <ColorModeButton />
      </Box>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
};

export default MainPage;
