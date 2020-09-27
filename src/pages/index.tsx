import React from 'react';
import Link from 'next/link';

const Home: React.FC = () => (
  <div className="h-screen flex flex-col lg:flex-row lg:items-stretch font-medium leading-tight relative">
    <div
      className="h-1/2 flex flex-col justify-between items-stretch bg-blue-700 pt-8 pb-10 px-8
      lg:h-full lg:flex-grow-3 lg:px-16 lg:pt-12"
    >
      <h1 className="text-white font-medium text-6xl sm:text-7xl md:text-8xl md:leading-none xl:text-9xl">
        Alexander <br /> Baron
      </h1>
      <div
        className="bg-white px-6 py-2 rounded-lg text-4xl shadow-xl
        lg:absolute lg:top-5/12 lg:left-7/12 lg:-ml-48 lg:shadow-2xl lg:pl-10 lg:pr-40 lg:py-6 lg:text-5xl"
      >
        Student @ <br />
        <span className="font-bold text-blue-600">RWTH Aachen</span>
      </div>
    </div>

    <div
      className="flex flex-col items-stretch px-8 text-4xl
      lg:items-center lg:justify-end lg:flex-grow-3"
    >
      <div
        className="flex flex-col items-center h-full my-12
        lg:absolute lg:left-0 lg:m-0 lg:flex-row lg:w-7/12 lg:px-16 lg:items-end lg:pb-16"
      >
        <Link href="#">
          <span className="w-full text-white bg-green-400 text-center rounded-lg py-2 shadow-lg lg:py-3 mb-8 lg:mb-0 lg:mr-12">
            Blog
          </span>
        </Link>
        <Link href="#">
          <span className="w-full text-white bg-green-400 text-center rounded-lg py-2 shadow-lg lg:py-3">
            About me
          </span>
        </Link>
      </div>
      <div className="mb-10 lg:w-full lg:mb-16 lg:py-3">
        <Link href="#">
          <span className="block text-center font-bold text-blue-600">
            Contact Me
          </span>
        </Link>
      </div>
    </div>
  </div>
);
export default Home;
