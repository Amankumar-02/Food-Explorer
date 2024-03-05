import React, { useEffect, useState } from 'react';
import {MenuItem} from '../index';

function MenuCategory({card, id, toggleEvent, showToggle, restName, restId}) {
  // const [toggle, setToggle] = useState({display:"block", type:true, name:"⬆️"});
  // const toggleEvent = ()=>{
  //   if(showToggle === true){
  //     setToggle({display:"none", type:false, name:"⬇️"});
  //   }else{
  //     setToggle({display:"block", type:true, name:"⬆️"});
  //   }
  // }
  return (
    <>
      <div className="w-[80%] transition-all">
        <div className="flex justify-between items-center mt-8 p-4 shadow-md bg-gray-200 rounded-xl" onClick={()=>{toggleEvent(id)}}>
          <h1 className="text-2xl font-semibold">
            {card?.card?.title} ({card?.card?.itemCards.length})
          </h1>
          <button
            className="text-lg font-semibold px-2 rounded-xl"
          >
            {/* {toggleEvent.name} */}
            {showToggle? (<>⬆️</>) : (<>⬇️</>)}
          </button>
        </div>
        {/* <div className="" style={toggle}></div> */}
        <div className={`${showToggle? ("block"): ("hidden")}`}>
          {card?.card?.itemCards.map(({ card }, index2) => (
            <MenuItem key={index2} card={card} restName={restName} restId={restId}/>
          ))}
        </div>
      </div>
    </>
  );
}

export default MenuCategory;