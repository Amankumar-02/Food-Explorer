import React from 'react';
import './Shimmer.css';

function Shimmer() {
  return (
    <>
    <div className="shimmer-container flex flex-wrap mx-4">
        {Array(15).fill().map((_,index)=>(
            <div key={index} className="shimmer-card w-[19%] h-[300px] bg-[#f0f0f0] m-1 rounded-xl"></div>
        ))}
    </div>
    </>
  )
}

export default Shimmer