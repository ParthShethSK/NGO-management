import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LandingCard(props) {
    const router = useRouter();
    
    const routeClickHandler = () => {
        router.push(props.actionRoute);
    }

  return (
    <>
      <div className='flex justify-center mt-10'>
        <div className='block max-w-sm rounded-lg bg-white shadow-lg'>
          <a href='#!'>
            <Image
              className='rounded-t-lg'
              src={`${props.image}`}
              height={500}
              width={500}
              alt=''
            />
          </a>
          <div className='p-6'>
            <h5 className='mb-2 text-4xl font-space leading-tight text-neutral-800'>
              {props.title}
            </h5>
            <p className='mb-4 text-base text-neutral-600'>
              {props.description}
            </p>
            <button
              type='button'
              onClick={routeClickHandler}
              className='text-white placeholder:font-space !bg-amber-500 hover:!bg-amber-600 transition duration-75 ease-in font-medium rounded-lg text-base px-6 py-3.5 text-center'>
              {props.button}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
