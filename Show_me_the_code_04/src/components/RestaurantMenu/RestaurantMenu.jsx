import React, { useEffect, useState } from 'react';
import './RestaurantMenu.css';
import {MenuCategory, Shimmer} from '../index';
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
        // console.log("fetch" , fetchMenuData);
      }
    }, [fetchMenuData]);

    const foodFilter = (e) => {
      const originalMenu =
        fetchMenuData?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR
          ?.cards;

      const filteredItem = originalMenu?.filter(
        (item) =>
          item?.card?.card?.["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
      );

      if (e === "all") {
        setRestMenuItems(originalMenu);
      } else if (e === "veg") {
        const x = filteredItem.map((group) => ({
          card: {
            card: {
              ...group.card.card,
              itemCards: group.card.card.itemCards.filter(
                (item) => item.card.info.itemAttribute.vegClassifier === "VEG"
              ),
            },
          },
        }));
        setRestMenuItems(x);
      } else if (e === "nonveg") {
        const x = filteredItem.map((group) => ({
          card: {
            card: {
              ...group.card.card,
              itemCards: group.card.card.itemCards.filter(
                (item) =>
                  item.card.info.itemAttribute.vegClassifier === "NONVEG"
              ),
            },
          },
        }));
        setRestMenuItems(x);
      }
    };

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
              <div className='flex gap-4 mt-2'>
                <button className='border px-2 rounded-lg' onClick={()=>{foodFilter("all")}}>All</button>
                <button className='border px-2 rounded-lg' onClick={()=>{foodFilter("veg")}}>Veg</button>
                <button className='border px-2 rounded-lg' onClick={()=>{foodFilter("nonveg")}}>NonVeg</button>
              </div>
              {restMenuItems.map(({ card }, index) =>
              // {restMenuItems.filter(item=>item?.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory").map(({ card }, index) =>
                // card?.card?.title && card?.card?.itemCards && (
                card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory" && (
                  <MenuCategory key={index} card={card}/>
                )
              )}
            </div>
          </>
        )}
      </>
    );
}

export default RestaurantMenu