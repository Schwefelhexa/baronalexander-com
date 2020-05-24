/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

interface IHeroProps {
  children: [
    React.ReactElement<IHeroTextProps>,
    ...React.ReactElement<IHeroSubtextProps>[]
  ];
}
export const Hero: React.FC<IHeroProps> = ({ children }) => (
  <div className="hero">
    <HeroText {...children[0].props} />
    {children.slice(1).map((sub, i) => (
      // eslint-disable-next-line react/no-array-index-key
      <HeroSubtext key={i} {...sub.props} />
    ))}
  </div>
);

interface IHeroTextProps {
  children: React.ReactNode;
}
export const HeroText: React.FC<IHeroTextProps> = ({ children }) => (
  <h1 className="hero__text">{children}</h1>
);

interface IHeroSubtextProps {
  children: React.ReactNode;
}
export const HeroSubtext: React.FC<IHeroSubtextProps> = ({ children }) => (
  <h2 className="hero__subtext">{children}</h2>
);
