"use client";

import React from "react";
import Register from "../../../components/Pages/Register";
import GoBackButton from "@/components/UI/GoBackButton";
import Image from "next/image";
import UploadTest from "../../../components/Pages/UploadTest";

export default function page() {

  return (
    <>
      <div className="flex flex-row justify-center items-center mt-44 mb-44">
        <div className="mr-44">
          <div className="mb-10">
            <GoBackButton />
          </div>
          <Register />
        </div>
        <Image src="/register.png" height={500} width={500} alt="" />
      </div>
    </>
  );
}
