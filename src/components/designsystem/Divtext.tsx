/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

interface IDivtextProps {
  children: React.ReactElement<React.HTMLAttributes<HTMLSpanElement>>[];
}
export const Divtext: React.FC<IDivtextProps> = ({ children }) => (
  <div className="divtext">
    {children.map((text, i) => (
      // eslint-disable-next-line react/no-array-index-key
      <span key={i} className={`divtext__item ${i === (children.length - 1) ? 'divtext__item--last' : ''} ${text.props.className}`} {...text.props} />
    ))}
  </div>
);
