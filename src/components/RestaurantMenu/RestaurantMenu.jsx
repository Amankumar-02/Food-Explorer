import React, { useEffect, useState } from "react";
import 'remixicon/fonts/remixicon.css'
import { MenuCategory, Shimmer } from "../index";
import { Link, useParams } from "react-router-dom";
import {
  MENU_IMG_URL,
  IMG_URL,
  RESTAURANT_MENU_RESULT,
} from "../../utils/constants";
import useApiFetch from "../../hooks/useApiFetch";

function RestaurantMenu() {
  const { restId } = useParams();
  const [restMenu, setRestMenu] = useState("");
  const [restMenuInfo, setRestMenuInfo] = useState([]);
  // const [restMenuOffers, setRestMenuOffers] = useState([]);
  const [restMenuItems, setRestMenuItems] = useState([]);
  const [showCategory, setShowCategory] = useState(0);

  const fetchMenuData = useApiFetch(
    RESTAURANT_MENU_RESULT + "?restaurantId=" + restId
  );

  useEffect(() => {
    if (fetchMenuData?.data) {
      setRestMenu(fetchMenuData?.data?.data?.cards);

      setRestMenuInfo(fetchMenuData?.data?.data?.cards[2]?.card?.card?.info);

      // setRestMenuOffers(fetchMenuData?.data?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle);

      // setRestMenuItems(fetchMenuData?.data?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards);

      // setRestMenuItems(fetchMenuData?.data?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards);

      setRestMenuItems(
        fetchMenuData?.data?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
          (item) =>
            item?.card?.card?.["@type"] ===
            "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
        )
      );

      console.log("All Menu Data Rendered");

      // console.log("fetch" , fetchMenuData?.data?.data?.cards[0]?.card?.card?.info);
    }
  }, [fetchMenuData]);

  const foodFilter = (e) => {
    const originalMenu =
      fetchMenuData?.data?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
        (item) =>
          item?.card?.card?.["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
      );

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
              (item) => item.card.info.itemAttribute.vegClassifier === "NONVEG"
            ),
          },
        },
      }));
      setRestMenuItems(x);
    }
  };
  return (
    <>
      {!(restMenu && restMenuInfo && restMenuItems) ? (
        <Shimmer />
      ) : (
        <>
          <div className="menu my-6 lg:my-10 m-auto w-[90%] sm:w-[80%] lg:w-[60%] flex flex-col items-center">

  <div className="w-full p-3 lg:p-6 flex flex-col gap-6 items-center">
    <div className="w-full p-3 lg:p-6 flex gap-10 md:gap-20 items-center justify-between rounded-lg shadow-lg">
      <div className="flex flex-col gap-4 w-full md:w-auto md:flex-1">
        <h1 className="text-3xl md:text-[40px] text-gray-700 font-bold">
          {restMenuInfo?.name}
        </h1>
        <div className="flex flex-col gap-2">
          <p className="text-sm md:text-[15px] font-semibold text-gray-600">
          {restMenuInfo?.avgRating && (
    <>
      <i className="ri-star-fill text-yellow-500 text-lg"></i> {restMenuInfo?.avgRating}
    </>
  )}
  {restMenuInfo?.totalRatingsString && (
    <span>{` (${restMenuInfo?.totalRatingsString})`}</span>
  )}
  <span className="ml-4">{restMenuInfo?.costForTwoMessage}</span>
          </p>
          <p className="text-sm md:text-[15px] font-semibold text-gray-600">
            {restMenuInfo?.cuisines.join(", ")}
          </p>
          <p className="text-sm md:text-[15px] font-semibold text-gray-600 max-w-full md:max-w-[90%] border-b pb-4">
            <span><i className="ri-store-2-line"></i></span> Outlet - {restMenuInfo?.areaName || restMenuInfo?.locality}
          </p>
          {restMenuInfo?.expectationNotifiers ? (
            <p>
              <span>
                🏍️ {restMenuInfo?.expectationNotifiers[0]?.text.replace(/<\/?b>/g, '')}
              </span>
            </p>
          ) : null}
        </div>
      </div>

      <div className="hidden md:block w-[100px] md:w-[200px] h-[80px] md:h-[180px]">
        <img
          src={IMG_URL + restMenuInfo?.cloudinaryImageId}
          className="w-full h-full object-cover rounded-xl"
          alt=""
        />
      </div>
    </div>

    <div className="flex flex-col items-center gap-2">
      <h2 className="text-xl md:text-2xl italic font-semibold px-2 text-gray-700">
        <span><i className="ri-restaurant-2-line"></i></span> Menu <span><i className="ri-restaurant-2-line"></i></span>
      </h2>
      <div className="flex gap-2 md:gap-4 mt-2">
        <button
          className="px-4 md:px-6 py-1 rounded-lg border border-black hover:bg-gray-300"
          onClick={() => {
            foodFilter("all");
          }}
        >
          All
        </button>
        <button
          className="px-4 md:px-6 py-1 rounded-lg border border-black hover:bg-gray-300"
          onClick={() => {
            foodFilter("veg");
          }}
        >
          Veg
        </button>
        <button
          className="px-4 md:px-6 py-1 rounded-lg border border-black hover:bg-gray-300"
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

export default RestaurantMenu;
