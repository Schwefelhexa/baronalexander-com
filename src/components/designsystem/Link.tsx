import React from 'react';
import { Link as GatsbyLink } from 'gatsby';

interface IProps {
  to: string;
  children: React.ReactChild;
  external?: boolean;
}
export const Link: React.FC<IProps> = ({ to, external = false, children }) => (
  <>
    {external ? (
      <a href={to} target="_blank" rel="noopener noreferrer" className="link link--external">{children}</a>
    ) : (
      <GatsbyLink className="link link--internal" to={to}>{children}</GatsbyLink>
    )}
  </>
);
