import React from 'react';
import Link from 'next/link';

const Home: React.FC = () => (
  <div className="h-screen flex flex-col font-medium leading-tight">
    <div className="h-1/2 flex flex-col justify-between items-stretch bg-blue-700 pt-8 pb-10 px-8">
      <h1 className="text-white font-bold text-5xl">
        Alexander <br /> Baron
      </h1>
      <div className="bg-white px-6 py-2 rounded-lg text-4xl shadow-xl">
        Student @ <br />
        <span className="font-bold text-blue-600">RWTH Aachen</span>
      </div>
    </div>
    <div className="flex flex-col items-stretch px-8 text-4xl">
      <div className="flex flex-col items-center h-full my-12">
        <Link href="#">
          <span className="w-full text-white bg-green-400 text-center rounded-lg py-2 shadow-lg mb-8">
            Blog
          </span>
        </Link>
        <Link href="#">
          <span className="w-full text-white bg-green-400 text-center rounded-lg py-2 shadow-lg">
            About me
          </span>
        </Link>
      </div>
      <div className="mb-10">
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
