import React, { useEffect, useState } from 'react';
import './Body.css';
import {RestaurantCard, AdditionOfferRestaurantCard, Shimmer} from '../index';
import { RESTAURANT_HOME } from '../../utils/constants';
import useApiFetch from '../../hooks/useApiFetch';
import useInternetStatus from '../../hooks/useInternetStatus';
import { homeFoodRestaurants } from '../../utils/homeFoodRestaurants';

function Body() {
  const internetStatus = useInternetStatus();
  const [homePageData, setHomePageData] = useState("");
  const [restList1, setRestList1] = useState([]);
  const [restList2, setRestList2] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  console.log("body rest",restList2)

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

  const [count, setCount] = useState(1);
  const [count2, setCount2] = useState(0);
  const addMoreRest = ()=>{
    const addingEvent = homeFoodRestaurants.slice((10*count2), (10*count));
    setRestList2(prev=>[...prev, ...addingEvent])
    setCount(prev=>prev+1)
    setCount2(prev=>prev+1)
  }

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
        <div id='homeSection'>
        {/* <div className='w-full flex' style={{background: "linear-gradient(0deg, rgb(201, 188, 244) 0%, rgb(255, 255, 255) 95.83%)"}}> */}
        <div className='w-full flex' style={{background: "linear-gradient(0deg, rgb(201, 188, 244) 0%, rgb(255, 255, 255) 50.83%, rgb(201, 188, 244)95.83%)"}}>
          <div className='w-[50%] flex flex-col items-center justify-center'>
            <h1 className='text-3xl text-gray-700 font-bold border-4 border-orange-600 border-x-0 border-t-0 pb-2 px-4'>Craving For Something</h1>
          </div>
          <div className='w-[50%] flex items-center justify-center h-[250px]'>
            <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1002,h_600/v1678428358/portal/m/seo_web/dweb_header.png" alt="" className='h-full object-cover'/>
          </div>
        </div>
          {!homePageData ? (
            <Shimmer />
          ) : (
            <>
              <div className="my-6 mx-8">
                <section id='section2'>
                <div className="search-item mb-8">
                  <h2 className='text-2xl font-semibold'>{homePageData?.cards[1]?.card?.card?.header?.title}</h2>
                  <form onSubmit={searchItemEvent} className='mt-2'>
                    <input
                      type="text"
                      className='py-1 px-3 border border-black border-e-0 rounded-xl rounded-e-none w-[400px]'
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      placeholder="Seach top rated restaurants"
                    />
                    <input type="submit" className='py-1 px-3 border border-black border-s-0 rounded-xl rounded-s-none hover:bg-gray-300 cursor-pointer font-semibold' value="Go" />
                  </form>
                </div>
                <div className="res-container flex gap-4 flex-wrap my-4">
                  {restList1.map((item, index) => (
                    // <RestaurantCard key={index} items={item.info} />
                    item?.info?.aggregatedDiscountInfoV3? (<RestaurantCardOffer key={index} items={item.info} />):(<div className='relative' key={index}><RestaurantCard items={item.info} /></div>)
                  ))}
                </div>
                </section>
                <section id='section3'>
                <div className="filter mt-12 mb-8">
                  <h2 className='text-2xl font-semibold mb-2'>{homePageData?.cards[2]?.card?.card?.title}</h2>
                  <div className='flex gap-4'>
                  <h2 className="filter-title text-xl text-gray-600">Filters: </h2>
                  <div className='flex gap-2'>
                  <button
                    className="filter-btn cursor-pointer px-4 border border-black rounded-xl hover:bg-gray-300 text-sm font-semibold"
                    onClick={() =>
                      setRestList2(
                        homePageData?.cards[4]?.card?.card?.gridElements
                          ?.infoWithStyle?.restaurants
                      )
                    }
                  >
                    All Restaurants
                  </button>
                  <button className="filter-btn cursor-pointer px-4 border border-black rounded-xl hover:bg-gray-300 text-sm font-semibold" onClick={filterRestautants}>
                    Top Rated Restaurants
                  </button>
                    </div>
                  </div>
                </div>
                <div className="res-container flex gap-4 flex-wrap my-4">
                  {restList2.map((item, index) => (
                    // <RestaurantCard key={index} items={item.info} />
                    item?.info?.aggregatedDiscountInfoV3? (<RestaurantCardOffer key={index} items={item.info} />):(<div className='relative' key={index}><RestaurantCard items={item.info} /></div>)
                  ))}
                </div>
                <div className='flex justify-center'>
                <button className='p-1 px-6 border-2 border-gray-600 hover:bg-gray-300 rounded-xl text-xl font-semibold text-gray-600' onClick={addMoreRest}>Show More</button>
                </div>
                </section>
              </div>
            </>
          )}
        </div>
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