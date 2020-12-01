import React from 'react';

interface Props {
  light?: boolean;
  children: React.ReactNode;
}
const Header: React.FC<Props> = ({ children, light = false }) => (
  <h1
    className={`${
      light ? 'text-light' : 'text-primary'
    } font-medium text-6.5xl sm:text-7xl md:text-8xl md:leading-none xl:text-9xl`}
  >
    {children}
  </h1>
);
export default Header;
