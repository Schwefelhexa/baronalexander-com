import React from 'react';

export interface HeaderProps {
  children: React.ReactNode;
}
const Header: React.FC<HeaderProps> = ({ children }) => (
  <h1 className="text-dark font-bold lg:text-9xl">{children}</h1>
);
export default Header;
