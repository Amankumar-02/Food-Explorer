import React, { useState } from "react";
import "remixicon/fonts/remixicon.css";
import { useSelector, useDispatch } from "react-redux";
import {
  modifyCartQuantity,
  removeCartItem,
  clearCartItems,
} from "../../reduxFeatures/cartSlice";
import { MENU_IMG_URL } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function RestaurantFoodCart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storeData = useSelector((state) => state.cartStore.cart);
  const [checkout, setCheckout] = useState(false);
  console.log(storeData);

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
  const [cartToggle, setCartToggle] = useState({
    iconClass: `ri-arrow-up-s-line text-xl`,
    type: true,
    display: "block",
  });
  const cartToggleEvent = () => {
    if (cartToggle.type === true) {
      setCartToggle({
        iconClass: `ri-arrow-down-s-line text-xl`,
        type: false,
        display: "hidden",
      });
    } else {
      setCartToggle({
        iconClass: `ri-arrow-up-s-line text-xl`,
        type: true,
        display: "block",
      });
    }
  };

  return (
    <>
      {}
      {storeData.length === 0 ? (
        checkout ? (
          <>
            <div className="my-6 lg:my-10 m-auto w-[94%] lg:w-[80%] min-h-[80vh] flex flex-col gap-4 items-center justify-center">
              <img
                src="https://clipart-library.com/images/Lcd5doyqi.png"
                alt=""
                className="w-[80px] lg:w-[100px]"
              />
              <h1 className="mt-4 text-2xl font-semibold text-gray-600">
                Order Placed!
              </h1>
              <p className="text-lg text-gray-500">
              Thank you for your order
              </p>
              <p className="text-lg text-gray-500 font-semibold">
              Order Id - {Math.floor(Math.random()*999999)}
              </p>
              <button className="p-2 bg-orange-400 rounded-lg text-white font-semibold text-lg lg:text-xl" onClick={()=>{navigate("/")}}>Go to home</button>
            </div>
          </>
        ) : (
          <>
            <div className="my-6 lg:my-10 m-auto w-[94%] lg:w-[80%] min-h-[80vh] flex flex-col items-center justify-center">
              <img
                src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0"
                alt=""
                className="w-[250px] lg:w-[360px]"
              />
              <h1 className="mt-4 text-2xl font-semibold text-gray-600">
                Your cart is empty
              </h1>
              <p className="text-lg text-gray-500 text-center">
                You can go to home page to view more restaurants
              </p>
            </div>
          </>
        )
      ) : (
        <>
          {/* <div className="my-6 lg:my-10 m-auto w-[94%] lg:w-[80%] flex gap-4">
          <div className="min-h-[300px]">
            <div className="px-10 py-4 shadow-md flex items-center justify-between bg-gray-300 rounded-xl">
              <h1 className="text-xl font-bold">Cart Items</h1>
              <button onClick={cartToggleEvent}><i className={cartToggle.iconClass}></i></button>
            </div>
            <div className={`${cartToggle.display}`}>
              {storeData.map((item, index) => (
                <div
                  key={index}
                  className="relative flex justify-between items-center py-4 px-8 border border-x-0 hover:bg-gray-200 rounded-xl"
                >
                  <ul className="flex flex-col gap-2 justify-center list-none w-[70%]">
                    <li className="text-xl font-bold text-gray-700 cursor-pointer" onClick={()=>navigate(`/restaurants/${item?.info?.restaurantId}`)}>By {item?.info?.restaurantName}</li>
                    {item?.info?.itemAttribute?.vegClassifier === "VEG" || item?.info?.isVeg === 1 ? (
                      <li className="w-fit border border-green-500 text-[8px]">
                        🟢
                      </li>
                    ) : null}
                    {item?.info?.itemAttribute?.vegClassifier === "NONVEG" || !item?.info?.isVeg ? (
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
                      <button className="bg-red-500 px-4 text-white font-semibold rounded-xl" onClick={()=>{dispatch(removeCartItem(item?.info?.name)); toast.success("Item Remove SuccessFully")}}>Remove</button>
                    </li>
                  </ul>
                  <div className="relative w-[150px] h-[120px] flex justify-center">
                    {item?.info?.imageId ? (
                      <img
                        src={MENU_IMG_URL + item?.info?.imageId}
                        className="w-full h-full rounded-xl object-cover hover:scale-[1.08] transition-all"
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
          <div className="relative px-6">
            <div className="sticky top-[135px] lg:top-[90px] right-0 flex gap-4 flex-col items-center">
            <button className="bg-red-500 w-full py-2 rounded-2xl text-white font-semibold text-lg" onClick={()=>{dispatch(clearCartItems()); toast.success("Your Order is Placed Successfully")}}>Checkout</button>
            <div className="w-full">
              <h1>PRICE DETAILS</h1>
              <div className="flex items-center justify-between my-2">
                <p>Price ({storeData.reduce((a,b)=>a + b.info.quantity,0)} Items)</p>
                <p>{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(storeData.reduce((a,b)=>a + (b.info.price/100 || b.info.defaultPrice/100)*b.info.quantity,0))}</p>
              </div>
              <div className="flex items-center justify-between my-2">
                <p>Delivery Charges</p>
                <p>Free</p>
              </div>
              <div className="flex items-center justify-between border border-x-0 py-2">
              <h2>AMOUNT PAYABLE</h2>
              <h2>{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(storeData.reduce((a,b)=>a + (b.info.price/100 || b.info.defaultPrice/100)*b.info.quantity,0))}</h2>
              </div>
              <p className="my-2">
              Safe and Secure Payments. Easy returns. 100% Authentic products.
              </p>
            </div>
            </div>
          </div>
        </div> */}

          <div className="my-6 lg:my-10 mx-auto w-[94%] lg:w-[80%] flex flex-col lg:flex-row gap-4">
            <div className="lg:min-h-[60vh] w-full lg:w-[65%]">
              <div className="px-4 sm:px-8 lg:px-10 py-4 shadow-md flex items-center justify-between bg-gray-300 rounded-xl">
                <h1 className="text-base sm:text-lg md:text-xl font-bold">
                  Cart Items
                </h1>
                <button onClick={cartToggleEvent}>
                  <i className={cartToggle.iconClass}></i>
                </button>
              </div>
              <div className={`${cartToggle.display}`}>
                {storeData.map((item, index) => (
                  <div
                    key={index}
                    className="relative flex justify-between items-center py-4 px-4 sm:px-6 lg:px-8 border border-x-0 hover:bg-gray-200 rounded-xl gap-4 md:gap-0"
                  >
                    <ul className="flex flex-col gap-2 justify-center list-none w-full md:w-[70%]">
                      <li
                        className="text-lg sm:text-xl font-bold text-gray-700 cursor-pointer"
                        onClick={() =>
                          navigate(`/restaurants/${item?.info?.restaurantId}`)
                        }
                      >
                        By {item?.info?.restaurantName}
                      </li>
                      {item?.info?.itemAttribute?.vegClassifier === "VEG" ||
                      item?.info?.isVeg === 1 ? (
                        <li className="w-fit border border-green-500 text-[8px]">
                          🟢
                        </li>
                      ) : null}
                      {item?.info?.itemAttribute?.vegClassifier === "NONVEG" ||
                      !item?.info?.isVeg ? (
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
                          {(item?.info?.price / 100) * item?.info?.quantity ||
                            (item?.info?.defaultPrice / 100) *
                              item?.info?.quantity}
                        </li>
                      </div>
                      <li className="leading-4 text-sm">
                        {item?.info?.description}
                      </li>
                      <li>
                        Quantity:{" "}
                        <span className="text-red-500 font-semibold">
                          {item?.info?.quantity}
                        </span>{" "}
                        items
                      </li>
                      <li>
                        <button
                          className="bg-red-500 px-4 text-white font-semibold rounded-xl"
                          onClick={() => {
                            dispatch(removeCartItem(item?.info?.name));
                            toast.success("Item Removed Successfully");
                          }}
                        >
                          Remove
                        </button>
                      </li>
                    </ul>
                    <div className="relative w-[100px] lg:w-[150px] h-[80px] lg:h-[120px] flex justify-center">
                      {item?.info?.imageId ? (
                        <img
                          src={MENU_IMG_URL + item?.info?.imageId}
                          className="w-full h-full rounded-xl object-cover hover:scale-[1.08] transition-all"
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
                        <button className="px-2 hover:bg-green-500 hover:text-white">
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
            <div className="relative px-4 w-full lg:w-[35%]">
              <div className="sticky top-[135px] lg:top-[90px] right-0 flex gap-4 flex-col items-center">
                <div className="w-full">
                  <h1 className="text-lg font-bold">Order Summary</h1>
                  <div className="flex items-center justify-between my-4">
                    <p>
                      Price (
                      {storeData.reduce((a, b) => a + b.info.quantity, 0)}{" "}
                      Items)
                    </p>
                    <p className="font-semibold">
                      {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "INR",
                      }).format(
                        storeData.reduce(
                          (a, b) =>
                            a +
                            (b.info.price / 100 || b.info.defaultPrice / 100) *
                              b.info.quantity,
                          0
                        )
                      )}
                    </p>
                  </div>
                  <div className="flex items-center justify-between my-4">
                    <p>
                      Discount <span className="text-sm">(10%)</span>
                    </p>
                    <p className="font-semibold">
                      -{" "}
                      {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "INR",
                      }).format(
                        Math.round(
                          (storeData.reduce(
                            (a, b) =>
                              a +
                              (b.info.price / 100 ||
                                b.info.defaultPrice / 100) *
                                b.info.quantity,
                            0
                          ) *
                            10) /
                            100
                        )
                      )}
                    </p>
                  </div>
                  <div className="flex items-center justify-between my-4">
                    <p>Delivery Charges</p>
                    <p className="font-semibold">₹49</p>
                  </div>
                  <div className="flex items-center justify-between my-6">
                    <h2>AMOUNT PAYABLE</h2>
                    <h2 className="font-semibold">
                      {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "INR",
                      }).format(
                        storeData.reduce(
                          (a, b) =>
                            a +
                            (b.info.price / 100 || b.info.defaultPrice / 100) *
                              b.info.quantity,
                          0
                        ) -
                          Math.round(
                            (storeData.reduce(
                              (a, b) =>
                                a +
                                (b.info.price / 100 ||
                                  b.info.defaultPrice / 100) *
                                  b.info.quantity,
                              0
                            ) *
                              10) /
                              100
                          ) +
                          49
                      )}
                    </h2>
                  </div>
                  <p className="text-xs lg:text-sm my-4 border border-x-0 border-t-0 pb-4 border-gray-300">
                    You will save{" "}
                    <span className="font-semibold">
                      {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "INR",
                      }).format(
                        Math.round(
                          (storeData.reduce(
                            (a, b) =>
                              a +
                              (b.info.price / 100 ||
                                b.info.defaultPrice / 100) *
                                b.info.quantity,
                            0
                          ) *
                            10) /
                            100
                        )
                      )}
                    </span>{" "}
                    on this Order 🎉
                  </p>
                  <p className="text-xs lg:text-sm my-4 border border-x-0 border-t-0 pb-4 border-gray-300">
                    Safe and Secure Payments. Easy returns. 100% Authentic
                    products.
                  </p>
                </div>
                <button
                  className="bg-red-500 w-full py-2 rounded-2xl text-white font-semibold text-lg -tracking-tighter"
                  onClick={() => {
                    dispatch(clearCartItems());
                    setCheckout(true);
                    toast.success("Your Order is Placed Successfully");
                  }}
                >
                  CHECKOUT
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default RestaurantFoodCart;
