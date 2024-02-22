import React from 'react';
import './RestaurantCard.css';
import { IMG_URL } from '../../utils/constants';

function RestaurantCard({items}) {
    const {avgRating, name, cloudinaryImageId, sla, cuisines, areaName} = items;
  return (
    <>
        <div className="res-card">
            <img className='res-logo' src={IMG_URL+cloudinaryImageId} alt="" />
            <h3>{name}</h3>
            <div>
                <h4>{avgRating}</h4>
                <h4>{sla.deliveryTime} mins</h4>
            </div>
            <h4>{cuisines.join(", ")}</h4>
            <h4>{areaName}</h4>
        </div>
    </>
  )
}

export default RestaurantCard