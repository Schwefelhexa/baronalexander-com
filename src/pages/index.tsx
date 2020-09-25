import React from 'react'
import Head from 'next/head'

const Home: React.FC = () => (
  <div>
    <Head>
      <title>Create Next App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className="w-screen h-screen flex justify-center items-center">
      <h1 className="text-red-500 text-4xl">Hello World!</h1>
    </div>
  </div>
);
export default Home;
