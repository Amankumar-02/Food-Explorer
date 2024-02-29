import React, { useState } from 'react';
import {MenuItem} from '../index';

function MenuCategory({card}) {
  const [toggle, setToggle] = useState({display:"block", type:true, name:"⬆️"});
  const toggleEvent = ()=>{
    if(toggle.type === true){
      setToggle({display:"none", type:false, name:"⬇️"});
    }else{
      setToggle({display:"block", type:true, name:"⬆️"});
    }
  }
  return (
    <>
      <div className="w-[80%] transition-all">
        <div className="flex justify-between items-center mt-8 p-4 shadow-md">
          <h1 className="text-2xl font-semibold">
            {card?.card?.title} ({card?.card?.itemCards.length})
          </h1>
          <button
            className="text-lg font-semibold px-2 rounded-xl"
            onClick={toggleEvent}
          >
            {toggle.name}
          </button>
        </div>
        <div className="" style={toggle}>
          {card?.card?.itemCards.map(({ card }, index2) => (
            <MenuItem key={index2} card={card}/>
          ))}
        </div>
      </div>
    </>
  );
}

export default MenuCategory;