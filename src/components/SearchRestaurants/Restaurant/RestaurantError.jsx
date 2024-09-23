import React from 'react'
import { useNavigate } from 'react-router-dom';
import { IMG_URL } from "../../../utils/constants";

function RestaurantError({searchMoreResult, searchName}) {
    const navigate = useNavigate();
    console.log(searchMoreResult)
  return (
    <>
    {!searchMoreResult? null : (
        <>
            <div className="my-10 m-auto w-[94%] lg:w-[80%]">
            {/* <div className=""> */}
            <h1 className="text-2xl font-semibold capitalize text-gray-700">More results like this</h1>
            <div className="flex gap-4 flex-wrap my-4">
              {searchMoreResult.map(({ card }, index) => (
                <div
                  key={index}
                  className="w-[370px] lg:w-[530px] p-4 rounded-2xl border border-gray-600 flex items-center cursor-pointer hover:bg-gray-300" onClick={()=>navigate(`/restaurants/${card?.card?.info?.id}`)}
                >
                  <div className="relative w-[100px] h-[100px] flex justify-center">
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
                    ⭐{" "}
                    {card?.card?.info?.avgRating ||
                      card?.card?.info?.avgRatingString}{" "}
                    {`. ${
                      card?.card?.info?.sla.slaString ||
                      card?.card?.info?.sla.deliveryTime + "MINS"
                    }`}{" "}{`. ${card?.card?.info?.costForTwo}`}
                  </p>
                  {card?.card?.info?.cuisines.join(", ").length > 250? (<>
                    <p className="leading-3 text-gray-500 text-xs w-[100%]">
                    {card?.card?.info?.cuisines.join(", ").slice(0,250)+'...'}
                  </p>
                  </>) : (<>
                    <p className="leading-3 text-gray-500 text-xs w-[100%]">
                    {card?.card?.info?.cuisines.join(", ")}
                  </p>
                  </>)}
                  </div>
                </div>
              ))}
            </div>
            {/* </div> */}
          </div>
        </>
    )}
    </>
  )
}

export default RestaurantError