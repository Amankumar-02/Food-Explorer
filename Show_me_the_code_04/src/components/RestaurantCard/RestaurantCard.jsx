import React from 'react';
import './RestaurantCard.css'

function RestaurantCard({items}) {
    const {avgRating, name, cloudinaryImageId, sla, cuisines, areaName} = items;
  return (
    <>
        <div className="res-card">
            <img className='res-logo' src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${cloudinaryImageId}`} alt="" />
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