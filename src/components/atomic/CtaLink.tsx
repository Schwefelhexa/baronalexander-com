import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';

interface Props {
  href: string;
  children: string;
  subtle?: boolean;
  noAnimation?: boolean;
}
const CtaLink: React.FC<Props> = ({
  href,
  children,
  subtle = false,
  noAnimation = false,
}) => (
  <Link href={href}>
    <a
      className={classNames(
        'block w-full h-full text-center cursor-pointer leading-tight outline-none',
        {
          'text-light bg-positive rounded-lg shadow-lg py-2 lg:py-3': !subtle,
          'font-bold text-primary': subtle,
          'transition-colors duration-100 ease-in-out': !noAnimation,
          'hover:bg-positive-darker focus:bg-positive-darker':
            !subtle && !noAnimation,
          'hover:text-primary-darker focus:text-primary-darker':
            subtle && !noAnimation,
        }
      )}
    >
      {children}
    </a>
  </Link>
);
export default CtaLink;
