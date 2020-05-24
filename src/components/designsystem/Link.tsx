import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import { ButtonVariant } from './Button';

interface ILinkProps {
  to: string;
  children: React.ReactChild;
  external?: boolean;
}
export const Link: React.FC<ILinkProps> = ({ to, external = false, children }) => (
  <>
    {external ? (
      <a href={to} target="_blank" rel="noopener noreferrer" className="link link--external">{children}</a>
    ) : (
      <GatsbyLink className="link link--internal" to={to}>{children}</GatsbyLink>
    )}
  </>
);

interface IButtonLinkProps {
  to: string;
  children: React.ReactChild;
  variant?: ButtonVariant;
}
export const LinkButton: React.FC<IButtonLinkProps> = ({ to, children, variant = 'primary' }) => (
  <GatsbyLink to={to} className={`btn btn--${variant}`}>{children}</GatsbyLink>
);
