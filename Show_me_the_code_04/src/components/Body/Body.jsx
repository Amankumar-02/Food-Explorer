import React, { useEffect, useState } from 'react';
import './Body.css';
import {RestaurantCard, Shimmer} from '../index';
import { RESTAURANT_HOME } from '../../utils/constants';
import useApiFetch from '../../hooks/useApiFetch';
import useInternetStatus from '../../hooks/useInternetStatus';

function Body() {
  const internetStatus = useInternetStatus();
  const [homePageData, setHomePageData] = useState("");
  const [restList1, setRestList1] = useState([]);
  const [restList2, setRestList2] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const fetchHomeData = useApiFetch(RESTAURANT_HOME);
  useEffect(()=>{
    if(fetchHomeData){
      setHomePageData(fetchHomeData?.data)
      setRestList1(fetchHomeData?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
      setRestList2(fetchHomeData?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
      console.log("All Home Data Rendered");
    }
  }, [fetchHomeData]);

  const searchItemEvent = (e)=>{
    e.preventDefault();
    if(!searchInput){
      setRestList1(homePageData.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
    }else{
      const filteredRestaurant = homePageData.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants.filter(res=>res.info.name.toLowerCase().includes(searchInput.toLowerCase()));
      setRestList1(filteredRestaurant);
    }
    setSearchInput("");
  };

  const filterRestautants = ()=>{
    setRestList2(prev=>prev.filter(item=>
      item.info.avgRating > 4
    ));
  };

  if(internetStatus === false){
    return(
      <>
      <p>Looks like you're offline!! Please check your internet connection.</p>
      </>
    )
  }
  
  return (
    <>
      {/* {internetStatus ? (
        <> */}
          {!homePageData ? (
            <Shimmer />
          ) : (
            <>
              <div className="body">
                <div className="search-item">
                  <h2>{homePageData?.cards[1]?.card?.card?.header?.title}</h2>
                  <form onSubmit={searchItemEvent}>
                    <input
                      type="text"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      placeholder="Seach top rated restaurants"
                    />
                    <input type="submit" value="Go" />
                  </form>
                </div>
                <div className="res-container">
                  {restList1.map((item, index) => (
                    <RestaurantCard key={index} items={item.info} />
                  ))}
                </div>
                <div className="filter">
                  <h2>{homePageData?.cards[2]?.card?.card?.title}</h2>
                  <h2 className="filter-title">Filters</h2>
                  <button
                    className="filter-btn"
                    onClick={() =>
                      setRestList2(
                        homePageData?.cards[4]?.card?.card?.gridElements
                          ?.infoWithStyle?.restaurants
                      )
                    }
                  >
                    All Restaurants
                  </button>
                  <button className="filter-btn" onClick={filterRestautants}>
                    Top Rated Restaurants
                  </button>
                </div>

                <div className="res-container">
                  {restList2.map((item, index) => (
                    <RestaurantCard key={index} items={item.info} />
                  ))}
                </div>
              </div>
            </>
          )}
        {/* </>
      ) : (
        <>
        <p>Looks like you're offline!! Please check your internet connection.</p>
        </>
      )} */}
    </>
  );
}

export default Body