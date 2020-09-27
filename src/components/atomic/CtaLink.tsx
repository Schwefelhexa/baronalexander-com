import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';

interface Props {
  href: string;
  children: string;
  subtle?: boolean;
}
const CtaLink: React.FC<Props> = ({ href, children, subtle = false }) => (
  <Link href={href}>
    <span
      className={classNames('block w-full h-full text-center', {
        'text-white bg-green-400 rounded-lg shadow-lg py-2 lg:py-3': !subtle,
        'font-bold text-blue-600': subtle,
      })}
    >
      {children}
    </span>
  </Link>
);
export default CtaLink;
