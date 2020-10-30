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
    <span
      className={classNames('block w-full h-full text-center cursor-pointer', {
        'text-white bg-green-400 rounded-lg shadow-lg py-2 lg:py-3': !subtle,
        'font-bold text-blue-600': subtle,
        'transition-colors duration-100 ease-in-out': !noAnimation,
        'hover:bg-green-500': !subtle && !noAnimation,
        'hover:text-blue-700': subtle && !noAnimation,
      })}
    >
      {children}
    </span>
  </Link>
);
export default CtaLink;
