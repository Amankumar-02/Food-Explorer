import React, { useEffect, useState } from "react";
import { SEARCH_PAGE_DATA } from "../../utils/constants.js";
import useApiFetch from "../../hooks/useApiFetch";
import SearchBar from "./SearchBar";
import Slider from "react-slick";
import "./SearchRoute.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";

function SearchRoute() {
  const [searchSliderInfo, setSearchSliderInfo] = useState("");
  const [searchSlider, setSearchSlider] = useState(null);
  const fetchSearchPageData = useApiFetch(SEARCH_PAGE_DATA);
  const navigate = useNavigate();

  useEffect(() => {
    if (fetchSearchPageData?.data) {
      setSearchSliderInfo(
        fetchSearchPageData?.data?.data?.cards[1]?.card?.card?.header?.title
      );
      setSearchSlider(
        fetchSearchPageData?.data?.data?.cards[1]?.card?.card?.imageGridCards
          ?.info
      );
    }
  }, [fetchSearchPageData]);

  const settings = {
    dots: false,
    bool: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,

    infinite: true,
    speed: 500,
    slidesToShow: 8,

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

  const slideEventHandler = (name) => {
    const newName = name.slice(name.indexOf("query=") + "query=".length);
    navigate(`/search/${newName.toLowerCase()}`);
  };

  return (
    <>
      <SearchBar />
      <div className="search-slider mt-10 mb-20 m-auto w-[94%] lg:w-[80%] h-[60vh]">
        {!searchSlider ? null : (
          <>
          <h1 className="text-2xl font-semibold mb-6">{searchSliderInfo}</h1>
            <Slider {...settings}>
              {searchSlider.map((item) => (
                <>
                  <div key={item.id}>
                    <img
                      src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/${item?.imageId}`}
                      className="cursor-pointer transition-all hover:scale-[1.1]"
                      onClick={() => {
                        slideEventHandler(item.entityId);
                      }}
                      alt="Slide 1"
                    />
                  </div>
                </>
              ))}
            </Slider>
          </>
        )}
      </div>
    </>
  );
}

export default SearchRoute;
