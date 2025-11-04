import './MainPages.css';
import { Link, Outlet } from '@tanstack/react-router';
import { Heading } from '@chakra-ui/react';

import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

const MainPage = () => {
  return (
    <>
      <div className="MainPage">
        <Link to="/" className="[&.active]:font-bold">
          <Heading>Home</Heading>
        </Link>
        <Link to="/about" className="[&.active]:font-bold">
          <Heading>About</Heading>
        </Link>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
};

export default MainPage;
