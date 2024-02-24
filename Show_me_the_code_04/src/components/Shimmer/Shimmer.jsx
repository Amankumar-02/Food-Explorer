import React from 'react';
import './Shimmer.css';

function Shimmer() {
  return (
    <>
    <div className="shimmer-container">
        {Array(15).fill().map((_,index)=>(
            <div key={index} className="shimmer-card"></div>
        ))}
    </div>
    </>
  )
}

export default Shimmer