import React from 'react';

interface ElementProps {
  className?: string;
  children: React.ReactNode;
}
const Element: React.FC<ElementProps> = ({ children, className = '' }) => (
  <div className={`${className}`}>{children}</div>
);

interface Props {
  children:
    | React.ReactElement<ElementProps>
    | React.ReactElement<ElementProps>[];
}
const ResponsiveSplit: React.FC<Props> & { Element: typeof Element } = ({
  children,
}) => (
  <div className="w-full h-full flex flex-col lg:flex-row lg:items-stretch relative">
    {children}
  </div>
);
ResponsiveSplit.Element = Element;
export default ResponsiveSplit;
