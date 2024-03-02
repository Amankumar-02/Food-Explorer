import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { modifyCartQuantity, removeCartItem } from "../../reduxFeatures/cartSlice";
import { MENU_IMG_URL } from "../../utils/constants";
import { useNavigate } from "react-router-dom";

function RestaurantFoodCart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storeData = useSelector((state) => state.cartStore.cart);
  // console.log(storeData);

  const modifyQuantity = (task, name) => {
    dispatch(modifyCartQuantity({ nameDis: name, taskDis: task }));
    if(task === "decrease" && storeData.filter(item=>item?.info?.name === name)[0]?.info?.quantity === 1){
      console.log("first")
      dispatch(removeCartItem(name))
    }
  };
  const [cartToggle, setCartToggle] = useState({
    name: "⬆️",
    type: true,
    display: "block",
  });
  const cartToggleEvent = () => {
    if (cartToggle.type === true) {
      setCartToggle({ name: "⬇️", type: false, display: "hidden" });
    } else {
      setCartToggle({ name: "⬆️", type: true, display: "block" });
    }
  };

  return (
    <>
      {storeData.length === 0 ? (
        <div className="w-full mt-10 flex flex-col items-center justify-center">
          <img
            src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0"
            alt=""
            className="w-[360px]"
          />
          <h1 className="mt-4 text-2xl font-semibold text-gray-600">
            Your cart is empty
          </h1>
          <p className="text-lg text-gray-500">
            You can go to home page to view more restaurants
          </p>
        </div>
      ) : (
        <>
          <div className="m-8">
            <div className="px-10 pb-4 shadow-md flex items-center justify-between">
              <h1 className="text-xl font-bold">Cart Items</h1>
              <button onClick={cartToggleEvent}>{cartToggle.name}</button>
            </div>
            <div className={`${cartToggle.display}`}>
              {storeData.map((item, index) => (
                <div
                  key={index}
                  className="relative flex justify-between items-center py-4 px-8 border border-x-0"
                >
                  <ul className="flex flex-col gap-2 justify-center list-none w-[70%]">
                    <li className="text-xl font-bold text-gray-700 cursor-pointer" onClick={()=>navigate(`/restaurants/${item?.info?.restaurantId}`)}>{item?.info?.restaurantName}</li>
                    {item?.info?.itemAttribute?.vegClassifier === "VEG" ? (
                      <li className="w-fit border border-green-500 text-[8px]">
                        🟢
                      </li>
                    ) : null}
                    {item?.info?.itemAttribute?.vegClassifier === "NONVEG" ? (
                      <li className="w-fit border border-red-500 text-[8px]">
                        🔺
                      </li>
                    ) : null}
                    <div>
                      <li className="text-lg font-bold">
                        {item?.info?.name}
                      </li>
                      <li className="text-lg font-bold text-gray-600">
                        ₹
                        {item?.info?.price / 100*item?.info?.quantity ||
                          item?.info?.defaultPrice / 100*item?.info?.quantity}
                      </li>
                    </div>
                    <li className="leading-4 text-sm">{item?.info?.description}</li>
                    <li>Quantity: <span className="text-red-500 font-semibold">{item?.info?.quantity}</span> items</li>
                    <li>
                      <button className="bg-red-500 px-4 text-white font-semibold rounded-xl" onClick={()=>dispatch(removeCartItem(item?.info?.name))}>Remove</button>
                    </li>
                  </ul>
                  <div className="relative w-[150px] h-[120px] flex justify-center">
                    {item?.info?.imageId ? (
                      <img
                        src={MENU_IMG_URL + item?.info?.imageId}
                        className="menu-img w-full h-full rounded-xl object-cover"
                      />
                    ) : null}
                    <div className="absolute bottom-[-10%] bg-white z-[99] flex border-2 rounded-xl overflow-hidden">
                      {storeData.filter(
                        (item2) => item2.info.name === item?.info?.name
                      )[0]?.info?.quantity > 0 ? (
                        <>
                          <button
                            className="px-2 hover:bg-gray-300"
                            onClick={() => {
                              modifyQuantity("decrease", item?.info?.name);
                            }}
                          >
                            -
                          </button>
                        </>
                      ) : null}

                      <button
                        className="px-2 hover:bg-green-500 hover:text-white"
                      >
                        {item?.info?.quantity}
                      </button>
                      {storeData.filter(
                        (item2) => item2.info.name === item?.info?.name
                      )[0]?.info?.quantity > 0 ? (
                        <>
                          <button
                            className="px-2 hover:bg-gray-300"
                            onClick={() => {
                              modifyQuantity("increase", item?.info?.name);
                            }}
                          >
                            +
                          </button>
                        </>
                      ) : null}
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

export default RestaurantFoodCart;
