import React from 'react';
import classNames from 'classnames';

export type TextSize = 'default' | 'large' | 'small';

export interface TextProps {
  children: React.ReactNode;
  size?: TextSize;
  className?: string;
}
const Text: React.FC<TextProps> = ({
  children,
  size = 'default',
  className,
}) => (
  <p
    className={classNames(
      'text-dark dark:text-light',
      { 'text-base': size === 'small' },
      { 'text-2xl lg:text-4xl': size === 'default' },
      { 'text-4xl lg:text-6xl': size === 'large' },
      className
    )}
  >
    {children}
  </p>
);
export default Text;
