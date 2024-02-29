import React, { useEffect, useState } from 'react';
import './RestaurantMenu.css';
import {MenuItems, Shimmer} from '../index';
import { Link, useParams } from 'react-router-dom';
import { MENU_IMG_URL, RESTAURANT_MENU_RESULT } from '../../utils/constants';
import useApiFetch from '../../hooks/useApiFetch';

function RestaurantMenu() {
    const {restId} = useParams();
    const [restMenu, setRestMenu] = useState("");
    const [restMenuInfo, setRestMenuInfo] = useState([]);
    // const [restMenuOffers, setRestMenuOffers] = useState([]);
    const [restMenuItems, setRestMenuItems] = useState([]);

    const fetchMenuData = useApiFetch(RESTAURANT_MENU_RESULT+restId);
    useEffect(()=>{
      if(fetchMenuData){
        setRestMenu(fetchMenuData?.data?.cards);
        setRestMenuInfo(fetchMenuData?.data?.cards[0]?.card?.card?.info);
        // setRestMenuOffers(fetchMenuData?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle);
        // setRestMenuItems(fetchMenuData?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards);
        setRestMenuItems(fetchMenuData?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards);
        console.log("All Menu Data Rendered");
        // console.log(fetchMenuData?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards);
      }
    }, [fetchMenuData]);

    // if(restMenu === null){return(<Shimmer/>)}

    // const {name, cuisines, costForTwoMessage} = restMenuInfo;

    return (
      <>
        {!restMenu ? (
          <Shimmer />
        ) : (
          <>
            <div className="menu mx-8 flex flex-col items-center">
              <h1 className='text-3xl font-bold'>{restMenuInfo?.name}</h1>
              <p className='text-lg'>
                {restMenuInfo?.cuisines.join(", ")} -{" "}
                {restMenuInfo?.costForTwoMessage}
              </p>
              <h2 className='text-xl font-bold'>Menu</h2>
              {restMenuItems.map(({ card }, index) =>
                card?.card?.title && card?.card?.itemCards ? (
                  // <div key={index} className='w-[80%]'>
                  //   <h1 className='mt-8 mb-4 text-2xl font-semibold'>
                  //     {card?.card?.title} ({card?.card?.itemCards.length})
                  //   </h1>
                  //   {card?.card?.itemCards.map(({ card }, index2) => (
                  //     <div key={index2} className='relative flex justify-between py-6 px-8 border border-x-0'>
                  //       <ul className='flex flex-col justify-center list-none w-[60%]'>
                  //         {card?.info?.itemAttribute?.vegClassifier === "VEG"? (<li className='w-fit border border-green-500 text-[8px]'>🟢</li>):null}
                  //         {card?.info?.itemAttribute?.vegClassifier === "NONVEG"? (<li className='w-fit border border-red-500 text-[8px]'>🔴</li>):null}
                  //         <li className='text-lg font-semibold'>{card?.info?.name}</li>
                  //         <li>Rs.
                  //           {card?.info?.price / 100 ||
                  //             card?.info?.defaultPrice / 100}
                  //         </li>
                  //         <li>{card?.info?.description}</li>
                  //       </ul>
                  //       {card?.info?.imageId? (
                  //         <img src={MENU_IMG_URL + card?.info?.imageId} className='menu-img w-[150px] object-cover'/>
                  //         ):null}
                  //       <button className='absolute right-[75px] bottom-[8px] bg-white z-[99] border-2 rounded-xl px-4 hover:bg-green-500 hover:text-white'>Add</button>
                  //     </div>
                  //   ))}
                  // </div>
                  <MenuItems key={index} card={card}/>
                ) : null
              )}
            </div>
          </>
        )}
      </>
    );
}

export default RestaurantMenu