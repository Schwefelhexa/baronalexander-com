import React from 'react';

interface Props {
  children: React.ReactNode;
}
const Page: React.FC<Props> = ({ children }) => (
  <div className="h-full font-medium leading-tight">{children}</div>
);
export default Page;
