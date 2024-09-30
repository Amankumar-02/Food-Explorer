import React, { useEffect, useState } from 'react';
import 'remixicon/fonts/remixicon.css'
import {MenuItem} from '../index';

function MenuCategory({card, id, toggleEvent, showToggle, restName, restId}) {
  // const [toggle, setToggle] = useState({display:"block", type:true, name:"<i className="ri-arrow-up-s-line"></i>"});
  // const toggleEvent = ()=>{
  //   if(showToggle === true){
  //     setToggle({display:"none", type:false, name:"<i className="ri-arrow-down-s-line"></i>"});
  //   }else{
  //     setToggle({display:"block", type:true, name:"<i className="ri-arrow-up-s-line"></i>"});
  //   }
  // }
  return (
    <>
      <div className="w-full transition-all">
  <div 
    className="flex justify-between items-center mt-4 lg:mt-8 p-2 lg:p-4 shadow-md bg-gray-300 rounded-xl cursor-pointer"
    onClick={() => { toggleEvent(id); }}
  >
    <h1 className="text-lg md:text-2xl font-semibold flex-1">
      {card?.card?.title} ({card?.card?.itemCards.length})
    </h1>
    <button className="text-lg font-semibold px-2 rounded-xl mt-2 md:mt-0">
      {showToggle ? (
        <i className="ri-arrow-up-s-line text-xl"></i>
      ) : (
        <i className="ri-arrow-down-s-line text-xl"></i>
      )}
    </button>
  </div>

  <div className={`${showToggle ? "block" : "hidden"}`}>
    {card?.card?.itemCards.map(({ card }, index2) => (
      <MenuItem key={index2} card={card} restName={restName} restId={restId} />
    ))}
  </div>
</div>

    </>
  );
}

export default MenuCategory;