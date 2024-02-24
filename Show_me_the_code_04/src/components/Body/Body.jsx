import React, { useEffect, useState } from 'react';
import './Body.css';
import {RestaurantCard, Shimmer} from '../index';
import { RESTAURANT_HOME } from '../../utils/constants';

function Body() {
  const [homePageData, setHomePageData] = useState("");
  const [restList1, setRestList1] = useState([]);
  const [restList2, setRestList2] = useState([]);
  const filterRestautants = ()=>{
    setRestList2(prev=>prev.filter(item=>
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
          console.log(data?.data)
          setHomePageData(data?.data)
          setRestList1(data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
          setRestList2(data?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        }
      }catch (error){
        console.log("Error fetching data:", error)
      }
    };
    fetchRestaurantData();
  }, [])
  
  return (
    <>
      {!homePageData ? (
        <Shimmer />
      ) : (
        <>
          <div className="body">
            {/* <div className="filter">
          <h2>Filters</h2>
          <button className='filter-btn' onClick={()=>setRestList1(cardData)}>All Restaurants</button>
          <button className='filter-btn' onClick={filterRestautants}>Top Rated Restaurants</button>
        </div> */}
            <h2>{homePageData?.cards[1]?.card?.card?.header?.title}</h2>
            <div className="res-container">
              {restList1.map((item, index) => (
                <RestaurantCard key={index} items={item.info} />
              ))}
            </div>
            <div className="filter">
              <h2>Filters</h2>
              <button
                className="filter-btn"
                onClick={() => setRestList2(homePageData?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants)}
              >
                All Restaurants
              </button>
              <button className="filter-btn" onClick={filterRestautants}>
                Top Rated Restaurants
              </button>
            </div>
            <h2>{homePageData?.cards[2]?.card?.card?.title}</h2>
            <div className="res-container">
              {restList2.map((item, index) => (
                <RestaurantCard key={index} items={item.info} />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Body