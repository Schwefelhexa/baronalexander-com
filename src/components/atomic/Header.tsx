import { motion } from 'framer-motion';
import React from 'react';

export interface HeaderProps {
  children: React.ReactNode;
  noLayoutTransition?: boolean;
}
const Header: React.FC<HeaderProps> = ({
  children,
  noLayoutTransition = false,
}) => (
  <motion.h1
    className="text-dark font-bold lg:text-9xl"
    layoutId={noLayoutTransition ? undefined : '_HEADER'}
  >
    {children}
  </motion.h1>
);
export default Header;
