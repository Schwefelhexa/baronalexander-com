import React from 'react';

import CtaLink from '../components/atomic/CtaLink';
import LinkCard from '../components/atomic/LinkCard';

const Home: React.FC = () => (
  <div className="h-full flex flex-col lg:flex-row lg:items-stretch font-medium leading-tight relative">
    <div
      className="h-1/2 flex flex-col justify-between items-stretch bg-blue-700 pt-8 pb-10 px-8
      lg:h-full lg:flex-grow-3 lg:px-16 lg:pt-12"
    >
      <h1 className="text-white font-medium text-6xl sm:text-7xl md:text-8xl md:leading-none xl:text-9xl">
        Alexander <br /> Baron
      </h1>
      <div className="lg:absolute lg:top-5/12 lg:left-7/12 lg:-ml-48">
        <LinkCard href="https://www.rwth-aachen.de/cms/~a/root/?lidx=1">
          Student @ <br />
          <span
            className={`font-bold text-blue-600 ${LinkCard.animation} group-hover:text-white`}
          >
            RWTH Aachen
          </span>
        </LinkCard>
      </div>
    </div>

    <div
      className="flex flex-col items-stretch px-8 text-4xl
      lg:items-center lg:justify-end lg:flex-grow-3"
    >
      <div
        className="flex flex-col items-center h-full my-12
        lg:absolute lg:left-0 lg:bottom-0 lg:h-auto lg:m-0 lg:flex-row lg:w-7/12 lg:px-16 lg:pb-16"
      >
        <div className="w-full mb-8 lg:mb-0 lg:mr-12">
          <CtaLink href="#">Blog</CtaLink>
        </div>
        <div className="w-full">
          <CtaLink href="#">About me</CtaLink>
        </div>
      </div>
      <div className="mb-10 lg:w-full lg:mb-16 lg:py-3">
        <CtaLink href="#" subtle>
          Contact me
        </CtaLink>
      </div>
    </div>
  </div>
);
export default Home;
