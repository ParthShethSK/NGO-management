"use client";

import React from "react";
import Image from "next/image";
import LandingCard from "@/components/UI/LandingCard";
import json from "../../activities/metadata.json";
export default function page() {
  return (
    <>
      <div className='text-7xl h-full w-full leading-tight tracking-tight text-center mt-10 font-extrabold font-space z-30 text-white bg-opacity-50 rounded-xl'>
        Your Activities
      </div>
          <div className='flex flex-row justify-center items-center space-x-1 gap-1 mb-1 mt-1'>
              {
                  json.activitiesArray.map((activity, index) => (
                  <LandingCard
          title={activity.title}
          description={activity.description}
          image={activity.image}
          button='View Details'
          actionRoute={`/activites/${index}`}
         key={activity.title}
        />
                  ))
              }
      </div>
    </>
  );
}
