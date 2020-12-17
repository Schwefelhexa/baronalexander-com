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
      'text-dark',
      { 'text-4xl': size === 'default' },
      { 'text-6xl': size === 'large' },
      className
    )}
  >
    {children}
  </p>
);
export default Text;
