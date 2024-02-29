import React from 'react';
import './Shimmer.css';

function Shimmer() {
  return (
    <>
    <div className="shimmer-container flex gap-3 flex-wrap mx-6 mt-20">
        {Array(15).fill().map((_,index)=>(
            <div key={index} className="shimmer-card w-[250px] h-[300px] bg-[#f0f0f0] rounded-xl"></div>
        ))}
    </div>
    </>
  )
}

export default Shimmer