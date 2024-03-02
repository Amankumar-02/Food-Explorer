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
    const [showCategory, setShowCategory] = useState(0)

    const fetchMenuData = useApiFetch(RESTAURANT_MENU_RESULT+restId);

    useEffect(()=>{
      if(fetchMenuData){

        setRestMenu(fetchMenuData?.data?.cards);

        setRestMenuInfo(fetchMenuData?.data?.cards[0]?.card?.card?.info);

        // setRestMenuOffers(fetchMenuData?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle);

        // setRestMenuItems(fetchMenuData?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards);

        // setRestMenuItems(fetchMenuData?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards);

        setRestMenuItems(fetchMenuData?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(item=>item?.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"));

        console.log("All Menu Data Rendered");

        // console.log("fetch" , fetchMenuData?.data?.cards[0]?.card?.card?.info);
      }
    }, [fetchMenuData]);

    const foodFilter = (e) => {
      const originalMenu =
      fetchMenuData?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(item=>item?.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory");

      // const filteredItem = originalMenu?.filter(
      //   (item) =>
      //     item?.card?.card?.["@type"] ===
      //     "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
      // );

      if (e === "all") {
        setRestMenuItems(originalMenu);
      } else if (e === "veg") {
        const x = originalMenu.map((group) => ({
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
        const x = originalMenu.map((group) => ({
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

    return (
      <>
        {!restMenu ? (
          <Shimmer />
        ) : (
          <>
            <div className="menu mx-8 flex flex-col items-center">
              <h1 className="text-3xl font-bold">{restMenuInfo?.name}</h1>
              <p className="text-sm text-gray-600">
                {restMenuInfo?.cuisines.join(", ")} -{" "}
                {restMenuInfo?.costForTwoMessage}
              </p>
              <p className='text-sm text-gray-600'>{restMenuInfo?.areaName || restMenuInfo?.locality}{restMenuInfo?.expectationNotifiers? (<><span>, 🏍️ {restMenuInfo?.expectationNotifiers[0]?.text}</span></>):null}</p>
              <p className='text-sm text-gray-600'>Rating: {restMenuInfo?.avgRating} ⭐</p>
              <h2 className="text-xl font-bold">Menu</h2>
              <div className="flex gap-4 mt-2">
                <button
                  className="px-6 py-1 rounded-lg border border-black hover:bg-gray-300"
                  onClick={() => {
                    foodFilter("all");
                  }}
                >
                  All
                </button>
                <button
                  className="px-6 py-1 rounded-lg border border-black hover:bg-gray-300"
                  onClick={() => {
                    foodFilter("veg");
                  }}
                >
                  Veg
                </button>
                <button
                  className="px-6 py-1 rounded-lg border border-black hover:bg-gray-300"
                  onClick={() => {
                    foodFilter("nonveg");
                  }}
                >
                  NonVeg
                </button>
              </div>
              {restMenuItems.map(
                ({ card }, index) =>
                  // {restMenuItems.filter(item=>item?.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory").map(({ card }, index) =>
                  // card?.card?.title && card?.card?.itemCards && (
                  // card?.card?.["@type"] ===
                  //   "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory" && (
                    <MenuCategory
                      key={index}
                      id={index}
                      card={card}
                      restName={restMenuInfo?.name}
                      toggleEvent={(e)=>{
                        if(showCategory === e){
                          setShowCategory(null);
                        }else{
                          setShowCategory(e);
                        }
                      }}
                      showToggle={
                        index === showCategory ? true : false
                      }
                    />
                  // )
              )}
            </div>
          </>
        )}
      </>
    );
}

export default RestaurantMenu