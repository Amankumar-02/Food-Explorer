import React, { useEffect, useState } from 'react';
import './Body.css';
import {RestaurantCard, AdditionOfferRestaurantCard, Shimmer} from '../index';
import { RESTAURANT_HOME } from '../../utils/constants';
import useApiFetch from '../../hooks/useApiFetch';
import useInternetStatus from '../../hooks/useInternetStatus';

function Body() {
  const internetStatus = useInternetStatus();
  const [homePageData, setHomePageData] = useState("");
  const [restList1, setRestList1] = useState([]);
  const [restList2, setRestList2] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const RestaurantCardOffer = AdditionOfferRestaurantCard(RestaurantCard)

  const fetchHomeData = useApiFetch(RESTAURANT_HOME);
  useEffect(()=>{
    if(fetchHomeData){
      setHomePageData(fetchHomeData?.data)
      setRestList1(fetchHomeData?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
      setRestList2(fetchHomeData?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
      console.log("All Home Data Rendered");
      // console.log(fetchHomeData);
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
                <div className="search-item mx-8 mb-4">
                  <h2 className='text-2xl font-semibold'>{homePageData?.cards[1]?.card?.card?.header?.title}</h2>
                  <form onSubmit={searchItemEvent} className='mt-3'>
                    <input
                      type="text"
                      className='me-3 py-1 px-3 border border-black rounded-xl'
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      placeholder="Seach top rated restaurants"
                    />
                    <input type="submit" className='py-1 px-3 border border-black rounded-xl hover:bg-gray-300 cursor-pointer' value="Go" />
                  </form>
                </div>
                <div className="res-container flex gap-3 flex-wrap mx-6 my-4">
                  {restList1.map((item, index) => (
                    // <RestaurantCard key={index} items={item.info} />
                    item?.info?.aggregatedDiscountInfoV3? (<RestaurantCardOffer key={index} items={item.info} />):(<RestaurantCard key={index} items={item.info} />)
                  ))}
                </div>
                <div className="filter my-4 mx-8">
                  <h2 className='text-2xl font-semibold'>{homePageData?.cards[2]?.card?.card?.title}</h2>
                  <h2 className="filter-title my-2 text-lg font-semibold">Filters</h2>
                  <button
                    className="filter-btn cursor-pointer me-3 py-1 px-3 border border-black rounded-xl hover:bg-gray-300"
                    onClick={() =>
                      setRestList2(
                        homePageData?.cards[4]?.card?.card?.gridElements
                          ?.infoWithStyle?.restaurants
                      )
                    }
                  >
                    All Restaurants
                  </button>
                  <button className="filter-btn cursor-pointer py-1 px-3 border border-black rounded-xl hover:bg-gray-300" onClick={filterRestautants}>
                    Top Rated Restaurants
                  </button>
                </div>

                <div className="res-container flex gap-3 flex-wrap mx-6 my-4">
                  {restList2.map((item, index) => (
                    // <RestaurantCard key={index} items={item.info} />
                    item?.info?.aggregatedDiscountInfoV3? (<RestaurantCardOffer key={index} items={item.info} />):(<RestaurantCard key={index} items={item.info} />)
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