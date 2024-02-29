import React from 'react';
import './RestaurantCard.css';
import { IMG_URL } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';

function RestaurantCard({items}) {
    const {avgRating, name, cloudinaryImageId, sla, cuisines, areaName, id} = items;
    const navigate = useNavigate();
  return (
    <>
        <div className="res-card w-[250px] h-full flex flex-col bg-[#f0f0f0] p-2 rounded-xl hover:border hover:border-black hover: cursor-pointer" onClick={()=>{navigate(`restaurants/${id}`)}}>
            <img className='res-logo my-1 mx-auto w-[94%] h-[160px] object-cover rounded-xl' src={IMG_URL+cloudinaryImageId} alt="" />
            <div className='res-card-content my-1 mx-auto w-[94%] flex flex-col gap-3'>
              <h3 className='text-xl font-semibold'>{name}</h3>
              <div className='flex items-center justify-between'>
                  <h4 className='font-semibold'>{avgRating} ⭐</h4>
                  <h4 className='text-red-500'>{sla.slaString}</h4>
              </div>
              <p>{cuisines.join(", ")}</p>
              <h4 className='font-semibold'>{areaName}</h4>
            </div>
        </div>
    </>
  )
}

//High Order Component
export const AdditionOfferRestaurantCard = (RestaurantCard)=>{
  return ({items})=>{
    return(
      <div className='relative'>
        <label className='offer absolute top-[144px] left-[15px] text-lg font-extrabold text-white z-[80] rounded-xl text-center w-[220px]'>{items?.aggregatedDiscountInfoV3?.header} {items?.aggregatedDiscountInfoV3?.subHeader}</label>
        <RestaurantCard items={items}/>
      </div>
    )
  };
};

export default RestaurantCard