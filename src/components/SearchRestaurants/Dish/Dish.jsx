import React, { useEffect, useState } from "react";
import 'remixicon/fonts/remixicon.css'
import { useNavigate } from "react-router-dom";
import { sorting, MENU_IMG_URL } from "../../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  addCartItem,
  modifyCartQuantity,
  removeCartItem,
} from "../../../reduxFeatures/cartSlice";
import toast from "react-hot-toast";

function Dish({ searchFoodResult, searchName }) {
  const [dishFilter, setDishFilter] = useState([]);
  const navigate = useNavigate();
  const storeData = useSelector((state) => state.cartStore.cart);
  const dispatch = useDispatch();

  // setting the props Data
  useEffect(() => {
    if (searchFoodResult) {
      setDishFilter(
        searchFoodResult
          .filter(
            (item) =>
              item?.card?.card?.["@type"] ===
              "type.googleapis.com/swiggy.presentation.food.v2.Dish"
          )
          .slice(0, 30)
      );
    }
  }, [searchFoodResult]);
  // console.log("dish", dishFilter[0]?.card?.card.info.description.slice(0,50));

  // sorting event
  const sortEvent = (purpose) => {
    const newFilter = searchFoodResult
      .filter(
        (item) =>
          item?.card?.card?.["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.Dish"
      )
      .slice(0, 30);
    if (purpose === "all") {
      setDishFilter(newFilter);
    } else if (purpose === "ratDesc") {
      const sortData = newFilter.sort(
        (a, b) =>
          Number(b?.card?.card?.info?.ratings?.aggregatedRating?.rating) -
          Number(a?.card?.card?.info?.ratings?.aggregatedRating?.rating)
      );
      setDishFilter(sortData);
    } else if (purpose === "ratAsc") {
      const sortData = newFilter.sort(
        (a, b) =>
          Number(a?.card?.card?.info?.ratings?.aggregatedRating?.rating) -
          Number(b?.card?.card?.info?.ratings?.aggregatedRating?.rating)
      );
      setDishFilter(sortData);
    } else if (purpose === "PriDesc") {
      const sortData = newFilter.sort(
        (a, b) =>
          b?.card?.card?.info?.price / 100 - a?.card?.card?.info?.price / 100
      );
      setDishFilter(sortData);
    } else if (purpose === "PriAsc") {
      const sortData = newFilter.sort(
        (a, b) =>
          a?.card?.card?.info?.price / 100 - b?.card?.card?.info?.price / 100
      );
      setDishFilter(sortData);
    }
  };

  //adding item to cart event
  const cartEvent = ({
    nameLocation,
    dispatchLocation,
    restLocation,
    restId,
  }) => {
    if (
      !storeData.filter((item) => item?.info?.name === nameLocation)[0]?.info
        ?.quantity ||
      storeData.filter((item) => item?.info?.name === nameLocation)[0]?.info
        ?.quantity < 0
    ) {
      dispatch(
        addCartItem({
          ...dispatchLocation?.info,
          quantity: 1,
          restaurantName: restLocation,
          restaurantId: restId,
        })
      );
      toast.success("Item Added SuccessFully");
    }
  };

  //setting the item quantity event
  const modifyQuantity = (task, name) => {
    dispatch(modifyCartQuantity({ nameDis: name, taskDis: task }));
    if (
      task === "decrease" &&
      storeData.filter((item) => item?.info?.name === name)[0]?.info
        ?.quantity === 1
    ) {
      console.log("first");
      dispatch(removeCartItem(name));
      toast.success("Item Remove SuccessFully");
    }
  };

  return (
    <>
      {!dishFilter ? null : (
        <>
          <div className="my-6 lg:my-10 m-auto w-[94%] lg:w-[80%]">
            <h1 className="text-xl font-semibold capitalize text-gray-700">
              Search Results: <span className="text-2xl">{searchName}</span>
            </h1>
            <div className="flex flex-wrap gap-2 lg:gap-4 items-center mt-4">
              <h1 className="text-lg sm:text-xl font-semibold text-gray-700">
                Filter:
              </h1>

              {sorting.map(({ title, purpose }, index) => (
                <button
                  key={index}
                  className="border border-black py-1 px-3 sm:px-4 rounded-xl hover:bg-gray-300 font-semibold text-sm sm:text-base"
                  onClick={() => sortEvent(purpose)}
                >
                  {title}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4 my-10">
              {dishFilter.map(({ card }, index) => (
                <div
                  key={index}
                  className="w-full p-4 rounded-2xl border border-gray-600 hover:bg-gray-200"
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
                      <i className="ri-star-fill text-yellow-500 text-lg"></i>{" "}
                        {card?.card.restaurant.info.avgRating ||
                          card?.card.restaurant.info.avgRatingString}{" "}
                        {`. ${
                          card?.card.restaurant.info.sla.slaString ||
                          card?.card.restaurant.info.sla.deliveryTime + "MINS"
                        }`}
                      </p>
                    </div>
                    <button className="hover:scale-[1.1]"><i className="ri-arrow-right-line text-lg"></i></button>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <div className="flex flex-col gap-2" style={{width: "calc(100% - 100px)"}}>
                      <div className="flex gap-4 items-center">
                        {card?.card?.info?.isVeg ? (
                          <p className="w-fit border border-green-500 text-[8px]">
                            🟢
                          </p>
                        ) : (
                          <p className="w-fit border border-red-500 text-[8px]">
                            🔺
                          </p>
                        )}
                        {card?.card?.info?.ribbon?.text && (
                          <p className="text-xs font-semibold text-yellow-600">
                            <i className="ri-star-fill text-yellow-500 text-lg"></i> {card?.card?.info?.ribbon?.text}
                          </p>
                        )}
                      </div>

                      <div>
                        <h1 className="text-sm font-bold text-gray-600">
                          {card?.card.info.name}
                        </h1>
                        <p className="text-[12px] text-gray-600">
                        <i className="ri-star-fill text-yellow-500 text-lg"></i> {card?.card?.info.ratings.aggregatedRating.rating}
                        </p>
                        <h2 className="text-sm font-semibold text-gray-600">
                          ₹ {card?.card.info.price / 100}
                        </h2>
                      </div>

                      <p className="leading-3 text-gray-500 text-xs w-[80%]">
                        {card?.card?.info?.description?.length > 100
                          ? `${card?.card?.info?.description?.slice(0, 100)}...`
                          : card?.card?.info?.description}
                      </p>

                      <button
                        className="w-fit font-bold text-gray-700 hover:underline"
                        onClick={() =>
                          navigate(
                            `/restaurants/${card?.card.restaurant.info.id}`
                          )
                        }
                      >
                        More
                      </button>
                    </div>

                    <div>
                      <div className="relative w-[120px] h-[100px] flex justify-center">
                        {card?.card.info.imageId && (
                          <img
                            src={MENU_IMG_URL + card?.card.info.imageId}
                            className="w-full h-full object-cover rounded-xl hover:scale-[1.08] transition-all"
                            alt=""
                          />
                        )}

                        <div className="absolute bottom-[-10%] bg-white z-[99] flex border-2 rounded-xl overflow-hidden">
                          {storeData.filter(
                            (item) => item?.info?.name === card?.card.info.name
                          )[0]?.info?.quantity > 0 ? (
                            <>
                              <button
                                className="px-2 hover:bg-gray-300"
                                onClick={() =>
                                  modifyQuantity(
                                    "decrease",
                                    card?.card.info.name
                                  )
                                }
                              >
                                -
                              </button>
                            </>
                          ) : null}

                          <button
                            className="px-2 hover:bg-green-500 hover:text-white"
                            onClick={() => {
                              cartEvent({
                                nameLocation: card?.card.info.name,
                                dispatchLocation: card?.card,
                                restLocation: card?.card.restaurant.info.name,
                                restId: card?.card.restaurant.info.id,
                              });
                            }}
                          >
                            {storeData.filter(
                              (item) =>
                                item?.info?.name === card?.card.info.name
                            )[0]?.info?.quantity > 0
                              ? storeData.filter(
                                  (item) =>
                                    item?.info?.name === card?.card.info.name
                                )[0]?.info?.quantity
                              : "Add"}
                          </button>

                          {storeData.filter(
                            (item) => item?.info?.name === card?.card.info.name
                          )[0]?.info?.quantity > 0 && (
                            <button
                              className="px-2 hover:bg-gray-300"
                              onClick={() =>
                                modifyQuantity("increase", card?.card.info.name)
                              }
                            >
                              +
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
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

export default Dish;
