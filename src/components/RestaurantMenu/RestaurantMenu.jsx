import React, { useEffect, useState } from 'react';
// import './RestaurantMenu.css';
import {MenuCategory, Shimmer} from '../index';
import { Link, useParams } from 'react-router-dom';
import { MENU_IMG_URL, IMG_URL, RESTAURANT_MENU_RESULT } from '../../utils/constants';
// import useApiFetch from '../../hooks/useApiFetch';

function RestaurantMenu() {
    const {restId} = useParams();
    const [restMenu, setRestMenu] = useState("");
    const [restMenuInfo, setRestMenuInfo] = useState([]);
    // const [restMenuOffers, setRestMenuOffers] = useState([]);
    const [restMenuItems, setRestMenuItems] = useState([]);
    const [showCategory, setShowCategory] = useState(0)

    useEffect(()=>{
      const fetchData = async () => {
        const data = await fetch(RESTAURANT_MENU_RESULT+restId);
        const json = await data.json();
        // setHomePageData(json?.data)
        // setRestTopList(json?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle?.info)
        // setRestList1(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        // setRestList2(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setRestMenu(json?.data?.cards);
        setRestMenuInfo(json?.data?.cards[0]?.card?.card?.info);
        setRestMenuItems(json?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(item=>item?.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"));
        console.log("All Menu Data Rendered");
      };
      fetchData();
    }, [])

    // Original Fetch Code
    // const fetchMenuData = useApiFetch(RESTAURANT_MENU_RESULT+restId);
    // useEffect(()=>{
    //   if(fetchMenuData){

    //     setRestMenu(fetchMenuData?.data?.cards);

    //     setRestMenuInfo(fetchMenuData?.data?.cards[0]?.card?.card?.info);

    //     // setRestMenuOffers(fetchMenuData?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle);

    //     // setRestMenuItems(fetchMenuData?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards);

    //     // setRestMenuItems(fetchMenuData?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards);

    //     setRestMenuItems(fetchMenuData?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(item=>item?.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"));

    //     console.log("All Menu Data Rendered");

    //     // console.log("fetch" , fetchMenuData?.data?.cards[0]?.card?.card?.info);
    //   }
    // }, [fetchMenuData]);

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
            <div className="menu my-10 mx-8 flex flex-col items-center">
              <div className="flex flex-col gap-6 items-center">
                <div className="flex gap-20 items-center justify-between border border-black px-4 py-2 rounded-2xl">
                  <div
                    className="flex flex-col gap-2"
                    style={{ width: "calc(100% - 150px)" }}
                  >
                    <h1 className="text-[40px] text-gray-700 font-bold">
                      {restMenuInfo?.name}
                    </h1>
                    <div className="flex flex-col">
                      <p className="text-[15px] font-semibold text-gray-600">
                        {restMenuInfo?.cuisines.join(", ")} -{" "}
                        {restMenuInfo?.costForTwoMessage}
                      </p>
                      <p className="text-[15px] font-semibold text-gray-600 max-w-[90%]">
                        {restMenuInfo?.areaName || restMenuInfo?.locality}
                        {restMenuInfo?.expectationNotifiers ? (
                          <>
                            <span>
                              , 🏍️ {restMenuInfo?.expectationNotifiers[0]?.text}
                            </span>
                          </>
                        ) : null}
                      </p>
                      <p className="text-[15px] font-semibold text-gray-600">
                        Rating: {restMenuInfo?.avgRating} ⭐
                      </p>
                    </div>
                  </div>
                  <div>
                    <img
                      src={IMG_URL + restMenuInfo?.cloudinaryImageId}
                      className="w-[150px] rounded-xl"
                      alt=""
                    />
                  </div>
                </div>
                <div className='flex flex-col items-center gap-2'>
                  <h2 className="text-2xl italic font-bold px-2 border-2 border-gray-700 border-dotted border-x-0 border-t-0">
                    Menu
                  </h2>
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
                </div>
              </div>
              {restMenuItems.map(
                ({ card }, index) => (
                  // {restMenuItems.filter(item=>item?.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory").map(({ card }, index) =>
                  // card?.card?.title && card?.card?.itemCards && (
                  // card?.card?.["@type"] ===
                  //   "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory" && (
                  <MenuCategory
                    key={index}
                    id={index}
                    card={card}
                    restName={restMenuInfo?.name}
                    restId={restMenuInfo?.id}
                    toggleEvent={(e) => {
                      if (showCategory === e) {
                        setShowCategory(null);
                      } else {
                        setShowCategory(e);
                      }
                    }}
                    showToggle={index === showCategory ? true : false}
                  />
                )
                // )
              )}
            </div>
          </>
        )}
      </>
    );
}

export default RestaurantMenu