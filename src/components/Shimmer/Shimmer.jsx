import React from 'react';
import './Shimmer.css';

function Shimmer() {
  return (
    <>
    <div className="shimmer-container grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 my-6 lg:my-10 m-auto w-[94%] lg:w-[80%]">
        {Array(15).fill().map((_,index)=>(
            <div key={index} className="shimmer-card w-full h-[300px] bg-[#f0f0f0] rounded-xl"></div>
        ))}
    </div>
    </>
  )
}

export default Shimmer