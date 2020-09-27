import React from 'react';
import Link from 'next/link';

interface Props {
  href: string;
  children: React.ReactNode;
}
const LinkCard: React.FC<Props> = ({ href, children }) => (
  <Link href={href}>
    <div
      className="w-full h-full bg-white px-6 py-2 rounded-lg text-4xl shadow-xl cursor-pointer
       lg:shadow-2xl lg:pl-10 lg:pr-40 lg:py-6 lg:text-5xl"
    >
      {children}
    </div>
  </Link>
);
export default LinkCard;
