import React from "react";
import Image from "next/image";
import LoginCard from "../UI/LoginCard";

export default function Login() {
  return (
    <>
      <section
        id='login'
        className='flex justify-center items-center bg-black'>
        <div className='p-10 pl-0 pr-6 mt-4 mr-6'>
          <Image
            src='/loginsplash.png'
            width={800}
            height={50}
            alt='trucause Logo'
          />
        </div>
        <div className='login-group p-10 ml-10'>
          <LoginCard />
        </div>
      </section>
    </>
  );
}
