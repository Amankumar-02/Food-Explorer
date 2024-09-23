import React from 'react';
import './RestaurantCard.css';
import { IMG_URL } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';

function RestaurantCardSlider({items}) {
    const {avgRating, name, cloudinaryImageId, sla, cuisines, areaName, id} = items;
    const navigate = useNavigate();
  return (
    <>
    <div className='relative mx-2 hover:scale-[0.94] transition-all'>
        <label className='offer absolute top-[148px] lg:top-[176px] left-0 text-xs lg:text-lg font-bold lg:font-extrabold text-white z-[80] rounded-xl text-center w-full'>{items?.aggregatedDiscountInfoV3?.header} {items?.aggregatedDiscountInfoV3?.subHeader}</label>
        <div className="res-card w-full h-full flex flex-col cursor-pointer" onClick={()=>{navigate(`restaurants/${id}`)}}>
            <img className='res-logo my-1 h-[160px] lg:h-[200px] object-cover rounded-xl w-full' src={IMG_URL+cloudinaryImageId} alt="" />
            <div className='res-card-content my-1 mx-auto w-[94%] flex flex-col gap-1'>
              <h3 className='text-lg font-semibold leading-5'>{name}</h3>
              <div className='flex items-center justify-between'>
                  <h4 className='font-semibold text-gray-600'>{avgRating} ⭐</h4>
                  <h4 className='text-red-500'>{sla.slaString}</h4>
              </div>
              <p className='leading-4 text-xs lg:text-sm'>{cuisines.join(", ")}</p>
              <h4 className='text-xs lg:text-sm font-semibold leading-4'>{areaName}</h4>
            </div>
        </div>
        </div>
    </>
  )
}

export default RestaurantCardSlider