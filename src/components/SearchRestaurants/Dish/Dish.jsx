import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { sorting, MENU_IMG_URL } from "../../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem, modifyCartQuantity, removeCartItem
} from "../../../reduxFeatures/cartSlice";

function Dish({ searchFetchedData, searchName }) {
    const [dishFilter, setDishFilter] = useState([]);
  const navigate = useNavigate();
  const storeData = useSelector((state) => state.cartStore.cart);
  const dispatch = useDispatch();

  // setting the props Data
  useEffect(()=>{
    if(searchFetchedData){
        setDishFilter(searchFetchedData.filter(
            (item) =>
            item?.card?.card?.["@type"] ===
            "type.googleapis.com/swiggy.presentation.food.v2.Dish"
            ).slice(0,30))
    }
  }, [searchFetchedData])
//   console.log("dish", dishFilter[0]?.card?.card);

  // sorting event
  const sortEvent = (purpose) => {
    const newFilter = searchFetchedData.filter(
        (item) =>
          item?.card?.card?.["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.Dish"
      ).slice(0,30);
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
  const cartEvent = ({ nameLocation, dispatchLocation, restLocation, restId }) => {
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
    }
  };

  return (
    <>
      {!dishFilter? null : (<>
        <div className="m-auto w-[80%]">
        <h1 className="text-2xl font-semibold capitalize">{searchName}</h1>
        <div className="flex gap-4 items-center mt-4">
          {sorting.map(({ title, purpose }, index) => (
            <button
              key={index}
              className="border border-black px-4 rounded-xl"
              onClick={() => sortEvent(purpose)}
            >
              {title}
            </button>
          ))}
        </div>
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
                          src={MENU_IMG_URL+card?.card.info.imageId}
                          className="menu-img w-full h-full object-cover rounded-xl"
                          alt=""
                        />
                      </>
                    ) : null}

                    <div className="absolute bottom-[-10%] bg-white z-[99] flex border-2 rounded-xl overflow-hidden">
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
                          cartEvent({
                            nameLocation: card?.card.info.name,
                            dispatchLocation: card?.card,
                            restLocation: card?.card.restaurant.info.name,
                            restId: card?.card.restaurant.info.id,
                          });
                        }}
                      >
                        {storeData.filter(
                          (item) => item?.info?.name === card?.card.info.name
                        )[0]?.info?.quantity > 0 ? (
                          <>
                            {
                              storeData.filter(
                                (item) =>
                                  item?.info?.name === card?.card.info.name
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
      </>)}
    </>
  );
}

export default Dish;
