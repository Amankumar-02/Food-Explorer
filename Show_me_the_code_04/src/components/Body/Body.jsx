import React, { useEffect, useState } from 'react';
import './Body.css';
import {RestaurantCard} from '../index';
import { cardData, RESTAURANT_HOME } from '../../utils/constants';

function Body() {
  const [restList, setRestList] = useState([]);
  const filterRestautants = ()=>{
    setRestList(prev=>prev.filter(item=>
      item.info.avgRating > 4
    ));
  }
  useEffect(()=>{
    const fetchRestaurantData = async()=>{
      try{
        const res = await fetch(RESTAURANT_HOME);
        if(!res.ok){
          throw new Error("Error Serving Restaurant List");
        }else{
          const data = await res.json();
          setRestList(data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        }
      }catch (error){
        console.log("Error fetching data:", error)
      }
    };
    fetchRestaurantData();
  }, [])
  
  return (
    <>
    <div className="body">
        <div className="filter">
          <h2>Filters</h2>
          <button className='filter-btn' onClick={()=>setRestList(cardData)}>All Restaurants</button>
          <button className='filter-btn' onClick={filterRestautants}>Top Rated Restaurants</button>
        </div>
        <div className="res-container">
            {restList.map((item, index)=>(
                <RestaurantCard key={index} items={item.info}/>
            ))}
        </div>
    </div>
    </>
  )
}

export default Body