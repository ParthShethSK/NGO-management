"use client";

import json from "../metadata.json";
export default function Page({ params }) {
    const { index } = params;
    return (
        <>
            <div className='text-9xl h-full w-full leading-tight tracking-tight text-center mt-10 font-extrabold font-space z-30 text-white bg-opacity-50 rounded-xl'>
                {json.activitiesArray[index].title}
            </div>
            <div className="text-4xl h-full text-center text-blue-600 bg-slate-400 pt-10 rounded-xl">
                {json.activitiesArray[index].date}
            </div>
           <div className="text-6xl h-full text-center text-white pt-10 rounded-xl">
                {json.activitiesArray[index].description}
            </div>
        </>
    );
}