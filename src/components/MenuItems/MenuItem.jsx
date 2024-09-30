import React from 'react'
import { MENU_IMG_URL } from '../../utils/constants';
import { addCartItem, modifyCartQuantity, removeCartItem } from '../../reduxFeatures/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

function MenuItem({card, restName, restId}) {
  const dispatch = useDispatch();
  const storeData = useSelector((state) => state.cartStore.cart);
  // console.log(storeData)
  const cartEvent = (e)=>{
    if(!storeData.filter(item=>item?.info?.name === e)[0]?.info?.quantity || storeData.filter(item=>item?.info?.name === e)[0]?.info?.quantity < 0){
      dispatch(addCartItem({...card?.info, quantity : 1, restaurantName: restName, restaurantId: restId}));
      toast.success("Item Added SuccessFully");
    }
  }

  const modifyQuantity = (task, name)=>{
    dispatch(modifyCartQuantity({nameDis:name, taskDis:task}));
    if(task === "decrease" && storeData.filter(item=>item?.info?.name === name)[0]?.info?.quantity === 1){
      console.log("first")
      dispatch(removeCartItem(name))
      toast.success("Item Remove SuccessFully");
    }
  }

  return (
    <>
      <div className="flex justify-between items-center p-3 lg:p-6 my-2 lg:my-4 border border-x-0 hover:bg-gray-200 rounded-xl gap-4 lg:gap-10">
  <ul className="flex flex-col gap-2 lg:gap-4 py-2 lg:py-4 justify-center list-none w-full flex-1">
    <div>
    <div className='flex items-center gap-2'>
    {card?.info?.itemAttribute?.vegClassifier === "VEG" ? (
      <li className="w-fit border border-green-500 text-[8px]">🟢</li>
    ) : null}
    {card?.info?.itemAttribute?.vegClassifier === "NONVEG" ? (
      <li className="w-fit border border-red-500 text-[8px]">🔺</li>
    ) : null}
    <li className='text-sm lg:text-base text-orange-500 font-semibold'>{card?.info?.isBestseller ? "Bestseller" : null}</li>
    </div>
      <li className="text-base lg:text-lg font-bold">{card?.info?.name}</li>
      <li className="text-base lg:text-lg font-bold text-gray-600">
        ₹{card?.info?.price / 100 || card?.info?.defaultPrice / 100}
      </li>
    </div>
      <li className="text-base lg:text-lg font-bold text-gray-600">
        {card?.info?.ratings?.aggregatedRating?.rating && (
          <>
          <i className="ri-star-fill text-yellow-500 text-lg"></i>{" "}{card?.info?.ratings?.aggregatedRating?.rating}{" "} <span className='text-sm lg:text-md'>({card?.info?.ratings?.aggregatedRating?.ratingCountV2})</span>
          </>
        )}
      </li>
    <li className="leading-4 text-xs lg:text-sm">{card?.info?.description}</li>
  </ul>
  <div className="relative w-[100px] lg:w-[150px] h-[80px] lg:h-[130px] flex justify-center">
    {card?.info?.imageId ? (
      <img
        src={MENU_IMG_URL + card?.info?.imageId}
        className="w-full h-full rounded-xl object-cover hover:scale-[1.08] transition-all"
      />
    ) : null}


    <div className="absolute bottom-0 lg:bottom-[-10%] bg-white z-[99] flex border-2 rounded-xl overflow-hidden">
      {storeData.filter(item => item?.info?.name === card?.info?.name)[0]?.info?.quantity > 0 ? (
        <>
          <button className="px-2 hover:bg-gray-300" onClick={() => { modifyQuantity("decrease", card?.info?.name) }}>-</button>
        </>
      ) : null}
      
      <button
        className="px-2 hover:bg-green-500 hover:text-white"
        onClick={() => { cartEvent(card?.info?.name) }}
      >
        {storeData.filter(item => item?.info?.name === card?.info?.name)[0]?.info?.quantity > 0 ? (
          <>{storeData.filter(item => item?.info?.name === card?.info?.name)[0]?.info?.quantity}</>
        ) : (
          <>Add</>
        )}
      </button>

      {storeData.filter(item => item?.info?.name === card?.info?.name)[0]?.info?.quantity > 0 ? (
        <>
          <button className="px-2 hover:bg-gray-300" onClick={() => { modifyQuantity("increase", card?.info?.name) }}>+</button>
        </>
      ) : null}
    </div>
  </div>
</div>
    </>
  );
}

export default MenuItem