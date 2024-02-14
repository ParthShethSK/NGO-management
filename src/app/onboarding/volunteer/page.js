import React from "react";
import RegisterOnboard from "../../../components/Pages/RegisterVol"
import Image from "next/image";

export default function Page() {
  return (
      <>
          {/* <h1>Oh oh! Looks like you need to register first. Lets get you onboard</h1> */}
          <div className='flex flex-row justify-center items-center text-center mt-30 mb-44'>
              <div>
                  <div className='text-3xl leading-tight tracking-tight text-center mt-10 font-extrabold font-space z-30 text-white bg-opacity-50 rounded-xl'>
                      Oh oh! Looks like you need to <span className='text-yellow-100 font-semibold'>register</span> first.
                  </div>
                  <div className='text-banner h-full w-full leading-tight tracking-tight text-center mt-10 font-extrabold font-space z-30 text-white bg-opacity-50 rounded-xl'>
        Let&apos;s get you on board
      </div>
              </div>
          </div>
          <div className='flex flex-row justify-center items-center gap-5 mt-10 mb-44'>
             
              
           <Image
          src='/register.png'
          height={500}
          width={500}
            alt='dummy'
          />
              <div className='mr-44 pl-10 ml-10'>
                  <RegisterOnboard />
              </div>
          </div>
      </>
  );
}