"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function GoBackButton() {
  const router = useRouter();

  return (
    <>
      <div>
        <button
          onClick={() => {
            router.back();
          }}
          type='button'
          className='flex items-center text-white p-4 transition ease-in duration-200 uppercase rounded-full hover:bg-amber-600 hover:text-white border-2 border-amber-900 focus:outline-none bg-grey'>
            Go back
        </button>
      </div>
    </>
  );
}
