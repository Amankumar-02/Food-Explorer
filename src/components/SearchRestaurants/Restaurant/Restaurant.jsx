import React, { useEffect, useState } from "react";
import 'remixicon/fonts/remixicon.css'
import { useNavigate } from "react-router-dom";
import { IMG_URL } from "../../../utils/constants";

function Restaurant({ searchRestaurantResult, searchMoreResult, searchName }) {
  const navigate = useNavigate();
  console.log("first", searchRestaurantResult);
  console.log("second", searchMoreResult);

  return (
    <>
      {!searchRestaurantResult ? null : (
        <>
          <div className="my-6 lg:my-10 m-auto w-[94%] lg:w-[80%]">
            <div id="exactRestSearchResult">
              <h1 className="text-xl font-semibold capitalize text-gray-700">
                Search Results: <span className="text-2xl">{searchName}</span>
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4 my-10">
                {/* when search only one result i get */}
                {/* {searchRestaurantResult.map((info, index) => ( */}
                <div
                  // key={index}
                  className="w-full p-4 rounded-2xl border border-gray-600 flex items-center cursor-pointer hover:bg-gray-300"
                  onClick={() =>
                    navigate(`/restaurants/${searchRestaurantResult?.id}`)
                  }
                >
                  <div className="relative w-[120px] h-[100px] flex justify-center">
                    {searchRestaurantResult?.cloudinaryImageId ? (
                      <>
                        <img
                          src={
                            IMG_URL + searchRestaurantResult?.cloudinaryImageId
                          }
                          className="w-full h-full object-cover rounded-xl hover:scale-[1.08] transition-all"
                          alt=""
                        />
                      </>
                    ) : null}
                    {!searchRestaurantResult?.aggregatedDiscountInfoV3 ? null : (
                      <>
                        <div className="absolute bottom-[-6] bg-white rounded-lg shadow-md flex flex-col items-center overflow-hidden">
                          {!searchRestaurantResult?.aggregatedDiscountInfoV3
                            ?.discountTag ? null : (
                            <>
                              <h1 className="text-xs font-semibold bg-orange-600 px-2 text-white">
                                {
                                  searchRestaurantResult
                                    ?.aggregatedDiscountInfoV3?.discountTag
                                }
                              </h1>
                            </>
                          )}
                          {!searchRestaurantResult?.aggregatedDiscountInfoV3
                            ?.header ? null : (
                            <>
                              <h2 className="text-[10px] font-bold text-orange-600 px-2">
                                {
                                  searchRestaurantResult
                                    ?.aggregatedDiscountInfoV3?.header
                                }
                              </h2>
                            </>
                          )}
                          {!searchRestaurantResult?.aggregatedDiscountInfoV3
                            ?.subHeader ? null : (
                            <>
                              <h3 className="text-[8px] font-semibold text-orange-600 px-2">
                                {
                                  searchRestaurantResult
                                    ?.aggregatedDiscountInfoV3?.subHeader
                                }
                              </h3>
                            </>
                          )}
                        </div>
                      </>
                    )}
                  </div>

                  <div className="ms-4 flex flex-col gap-1" style={{width: "calc(100% - 100px)"}}>
                    <h1 className="text-sm font-bold text-gray-600">
                      {searchRestaurantResult?.name}
                    </h1>
                    <p className="text-sm text-gray-600 font-semibold">
                    <i className="ri-star-fill text-yellow-500 text-lg"></i>{" "}
                      {searchRestaurantResult?.avgRating ||
                        searchRestaurantResult?.avgRatingString}{" "}
                      {`. ${
                        searchRestaurantResult?.sla.slaString ||
                        searchRestaurantResult?.sla.deliveryTime + "MINS"
                      }`}
                    </p>
                      <p className="text-sm text-gray-600 font-semibold">({searchRestaurantResult?.costForTwoMessage})</p>
                    <p className="leading-3 text-gray-500 text-xs">
                      {searchRestaurantResult?.cuisines.join(", ").length > 250
                        ? `${searchRestaurantResult?.cuisines
                            .join(", ")
                            .slice(0, 250)}...`
                        : searchRestaurantResult?.cuisines.join(", ")}
                    </p>
                  </div>
                </div>
                {/* ))} */}
              </div>
            </div>


            <div className="mt-20">
              <h1 className="text-xl font-semibold capitalize text-gray-700">
                More results like this
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4 my-10">
                {searchMoreResult.map(({ info }, index) => (
                  <div
                    key={index}
                    className="w-full p-4 rounded-2xl border border-gray-600 flex items-center cursor-pointer hover:bg-gray-300"
                    onClick={() => navigate(`/restaurants/${info.id}`)}
                  >
                    <div className="relative w-[120px] h-[100px] flex justify-center">
                      {info.cloudinaryImageId ? (
                        <>
                          <img
                            src={IMG_URL + info.cloudinaryImageId}
                            className="w-full h-full object-cover rounded-xl hover:scale-[1.08] transition-all"
                            alt=""
                          />
                        </>
                      ) : null}
                      {!info?.aggregatedDiscountInfoV3 ? null : (
                        <>
                          <div className="absolute bottom-[-6] bg-white rounded-lg shadow-md flex flex-col items-center overflow-hidden">
                            {!info?.aggregatedDiscountInfoV3
                              ?.discountTag ? null : (
                              <>
                                <h1 className="text-xs font-semibold bg-orange-600 px-2 text-white">
                                  {info?.aggregatedDiscountInfoV3?.discountTag}
                                </h1>
                              </>
                            )}
                            {!info?.aggregatedDiscountInfoV3?.header ? null : (
                              <>
                                <h2 className="text-[10px] font-bold text-orange-600 px-2">
                                  {info?.aggregatedDiscountInfoV3?.header}
                                </h2>
                              </>
                            )}
                            {!info?.aggregatedDiscountInfoV3
                              ?.subHeader ? null : (
                              <>
                                <h3 className="text-[8px] font-semibold text-orange-600 px-2">
                                  {info?.aggregatedDiscountInfoV3?.subHeader}
                                </h3>
                              </>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                    <div
                      className="ms-4 flex flex-col gap-1" style={{width: "calc(100% - 100px)"}}
                    >
                      <h1 className="text-sm font-bold text-gray-600">
                        {info.name}
                      </h1>
                      <p className="text-sm text-gray-600 font-semibold">
                      <i className="ri-star-fill text-yellow-500 text-lg"></i> {info.avgRating || info.avgRatingString}{" "}
                        {`. ${
                          info.sla.slaString || info.sla.deliveryTime + "MINS"
                        }`}
                      </p>
                      <p className="text-sm text-gray-600 font-semibold">({info.costForTwo})</p>
                      <p className="leading-3 text-gray-500 text-xs">
                      {info?.cuisines.join(", ").length > 250
                        ? 
                        `${searchRestaurantResult?.cuisines
                            .join(", ")
                            .slice(0, 250)}...`
                        : 
                        info?.cuisines.join(", ")}
                    </p>
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
