import React from 'react'
import 'remixicon/fonts/remixicon.css'
import { useNavigate } from 'react-router-dom';
import { IMG_URL } from "../../../utils/constants";

function RestaurantError({searchMoreResult, searchName}) {
    const navigate = useNavigate();
    console.log(searchMoreResult)
  return (
    <>
    {!searchMoreResult? null : (
        <>
            <div className="my-6 lg:my-10 m-auto w-[94%] lg:w-[80%]">
            <h1 className="text-xl font-semibold capitalize text-gray-700">More results like this</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4 my-10">
              {searchMoreResult.map(({ card }, index) => (
                <div
                  key={index}
                  className="w-full p-4 rounded-2xl border border-gray-600 flex items-center cursor-pointer hover:bg-gray-300" onClick={()=>navigate(`/restaurants/${card?.card?.info?.id}`)}
                >
                  <div className="relative w-[120px] h-[100px] flex justify-center">
                    {card?.card?.info?.cloudinaryImageId ? (
                      <>
                        <img
                          src={IMG_URL + card?.card?.info?.cloudinaryImageId}
                          className="w-full h-full object-cover rounded-xl hover:scale-[1.08] transition-all"
                          alt=""
                        />
                      </>
                    ) : null}
                    {!card?.card?.info?.aggregatedDiscountInfoV3? null : (<>
                    <div className="absolute bottom-[-6] bg-white rounded-lg shadow-md flex flex-col items-center overflow-hidden">
                      {!card?.card?.info?.aggregatedDiscountInfoV3?.discountTag? null : (<>
                      <h1 className="text-xs font-semibold bg-orange-600 px-2 text-white">{card?.card?.info?.aggregatedDiscountInfoV3?.discountTag}</h1>
                      </>)}
                      {!card?.card?.info?.aggregatedDiscountInfoV3?.header? null : (<>
                      <h2 className="text-[10px] font-bold text-orange-600 px-2">{card?.card?.info?.aggregatedDiscountInfoV3?.header}</h2>
                      </>)}
                      {!card?.card?.info?.aggregatedDiscountInfoV3?.subHeader? null : (<>
                      <h3 className="text-[8px] font-semibold text-orange-600 px-2">{card?.card?.info?.aggregatedDiscountInfoV3?.subHeader}</h3>
                      </>)}
                    </div>
                    </>)}
                  </div>
                  <div className="ms-4 flex flex-col gap-1" style={{width: "calc(100% - 100px)"}}>
                    <h1 className="text-sm font-bold text-gray-600">{card?.card?.info?.name}</h1>
                    <p className="text-sm text-gray-600 font-semibold">
                    <i className="ri-star-fill text-yellow-500 text-lg"></i>{" "}
                    {card?.card?.info?.avgRating ||
                      card?.card?.info?.avgRatingString}{" "}
                    {`. ${
                      card?.card?.info?.sla.slaString ||
                      card?.card?.info?.sla.deliveryTime + "MINS"
                    }`}
                  </p>
                  <p className="text-sm text-gray-600 font-semibold">(Cost For two {`${card?.card?.info?.costForTwo / 100}`})</p>
                  <p className="leading-3 text-gray-500 text-xs">
                      {card?.card?.info?.cuisines.join(", ").length > 250
                        ? 
                        `${searchRestaurantResult?.cuisines
                            .join(", ")
                            .slice(0, 250)}...`
                        : 
                        card?.card?.info?.cuisines.join(", ")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
    )}
    </>
  )
}

export default RestaurantError