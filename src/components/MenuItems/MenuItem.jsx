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
      <div data-testid="food-Item" className="flex justify-between items-center py-6 px-8 border border-x-0 hover:bg-gray-200 rounded-xl">
        <ul className="flex flex-col gap-4 justify-center list-none w-[80%]">
          {card?.info?.itemAttribute?.vegClassifier === "VEG" ? (
            <li className="w-fit border border-green-500 text-[8px]">🟢</li>
          ) : null}
          {card?.info?.itemAttribute?.vegClassifier === "NONVEG" ? (
            <li className="w-fit border border-red-500 text-[8px]">🔺</li>
          ) : null}
          <div>
            <li className="text-lg font-bold">{card?.info?.name}</li>
            <li className="text-lg font-bold text-gray-600">
              ₹{card?.info?.price / 100 || card?.info?.defaultPrice / 100}
            </li>
          </div>
          <li className="leading-4 text-sm">{card?.info?.description}</li>
        </ul>
        <div className="relative w-[150px] h-[120px] flex justify-center">
          {card?.info?.imageId ? (
            <img
              src={MENU_IMG_URL + card?.info?.imageId}
              className="menu-img w-full h-full rounded-xl object-cover"
            />
          ) : null}
          <div className="absolute bottom-[-10%] bg-white z-[99] flex border-2 rounded-xl overflow-hidden">

            {storeData.filter(item=>item?.info?.name===card?.info?.name)[0]?.info?.quantity > 0? (
              <>
                <button className="px-2 hover:bg-gray-300" onClick={()=>{modifyQuantity("decrease", card?.info?.name)}}>-</button>
              </>
            ) : null}
            
            <button
              className="px-2 hover:bg-green-500 hover:text-white"
              onClick={()=>{cartEvent(card?.info?.name)}}
            >
              {storeData.filter(item=>item?.info?.name===card?.info?.name)[0]?.info?.quantity > 0? (<>{storeData.filter(item=>item?.info?.name===card?.info?.name)[0]?.info?.quantity}</>) : (<>Add</>)}
            </button>

            {storeData.filter(item=>item?.info?.name===card?.info?.name)[0]?.info?.quantity > 0? (
              <>
                <button className="px-2 hover:bg-gray-300" onClick={()=>{modifyQuantity("increase", card?.info?.name)}}>+</button>
              </>
            ) : null}
            
          </div>
        </div>
      </div>
    </>
  );
}

export default MenuItem