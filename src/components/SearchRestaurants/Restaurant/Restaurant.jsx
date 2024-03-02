import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import { IMG_URL } from "../../../utils/constants";
// import { seDispatch, useDispatch, useSelector } from "react-redux";
// import { addCartItem, modifyCartQuantity, removeCartItem } from "../../../reduxFeatures/cartSlice";

function Restaurant({ searchRestaurantResult, searchMoreResult, searchName }) {
    // rest, food ==> array[0,1]
    const navigate = useNavigate();
    // const storeData = useSelector((state)=>state.cartStore.cart);
    // const dispatch = useDispatch();
    console.log("first",searchRestaurantResult)
    console.log("second",searchMoreResult)

  return (
    <>
      {!searchRestaurantResult ? null : (
        <>
          <div className="m-auto w-[80%]">
            <h1 className="text-2xl font-semibold capitalize">More results like this</h1>
            <div className="flex gap-4 flex-wrap my-4">
              {searchMoreResult.map(({ info }, index) => (
                <div
                  key={index}
                  className="w-[530px] p-4 rounded-2xl border border-gray-600 flex items-center"
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
                  </div>
                  <div className="ms-4 flex flex-col gap-1">
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
                  {info.cuisines.join(", ").length > 70? (<>
                    <p className="leading-3 text-gray-500 text-xs w-[100%]">
                    {info.cuisines.join(", ").slice(0,70)+'...'}
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
        </>
      )}
    </>
  );
}

export default Restaurant;
