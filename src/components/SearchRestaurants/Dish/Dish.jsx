import React from "react";
import { useNavigate } from "react-router-dom";
// import { MENU_IMG_URL } from '../../../utils/constants';
import { useDispatch, useSelector } from "react-redux";
import { addCartItem, modifyCartQuantity, removeCartItem } from "../../../reduxFeatures/cartSlice";

function Dish({ searchFetchedData }) {
  const navigate = useNavigate();
  
  const dishFilter = searchFetchedData.filter(
    (item) =>
      item?.card?.card?.["@type"] ===
      "type.googleapis.com/swiggy.presentation.food.v2.Dish"
  );

//   console.log("dish", dishFilter[0]?.card?.card);

  const imgUrl =
    "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/";

    const dispatch = useDispatch();
    const storeData = useSelector((state) => state.cartStore.cart);

    const cartEvent = ({nameLocation, dispatchLocation, restLocation})=>{
        if(!storeData.filter(item=>item?.info?.name === nameLocation)[0]?.info?.quantity || storeData.filter(item=>item?.info?.name === nameLocation)[0]?.info?.quantity < 0){
          dispatch(addCartItem({...dispatchLocation?.info, quantity : 1, restaurantName: restLocation}));
        }
      };
    
      const modifyQuantity = (task, name)=>{
        dispatch(modifyCartQuantity({nameDis:name, taskDis:task}));
        if(task === "decrease" && storeData.filter(item=>item?.info?.name === name)[0]?.info?.quantity === 1){
          console.log("first")
          dispatch(removeCartItem(name))
        }
      };

  return (
    <>
      <div className="m-auto w-[80%]">
        <h1 className="text-2xl font-semibold">Dishes Found</h1>
        <div className="flex gap-4 flex-wrap my-4">
          {dishFilter.map(({ card }, index) => (
            <div
              key={index}
              className="w-[530px] p-4 rounded-2xl border border-gray-600"
            >
              <div
                className="flex justify-between items-center cursor-pointer pb-2 border border-dotted border-gray-600 border-x-0 border-t-0"
                onClick={() =>
                  navigate(`/restaurants/${card?.card.restaurant.info.id}`)
                }
              >
                <div>
                  <h1 className="text-sm font-bold text-gray-600">
                    By {card?.card.restaurant.info.name}
                  </h1>
                  <p className="text-xs text-gray-600">
                    ⭐{" "}
                    {card?.card.restaurant.info.avgRating ||
                      card?.card.restaurant.info.avgRatingString}{" "}
                    {`. ${
                      card?.card.restaurant.info.sla.slaString ||
                      card?.card.restaurant.info.sla.deliveryTime + "min"
                    }`}
                  </p>
                </div>
                <button>➡️</button>
              </div>
              <div className="flex justify-between items-center pt-2">
                <div className="flex flex-col gap-2">
                  <div className="flex gap-4 items-center">
                    {card?.card?.info?.isVeg ? (
                      <>
                        <p className="w-fit border border-green-500 text-[8px]">
                          🟢
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="w-fit border border-red-500 text-[8px]">
                          🔺
                        </p>
                      </>
                    )}
                    {card?.card?.info?.ribbon?.text ? (
                      <p className="text-xs font-semibold text-yellow-600">
                        ⭐ {card?.card?.info?.ribbon?.text}
                      </p>
                    ) : null}
                  </div>
                  <div>
                    <h1 className="text-sm font-bold text-gray-600">
                      {card?.card.info.name}
                    </h1>
                    <h2 className="text-sm font-semibold text-gray-600">
                      ₹ {card?.card.info.price / 100}
                    </h2>
                  </div>
                  <p className="leading-3 text-gray-500 text-xs w-[70%]">
                    {card?.card.info.description}
                  </p>
                  <button
                    className="w-fit font-bold text-gray-700"
                    onClick={() =>
                      navigate(`/restaurants/${card?.card.restaurant.info.id}`)
                    }
                  >
                    More
                  </button>
                </div>
                <div>
                  <div className="relative w-[100px] h-[100px] flex justify-center">
                    {card?.card.info.imageId ? (
                      <>
                        <img
                          src={imgUrl + card?.card.info.imageId}
                          className="menu-img w-full h-full object-cover rounded-xl"
                          alt=""
                        />
                      </>
                    ) : null}

                    <div 
                    className="absolute bottom-[-10%] bg-white z-[99] flex border-2 rounded-xl overflow-hidden">
                      {storeData.filter(
                        (item) => item?.info?.name === card?.card.info.name
                      )[0]?.info?.quantity > 0 ? (
                        <>
                          <button
                            className="px-2 hover:bg-gray-300"
                            onClick={() => {
                              modifyQuantity("decrease", card?.card.info.name);
                            }}
                          >
                            -
                          </button>
                        </>
                      ) : null}

                      <button
                        className="px-2 hover:bg-green-500 hover:text-white"
                        onClick={() => {
                          cartEvent({nameLocation: card?.card.info.name, dispatchLocation: card?.card, restLocation: card?.card.restaurant.info.name});
                        }}
                      >
                        {storeData.filter(
                          (item) => item?.info?.name === card?.card.info.name
                        )[0]?.info?.quantity > 0 ? (
                          <>
                            {
                              storeData.filter(
                                (item) => item?.info?.name === card?.card.info.name
                              )[0]?.info?.quantity
                            }
                          </>
                        ) : (
                          <>Add</>
                        )}
                      </button>

                      {storeData.filter(
                        (item) => item?.info?.name === card?.card.info.name
                      )[0]?.info?.quantity > 0 ? (
                        <>
                          <button
                            className="px-2 hover:bg-gray-300"
                            onClick={() => {
                              modifyQuantity("increase", card?.card.info.name);
                            }}
                          >
                            +
                          </button>
                        </>
                      ) : null}
                    </div>

                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Dish;
