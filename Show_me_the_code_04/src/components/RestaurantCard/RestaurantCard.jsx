import React from 'react';
import './RestaurantCard.css';
import { IMG_URL } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';

function RestaurantCard({items}) {
    const {avgRating, name, cloudinaryImageId, sla, cuisines, areaName, id} = items;
    const navigate = useNavigate();
  return (
    <>
        <div className="res-card w-[19%] flex flex-col bg-[#f0f0f0] p-1 m-1 gap-2 rounded-xl hover:border hover: cursor-pointer" onClick={()=>{navigate(`restaurants/${id}`)}}>
            <img className='res-logo my-1 mx-auto w-[94%] h-[160px] object-cover rounded-xl hover:scale-[0.92]' src={IMG_URL+cloudinaryImageId} alt="" />
            <div className='res-card-content my-1 mx-auto w-[94%] flex flex-col gap-2'>
              <h3>{name}</h3>
              <div>
                  <h4>{avgRating}</h4>
                  <h4>{sla.slaString}</h4>
              </div>
              <h4>{cuisines.join(", ")}</h4>
              <h4>{areaName}</h4>
            </div>
        </div>
    </>
  )
}

export default RestaurantCard