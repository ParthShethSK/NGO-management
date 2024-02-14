"use client";

import React from "react";
import axios from "axios";
import LandingCard from "@/components/UI/LandingCard";

const getNGOMetadata = async () => {
  return await axios.post('/api/ngo/getMetadata');
}

export default function page() {

  const data = getNGOMetadata();


  return (
    <>
      <div className='text-banner h-full w-full leading-tight tracking-tight text-center mt-10 font-extrabold font-space z-30 text-white bg-opacity-50 rounded-xl'>
        Welcome , NGO
      </div>
      <div className='flex flex-row justify-around items-center mb-10 mt-10'>
        <LandingCard
          title='Register activity'
          description='Sit fugiat duis magna exercitation. Dolore veniam aliqua reprehenderit in reprehenderit exercitation pariatur et culpa est deserunt. Laboris et elit ea minim cillum sint.'
          image='/ngo-signup.png'
          button='Register'
          actionRoute='/ngo/register'
        />
        <LandingCard
          title='View dashboard'
          description='Sit fugiat duis magna exercitation. Dolore veniam aliqua reprehenderit in reprehenderit exercitation pariatur et culpa est deserunt. Laboris et elit ea minim cillum sint.'
          image='/ngo-dashboard.png'
          button='View'
          actionRoute='/ngo/dashboard'
        />
      </div>
    </>
  );
}
