import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import { IMG_URL } from "../../../utils/constants";

function Restaurant({ searchRestaurantResult, searchMoreResult, searchName }) {
    const navigate = useNavigate();
    console.log("first",searchRestaurantResult)
    console.log("second",searchMoreResult)

  return (
    <>
      {!searchRestaurantResult ? null : (
        <>
          <div className="my-10 m-auto w-[80%]">
            <div>
            <h1 className="text-xl font-semibold capitalize text-gray-700">Search Results: <span className="text-2xl">{searchName}</span></h1>
            <div className="flex gap-4 flex-wrap my-4">
              {/* {searchRestaurantResult.map((info, index) => ( */}
                <div
                  // key={index}
                  className="w-[530px] p-4 rounded-2xl border border-gray-600 flex items-center cursor-pointer hover:bg-gray-300" onClick={()=>navigate(`/restaurants/${searchRestaurantResult?.id}`)}
                >
                  <div className="relative w-[100px] h-[100px] flex justify-center">
                    {searchRestaurantResult?.cloudinaryImageId ? (
                      <>
                        <img
                          src={IMG_URL + searchRestaurantResult?.cloudinaryImageId}
                          className="menu-img w-full h-full object-cover rounded-xl"
                          alt=""
                        />
                      </>
                    ) : null}
                    {!searchRestaurantResult?.aggregatedDiscountInfoV3? null : (<>
                    <div className="absolute bottom-[-6] bg-white rounded-lg shadow-md flex flex-col items-center overflow-hidden">
                      {!searchRestaurantResult?.aggregatedDiscountInfoV3?.discountTag? null : (<>
                      <h1 className="text-xs font-semibold bg-orange-600 px-2 text-white">{searchRestaurantResult?.aggregatedDiscountInfoV3?.discountTag}</h1>
                      </>)}
                      {!searchRestaurantResult?.aggregatedDiscountInfoV3?.header? null : (<>
                      <h2 className="text-[10px] font-bold text-orange-600 px-2">{searchRestaurantResult?.aggregatedDiscountInfoV3?.header}</h2>
                      </>)}
                      {!searchRestaurantResult?.aggregatedDiscountInfoV3?.subHeader? null : (<>
                      <h3 className="text-[8px] font-semibold text-orange-600 px-2">{searchRestaurantResult?.aggregatedDiscountInfoV3?.subHeader}</h3>
                      </>)}
                    </div>
                    </>)}
                  </div>
                  <div className="ms-4 flex flex-col gap-1" style={{width: "calc(100% - 100px)"}}>
                    <h1 className="text-sm font-bold text-gray-600">{searchRestaurantResult?.name}</h1>
                    <p className="text-sm text-gray-600 font-semibold">
                    ⭐{" "}
                    {searchRestaurantResult?.avgRating ||
                      searchRestaurantResult?.avgRatingString}{" "}
                    {`. ${
                      searchRestaurantResult?.sla.slaString ||
                      searchRestaurantResult?.sla.deliveryTime + "MINS"
                    }`}{" "}{`. ${searchRestaurantResult?.costForTwoMessage}`}
                  </p>
                  {searchRestaurantResult?.cuisines.join(", ").length > 250? (<>
                    <p className="leading-3 text-gray-500 text-xs w-[100%]">
                    {searchRestaurantResult?.cuisines.join(", ").slice(0,250)+'...'}
                  </p>
                  </>) : (<>
                    <p className="leading-3 text-gray-500 text-xs w-[100%]">
                    {searchRestaurantResult?.cuisines.join(", ")}
                  </p>
                  </>)}
                  </div>
                </div>
              {/* ))} */}
            </div>
            </div>
            <div className="mt-10">
            <h1 className="text-2xl font-semibold capitalize text-gray-700">More results like this</h1>
            <div className="flex gap-4 flex-wrap my-4">
              {searchMoreResult.map(({ info }, index) => (
                <div
                  key={index}
                  className="w-[530px] p-4 rounded-2xl border border-gray-600 flex items-center cursor-pointer hover:bg-gray-300" onClick={()=>navigate(`/restaurants/${info.id}`)}
                >
                  <div className="relative w-[100px] h-[100px] flex justify-center">
                    {info.cloudinaryImageId ? (
                      <>
                        <img
                          src={IMG_URL + info.cloudinaryImageId}
                          className="menu-img w-full h-full object-cover rounded-xl"
                          alt=""
                        />
                      </>
                    ) : null}
                    {!info?.aggregatedDiscountInfoV3? null : (<>
                    <div className="absolute bottom-[-6] bg-white rounded-lg shadow-md flex flex-col items-center overflow-hidden">
                      {!info?.aggregatedDiscountInfoV3?.discountTag? null : (<>
                      <h1 className="text-xs font-semibold bg-orange-600 px-2 text-white">{info?.aggregatedDiscountInfoV3?.discountTag}</h1>
                      </>)}
                      {!info?.aggregatedDiscountInfoV3?.header? null : (<>
                      <h2 className="text-[10px] font-bold text-orange-600 px-2">{info?.aggregatedDiscountInfoV3?.header}</h2>
                      </>)}
                      {!info?.aggregatedDiscountInfoV3?.subHeader? null : (<>
                      <h3 className="text-[8px] font-semibold text-orange-600 px-2">{info?.aggregatedDiscountInfoV3?.subHeader}</h3>
                      </>)}
                    </div>
                    </>)}
                  </div>
                  <div className="ms-4 flex flex-col gap-1" style={{width: "calc(100% - 100px)"}}>
                    <h1 className="text-sm font-bold text-gray-600">{info.name}</h1>
                    <p className="text-sm text-gray-600 font-semibold">
                    ⭐{" "}
                    {info.avgRating ||
                      info.avgRatingString}{" "}
                    {`. ${
                      info.sla.slaString ||
                      info.sla.deliveryTime + "MINS"
                    }`}{" "}{`. ${info.costForTwo}`}
                  </p>
                  {info.cuisines.join(", ").length > 250? (<>
                    <p className="leading-3 text-gray-500 text-xs w-[100%]">
                    {info.cuisines.join(", ").slice(0,250)+'...'}
                  </p>
                  </>) : (<>
                    <p className="leading-3 text-gray-500 text-xs w-[100%]">
                    {info.cuisines.join(", ")}
                  </p>
                  </>)}
                  </div>
                </div>
              ))}
            </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Restaurant;
