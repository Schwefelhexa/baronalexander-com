import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';

const animation = 'transition-colors duration-150 ease-in-out';
interface Props {
  href: string;
  children: React.ReactNode;
  noAnimation?: boolean;
}
const LinkCard: React.FC<Props> & { animation: string } = ({
  href,
  children,
  noAnimation = false,
}) => (
  <Link href={href}>
    <div
      className={classNames(
        'w-full h-full bg-light px-6 py-2 rounded-lg text-4xl shadow-xl cursor-pointer',
        'lg:shadow-2xl lg:pl-10 lg:pr-40 lg:py-6 lg:text-5xl',
        {
          [`group ${animation} hover:bg-primary hover:text-light`]: !noAnimation, // Group allows children to change on card hover
        }
      )}
    >
      {children}
    </div>
  </Link>
);
LinkCard.animation = animation;
export default LinkCard;
