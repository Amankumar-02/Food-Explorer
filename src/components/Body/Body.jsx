import React, { useEffect, useState } from "react";
import "./Body.css";
import { RestaurantCard, AdditionOfferRestaurantCard, Shimmer } from "../index";
import { RestaurantCardSlider } from "../index";
import { RESTAURANT_HOME } from "../../utils/constants";
import useApiFetch from "../../hooks/useApiFetch";
import useInternetStatus from "../../hooks/useInternetStatus";
import { homeFoodRestaurants } from "../../utils/homeFoodRestaurants";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Body() {
  const navigate = useNavigate();
  const internetStatus = useInternetStatus();
  const [homePageData, setHomePageData] = useState("");
  const [restTopList, setRestTopList] = useState([]);
  const [restList1, setRestList1] = useState([]);
  const [restList2, setRestList2] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  // const [slider, setSlider] = useState({action:"translateX(0%)", count:0})
  // const sliderEvent = (task)=>{
  //   if(task === "prev"){
  //     if(slider.count>0){
  //       const query = slider.count-1;
  //       setSlider(prev=>({...prev, action: `translateX(${-5*query}%)`, count:query}))
  //     }
  //   }else{
  //     if(slider.count<15){
  //       const query = slider.count+1;
  //       setSlider(prev=>({...prev, action: `translateX(${-5*query}%)`, count:query}))
  //       console.log(query)
  //     }
  //   }
  // }

  const settings = {
    dots: false,
    bool: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,

    infinite: true,
    speed: 500,
    slidesToShow: 6,

    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,

          dots: false,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 4,

          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,

          initialSlide: 2,
          rows: 2,
        },
      },
      {
        breakpoint: 280,
        settings: {
          slidesToShow: 2,
          rows: 2,
        },
      },
    ],
  };
  const settings2 = {
    dots: false,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    mouseScroll: false,

    infinite: true,
    speed: 500,
    slidesToShow: 4,
    // slidesToScroll: 1, // Adjust to scroll one slide at a time
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024, // For large screens
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1, // Scroll one slide at a time
          dots: false,
        },
      },
      {
        breakpoint: 800, // For medium screens
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1, // Scroll one slide at a time
          dots: false,
        },
      },
      {
        breakpoint: 480, // For small screens
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1, // Scroll one slide at a time
          dots: false,
        },
      },
      {
        breakpoint: 280, // For extra small screens
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1, // Scroll one slide at a time

          dots: false,
        },
      },
    ],
  };

  const RestaurantCardOffer = AdditionOfferRestaurantCard(RestaurantCard);

  const fetchHomeData = useApiFetch(RESTAURANT_HOME);
  useEffect(() => {
    if (fetchHomeData?.data) {
      setHomePageData(fetchHomeData?.data?.data);
      setRestTopList(
        fetchHomeData?.data?.data?.cards[0]?.card?.card?.gridElements
          ?.infoWithStyle?.info
      );
      setRestList1(
        fetchHomeData?.data?.data?.cards[1]?.card?.card?.gridElements
          ?.infoWithStyle?.restaurants
      );
      // setRestList2(
      //   fetchHomeData?.data?.data?.cards[4]?.card?.card?.gridElements
      //     ?.infoWithStyle?.restaurants
      // );
      setRestList2(
        fetchHomeData?.data?.data?.cards[1]?.card?.card?.gridElements
          ?.infoWithStyle?.restaurants
      );
      console.log("All Home Data Rendered");
    }
  }, [fetchHomeData]);

  const [moreFoodCount, setMoreFoodCount] = useState({ count1: 1, count2: 0 });
  const addMoreRest = () => {
    const addingEvent = homeFoodRestaurants.slice(
      10 * moreFoodCount.count2,
      10 * moreFoodCount.count1
    );
    setRestList2((prev) => [...prev, ...addingEvent]);
    setMoreFoodCount((prev) => ({
      ...prev,
      count1: prev.count1 + 1,
      count2: prev.count2 + 1,
    }));
  };

  const searchItemEvent = (e) => {
    e.preventDefault();
    if (!searchInput) {
      setRestList1(
        homePageData.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants
      );
    } else {
      const filteredRestaurant =
        homePageData.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants.filter(
          (res) =>
            res.info.name.toLowerCase().includes(searchInput.toLowerCase())
        );
      setRestList1(filteredRestaurant);
    }
    setSearchInput("");
  };

  const filterRestautants = () => {
    setRestList2((prev) => prev.filter((item) => item.info.avgRating > 4.2));
  };

  if (internetStatus === false) {
    return (
      <>
        <p>
          Looks like you're offline!! Please check your internet connection.
        </p>
      </>
    );
  }

  return (
    <>
      {/* {internetStatus ? (
        <> */}
      <div id="homeSection">
        {/* <div className='w-full flex' style={{background: "linear-gradient(0deg, rgb(201, 188, 244) 0%, rgb(255, 255, 255) 95.83%)"}}> */}
        <div
          className="w-full flex"
          style={{
            background:
              "linear-gradient(0deg, rgb(201, 188, 244) 0%, rgb(255, 255, 255) 50.83%, rgb(201, 188, 244)95.83%)",
          }}
        >
          <div className="w-[50%] flex flex-col items-center justify-center">
            <h1 className="text-2xl lg:text-3xl text-gray-700 font-bold lg:border-4 lg:border-orange-600 lg:border-x-0 lg:border-t-0 pb-2 px-4">
              Craving For Something
            </h1>
          </div>
          <div className="w-[50%] flex items-center justify-center">
            <img
              src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1002,h_600/v1678428358/portal/m/seo_web/dweb_header.png"
              alt=""
              className="w-full lg:w-[80%] object-cover"
            />
          </div>
        </div>
        {!homePageData ? (
          <Shimmer />
        ) : (
          <>
            <div className="my-6 lg:my-10 m-auto w-[94%] lg:w-[80%]">
              <section id="section1" className="overflow-hidden">
                {/* <div className="search-item mb-4 flex justify-between items-center">
                  <h2 className='text-xl lg:text-2xl font-semibold'>{homePageData?.cards[0]?.card?.card?.header?.title}</h2>
                  <div className='lg:me-10 flex gap-2 border border-gray-500 px-2 rounded-xl'>
                  <button className='section1-btn text-sm lg:text-base' onClick={()=>{sliderEvent("prev")}}>⬅</button>
                  <button className='section1-btn text-sm lg:text-base' onClick={()=>{sliderEvent("next")}}>➡</button>
                </div>
                </div>
                <div id='carousal' className='flex w-[400v] gap-2 lg:gap-[40px] transition-all' style={{width: "calc(400% - 32px)", transform: slider.action}}>
                  {restTopList.map((item, index)=>(
                  <div key={index} className='w-[15v]' style={{width:"calc(20% - 32px)"}} onClick={()=>navigate(`/search/${item.action.text.toLowerCase()}`)}>
                    <img src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/"+item.imageId} alt="" className='section1-img w-full object-cover cursor-pointer'/>
                  </div>
                  ))}
                </div> */}
                  <h2 className="text-xl lg:text-2xl mb-4 font-semibold">
                    {homePageData?.cards[0]?.card?.card?.header?.title}
                  </h2>
                  <div className="section1-Slider">
                <Slider {...settings}>
                  {restTopList.map((item) => (
                    <>
                      <div key={item?.id}>
                        <img
                          src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/${item.imageId}`}
                          className="cursor-pointer transition-all hover:scale-[1.1]"
                          onClick={() => {
                            navigate(
                              `/search/${item.action.text.toLowerCase()}`
                            );
                          }}
                          alt="Slide 1"
                        />
                      </div>
                    </>
                  ))}
                </Slider>
                </div>
              </section>

              <section id="section2" className="my-12 lg:my-20">
                {/* <div className="search-item"> */}
                  <h2 className="text-xl lg:text-2xl mb-8 font-semibold">
                    {homePageData?.cards[1]?.card?.card?.header?.title}
                  </h2>
                  {/* <form onSubmit={searchItemEvent} className="mt-2">
                    <input
                      type="text"
                      className="lg:py-1 px-3 border border-black border-e-0 rounded-xl rounded-e-none lg:w-[400px]"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      placeholder="Seach top rated restaurants"
                    />
                    <input
                      type="submit"
                      className="lg:py-1 px-3 border border-black border-s-0 rounded-xl rounded-s-none hover:bg-gray-300 cursor-pointer font-semibold"
                      value="Go"
                    />
                  </form> */}
                {/* </div> */}
                {/* <div className="res-container flex gap-4 flex-wrap my-4">
                  {restList1.map((item, index) =>
                    // <RestaurantCard key={index} items={item.info} />
                    item?.info?.aggregatedDiscountInfoV3 ? (
                      <RestaurantCardOffer key={index} items={item.info} />
                    ) : (
                      <div className="relative w-[172px] lg:w-auto" key={index}>
                        <RestaurantCard items={item.info} />
                      </div>
                    )
                  )}
                </div> */}
                <div className="section2-Slider">
  <Slider {...settings2}>
    {restList1.map((item) => (
      <RestaurantCardSlider key={item?.id} items={item.info} />
    ))}
  </Slider>
</div>

              </section>
              <section id="section3" className="mb-12 lg:mb-20">
                <h2 className="text-2xl font-semibold mb-6">
                  {homePageData?.cards[2]?.card?.card?.title}
                </h2>
                <div className="flex gap-4 mb-10">
                  <h2 className="filter-title text-xl text-gray-600">
                    Filters:{" "}
                  </h2>
                  <div className="flex gap-2">
                    <button
                      className="filter-btn cursor-pointer px-4 border border-black rounded-xl hover:bg-gray-300 text-sm font-semibold"
                      onClick={() => {
                        const addingEvent = homeFoodRestaurants.slice(
                          0,
                          10 * moreFoodCount.count2
                        );
                        setRestList2([
                          ...homePageData?.cards[1]?.card?.card?.gridElements
                            ?.infoWithStyle?.restaurants,
                          ...addingEvent,
                        ]);
                      }}
                    >
                      All Restaurants
                    </button>
                    <button
                      className="filter-btn cursor-pointer px-4 border border-black rounded-xl hover:bg-gray-300 text-sm font-semibold"
                      onClick={filterRestautants}
                    >
                      Rating 4.2+
                    </button>
                  </div>
                </div>
                <div className="res-container grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 my-4">
    {restList2.map((item, index) =>
        item?.info?.aggregatedDiscountInfoV3 ? (
            <RestaurantCardOffer key={index} items={item.info} />
        ) : (
            <div className="relative w-full lg:w-auto hover:scale-[0.94] transition-all" key={index}>
                <RestaurantCard items={item.info} />
            </div>
        )
    )}
</div>

                <div className="flex justify-center">
                  <button
                    className="p-1 px-6 border-2 border-gray-600 hover:bg-gray-300 rounded-xl text-xl font-semibold text-gray-600"
                    onClick={addMoreRest}
                  >
                    Show More
                  </button>
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

export default Body;
