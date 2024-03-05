import React, { useEffect, useState } from 'react';
import './Body.css';
import {RestaurantCard, AdditionOfferRestaurantCard, Shimmer} from '../index';
import { RESTAURANT_HOME } from '../../utils/constants';
import useApiFetch from '../../hooks/useApiFetch';
import useInternetStatus from '../../hooks/useInternetStatus';
import { homeFoodRestaurants } from '../../utils/homeFoodRestaurants';
import { useNavigate } from 'react-router-dom';

function Body() {
  const navigate = useNavigate();
  const internetStatus = useInternetStatus();
  const [homePageData, setHomePageData] = useState("");
  const [restTopList, setRestTopList] = useState([]);
  const [restList1, setRestList1] = useState([]);
  const [restList2, setRestList2] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [slider, setSlider] = useState({action:"translateX(0%)", count:0})
  const sliderEvent = (task)=>{
    if(task === "prev"){
      if(slider.count>0){
        const query = slider.count-1;
        setSlider(prev=>({...prev, action: `translateX(${-5*query}%)`, count:query}))
      }
    }else{
      if(slider.count<15){
        const query = slider.count+1;
        setSlider(prev=>({...prev, action: `translateX(${-5*query}%)`, count:query}))
        console.log(query)
      }
    }
  }

  const RestaurantCardOffer = AdditionOfferRestaurantCard(RestaurantCard)

  const fetchHomeData = useApiFetch(RESTAURANT_HOME);
  useEffect(()=>{
    if(fetchHomeData){
      setHomePageData(fetchHomeData?.data)
      setRestTopList(fetchHomeData?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle?.info)
      setRestList1(fetchHomeData?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
      setRestList2(fetchHomeData?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
      console.log("All Home Data Rendered");
      // console.log(fetchHomeData?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle?.info);
    }
  }, [fetchHomeData]);

  const [moreFoodCount, setMoreFoodCount] = useState({count1:1, count2:0})
  const addMoreRest = ()=>{
    const addingEvent = homeFoodRestaurants.slice((10*moreFoodCount.count2), (10*moreFoodCount.count1));
    setRestList2(prev=>[...prev, ...addingEvent])
    setMoreFoodCount(prev=>({...prev, count1:prev.count1+1, count2: prev.count2+1}))
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
            <h1 className='text-2xl lg:text-3xl text-gray-700 font-bold lg:border-4 lg:border-orange-600 lg:border-x-0 lg:border-t-0 pb-2 px-4'>Craving For Something</h1>
          </div>
          <div className='w-[50%] flex items-center justify-center'>
            <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1002,h_600/v1678428358/portal/m/seo_web/dweb_header.png" alt="" className='w-full lg:w-[80%] object-cover'/>
          </div>
        </div>
          {!homePageData ? (
            <Shimmer />
          ) : (
            <>
              <div className="my-3 lg:my-6 mx-4 lg:mx-8">
                <section id='section1' className='overflow-hidden'>
                <div className="search-item mb-4 flex justify-between items-center">
                  <h2 className='text-xl lg:text-[30px] font-semibold'>{homePageData?.cards[0]?.card?.card?.header?.title}</h2>
                  <div className='lg:me-10 flex gap-2 border border-gray-500 px-2 rounded-xl'>
                  <button className='section1-btn text-sm lg:text-base' onClick={()=>{sliderEvent("prev")}}>⬅️</button>
                  <button className='section1-btn text-sm lg:text-base' onClick={()=>{sliderEvent("next")}}>➡️</button>
                </div>
                </div>
                <div id='carousal' className='flex w-[400v] gap-2 lg:gap-[40px] transition-all' style={{width: "calc(400% - 32px)", transform: slider.action}}>
                  {restTopList.map((item, index)=>(
                  <div key={index} className='w-[15v]' style={{width:"calc(20% - 32px)"}} onClick={()=>navigate(`/search/${item.action.text.toLowerCase()}`)}>
                    <img src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/"+item.imageId} alt="" className='section1-img w-full object-cover cursor-pointer'/>
                  </div>
                  ))}
                </div>
                
                </section>

                <section id='section2'>
                <div className="search-item mt-6 lg:mt-12 mb-4 lg:mb-8">
                  <h2 className='text-xl lg:text-[30px] font-semibold'>{homePageData?.cards[1]?.card?.card?.header?.title}</h2>
                  <form onSubmit={searchItemEvent} className='mt-2'>
                    <input
                      type="text"
                      className='lg:py-1 px-3 border border-black border-e-0 rounded-xl rounded-e-none lg:w-[400px]'
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      placeholder="Seach top rated restaurants"
                    />
                    <input type="submit" className='lg:py-1 px-3 border border-black border-s-0 rounded-xl rounded-s-none hover:bg-gray-300 cursor-pointer font-semibold' value="Go" />
                  </form>
                </div>
                <div className="res-container flex gap-4 flex-wrap my-4">
                  {restList1.map((item, index) => (
                    // <RestaurantCard key={index} items={item.info} />
                    item?.info?.aggregatedDiscountInfoV3? (<RestaurantCardOffer key={index} items={item.info} />):(<div className='relative w-[172px] lg:w-auto' key={index}><RestaurantCard items={item.info} /></div>)
                  ))}
                </div>
                </section>
                <section id='section3'>
                <div className="filter mt-6 lg:mt-12 mb-4 lg:mb-8">
                  <h2 className='text-[30px] font-semibold mb-2'>{homePageData?.cards[2]?.card?.card?.title}</h2>
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
                    item?.info?.aggregatedDiscountInfoV3? (<RestaurantCardOffer key={index} items={item.info} />):(<div className='relative w-[172px] lg:w-auto' key={index}><RestaurantCard items={item.info} /></div>)
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