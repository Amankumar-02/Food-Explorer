import React from 'react'
import { MENU_IMG_URL } from '../../utils/constants';

function MenuItem({card}) {
  return (
    <>
      <div className="relative flex justify-between items-center py-6 px-8 border border-x-0">
        <ul className="flex flex-col gap-4 justify-center list-none w-[80%]">
          {card?.info?.itemAttribute?.vegClassifier === "VEG" ? (
            <li className="w-fit border border-green-500 text-[8px]">🟢</li>
          ) : null}
          {card?.info?.itemAttribute?.vegClassifier === "NONVEG" ? (
            <li className="w-fit border border-red-500 text-[8px]">🔺</li>
          ) : null}
          <div>
            <li className="text-lg font-semibold">{card?.info?.name}</li>
            <li>
              ₹{card?.info?.price / 100 || card?.info?.defaultPrice / 100}
            </li>
          </div>
          <li>{card?.info?.description}</li>
        </ul>
        {card?.info?.imageId ? (
          <img
            src={MENU_IMG_URL + card?.info?.imageId}
            className="menu-img w-[150px] h-[120px] object-cover"
          />
        ) : null}
        <button className="absolute right-[75px] bottom-[8px] bg-white z-[99] border-2 rounded-xl px-4 hover:bg-green-500 hover:text-white">
          Add
        </button>
      </div>
    </>
  );
}

export default MenuItem