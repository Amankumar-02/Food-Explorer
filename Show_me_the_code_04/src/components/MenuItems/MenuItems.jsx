import React, { useState } from 'react';
import { MENU_IMG_URL } from '../../utils/constants';

function MenuItems({card}) {
  const [toggle, setToggle] = useState({height:"auto", overflow:"auto", type:true, name:"Less"});
  const toggleEvent = ()=>{
    if(toggle.type === true){
      setToggle({height:"82px", overflow:"hidden", type:false, name:"More"});
    }else{
      setToggle({height:"auto", overflow:"auto", type:true, name:"Less"});
    }
  }
  return (
    <>
      <div className="w-[80%] transition-all" style={toggle}>
        <div className='flex justify-between items-center mt-8 mb-4 mx-2'>
        <h1 className="text-2xl font-semibold">
          {card?.card?.title} ({card?.card?.itemCards.length})
        </h1>
        <button className='text-lg font-semibold border px-2 rounded-xl' onClick={toggleEvent}>{toggle.name}</button>
        </div>
        {card?.card?.itemCards.map(({ card }, index2) => (
          <div
            key={index2}
            className="relative flex justify-between py-6 px-8 border border-x-0"
          >
            <ul className="flex flex-col justify-center list-none w-[60%]">
              {card?.info?.itemAttribute?.vegClassifier === "VEG" ? (
                <li className="w-fit border border-green-500 text-[8px]">🟢</li>
              ) : null}
              {card?.info?.itemAttribute?.vegClassifier === "NONVEG" ? (
                <li className="w-fit border border-red-500 text-[8px]">🔴</li>
              ) : null}
              <li className="text-lg font-semibold">{card?.info?.name}</li>
              <li>
                Rs.
                {card?.info?.price / 100 || card?.info?.defaultPrice / 100}
              </li>
              <li>{card?.info?.description}</li>
            </ul>
            {card?.info?.imageId ? (
              <img
                src={MENU_IMG_URL + card?.info?.imageId}
                className="menu-img w-[150px] object-cover"
              />
            ) : null}
            <button className="absolute right-[75px] bottom-[8px] bg-white z-[99] border-2 rounded-xl px-4 hover:bg-green-500 hover:text-white">
              Add
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default MenuItems