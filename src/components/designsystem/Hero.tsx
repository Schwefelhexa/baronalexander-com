/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

type HeroChildrenArray = [
  React.ReactElement<IHeroTextProps>,
  ...React.ReactElement<IHeroSubtextProps>[]
];
interface IHeroProps {
  children: React.ReactElement<IHeroTextProps> | HeroChildrenArray;
}
export const Hero: React.FC<IHeroProps> = ({ children }) => {
  const array = Array.isArray(children);
  const first: React.ReactElement<IHeroTextProps> = array ? (children as HeroChildrenArray)[0] : children as any;

  return (
    <div className="hero">
      <HeroText {...first.props} />
      {array && (children as HeroChildrenArray).slice(1).map((sub, i) => (
      // eslint-disable-next-line react/no-array-index-key
        <HeroSubtext key={i} {...sub.props} />
      ))}
    </div>
  );
};

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
