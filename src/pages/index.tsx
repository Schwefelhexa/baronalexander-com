import React from 'react';

import CtaLink from '../components/atomic/CtaLink';
import Header from '../components/atomic/Header';
import LinkCard from '../components/atomic/LinkCard';
import Page from '../components/layout/Page';
import ResponsiveSplit from '../components/layout/ResponsiveSplit';

const Home: React.FC = () => (
  <Page noPadding noScroll>
    <ResponsiveSplit>
      <ResponsiveSplit.Element className="h-1/2 flex flex-col justify-between items-stretch bg-primary-dark pt-8 pb-10 px-8 lg:h-full lg:flex-grow lg:px-16 lg:pt-12">
        <Header light>
          Alexander <br /> Baron
        </Header>
        <div className="lg:absolute lg:top-5/12 lg:left-7/12 lg:-ml-48">
          <LinkCard href="https://www.rwth-aachen.de/cms/~a/root/?lidx=1">
            <p className="leading-tight group-hover:text-light group-focus:text-light">
              Student @ <br />
              <span
                className={`font-bold align-middle text-primary group-hover:text-light group-focus:text-light ${LinkCard.animation}`}
              >
                RWTH Aachen
              </span>
            </p>
          </LinkCard>
        </div>
      </ResponsiveSplit.Element>
      <ResponsiveSplit.Element className="flex flex-col items-stretch px-8 text-4xl lg:items-center lg:justify-end lg:flex-grow">
        <div className="flex flex-col items-center h-full my-12 lg:absolute lg:left-0 lg:bottom-0 lg:h-auto lg:m-0 lg:flex-row lg:w-7/12 lg:px-16 lg:pb-16">
          <div className="w-full mb-8 lg:mb-0 lg:mr-12">
            <CtaLink href="/projects">Projects</CtaLink>
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
      </ResponsiveSplit.Element>
    </ResponsiveSplit>
  </Page>
);
export default Home;
