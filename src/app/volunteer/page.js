"use client";

import React from "react";
import Image from "next/image";
import LandingCard from "@/components/UI/LandingCard";
axios.post(`/api/ngo/getMetadata?address=${address}`);
export default function page() {
  return (
    <>
      <div className='text-banner h-full w-full leading-tight tracking-tight text-center mt-10 font-extrabold font-space z-30 text-white bg-opacity-50 rounded-xl'>
        Welcome , Volunteer 
      </div>
      <div className='flex flex-row justify-around items-center mb-10 mt-10'>
        <LandingCard
          title='View your activities'
          description='Sit fugiat duis magna exercitation. Dolore veniam aliqua reprehenderit in reprehenderit exercitation pariatur et culpa est deserunt. Laboris et elit ea minim cillum sint.'
          image='/ngo-signup.png'
          button='Dashboard'
          actionRoute='/volunteer/dashboard'
        />
        <LandingCard
          title='View all the activities'
          description='Sit fugiat duis magna exercitation. Dolore veniam aliqua reprehenderit in reprehenderit exercitation pariatur et culpa est deserunt. Laboris et elit ea minim cillum sint.'
          image='/ngo-dashboard.png'
          button='View'
          actionRoute='/volunteer/marketplace'
        />
      </div>
    </>
  );
}
