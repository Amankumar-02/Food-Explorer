import React, { useEffect, useState } from "react";
import { RESTAURANT_SEARCH_RESULT, SERVER_APIKEY } from "../../utils/constants";
import { useParams, useNavigate } from "react-router-dom";
import { Dish, Restaurant } from "./index";
import RestaurantError from "./Restaurant/RestaurantError";
import Shimmer from "../Shimmer/Shimmer";

function SearchRestaurants() {
  const { restSearchId } = useParams();
  const [restSearchInput, setRestSearchInput] = useState("");
  const [changeUrl, setChangeUrl] = useState(null);
  const [searchInfo, setSearchInfo] = useState(null);
  const [searchFetchedData, setSearchFetchedData] = useState(null);
  const [debouncedInput, setDebouncedInput] = useState("");
  const [searchBtn, setSearchBtn] = useState(false);
  const [abortController, setAbortController] = useState(null);
  const navigate = useNavigate();

  

  // call everytime when params update
  useEffect(() => {
    if (restSearchId) {
      const searchQuery = restSearchId
        .replaceAll("%", " ")
        .replaceAll("|", " ")
        .replaceAll("/", " ")
        .replaceAll("&", "and")
        .replaceAll(" ", "%20");
      const url = `${RESTAURANT_SEARCH_RESULT}?searchId=${searchQuery}`;
      setChangeUrl(url);
    }
  }, [restSearchId]);

  // fetch search api
  useEffect(() => {
    const fetchRestaurantSearchData = async () => {
      if (abortController) {
        abortController.abort(); // Cancel previous request
      }
      const controller = new AbortController();
      setAbortController(controller);

      try {
        const res = await fetch(changeUrl, {
          headers: { apikey: SERVER_APIKEY },
          signal: controller.signal
        });
        if (!res.ok) {
          throw new Error("Error Serving Search Data");
        } else {
          const data = await res.json();
          setSearchInfo(
            data?.data?.data?.cards[0]?.card?.card?.tab[0]?.analytics?.context
          );
          setSearchFetchedData(
            data?.data?.data?.cards[1]?.groupedCard?.cardGroupMap
          );
        }
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Request was aborted");
        } else {
          console.log("Error fetching data:", error);
        }
      }
    };
    if (changeUrl  && debouncedInput.length > 2) {
      fetchRestaurantSearchData();
    }else if(changeUrl && debouncedInput === ""){
      fetchRestaurantSearchData();
    };
  }, [changeUrl, debouncedInput]);

  const onChangeSearchRestaurantsEvent = (value) => {
    setRestSearchInput(value);
    if(value.length <= 2){
      // setDebouncedInput("");
      // setSearchBtn(false);
      setSearchFetchedData(null);
      setSearchInfo(null);
      navigate('/search');
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedInput(restSearchInput);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [restSearchInput]);

  useEffect(() => {
    if (debouncedInput.length > 2) {
      navigate(`/search/${debouncedInput.toLowerCase()}`);
      setSearchBtn(true);
    }
  }, [debouncedInput, navigate]);

  // useEffect(() => {
  //   if (restSearchInput.length > 1) {
  //     setSearchBtn(true);
  //   }
  // }, [restSearchInput]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (restSearchInput.length >= 0) {
      navigate(`/search`);
      setRestSearchInput("");
      setDebouncedInput("");
      setSearchBtn(false); // Reset the search button state
      setSearchFetchedData(null); // Clear search results on new search
      setSearchInfo(null);
    }
  };

  return (
    <>
      <div className="my-10 m-auto w-[80%]">
        <form className="w-full flex items-center justify-center">
          <input
            type="text"
            className="px-5 lg:py-2 rounded-md rounded-e-none w-[60%] border border-black border-e-0"
            placeholder="Search for restaurants and food"
            value={restSearchInput}
            onChange={(e) => {
              onChangeSearchRestaurantsEvent(e.target.value);
            }}
          />
          <button
            type="submit"
            className={`px-5 lg:py-2 rounded-md rounded-s-none w-fit border border-black border-s-0 ${
              searchBtn ? "cursor-pointer" : null
            }`}
            onClick={handleSubmit}
          >
            {searchBtn ? "❌" : "🔍"}
          </button>
        </form>
      </div>
      {!searchFetchedData ? (
        <>
          <h1>Shimmer</h1>
          <Shimmer />
        </>
      ) : (
        <>
          {/* all result data */}
          {searchFetchedData.DISH ? (
            <>
              <Dish
                searchFoodResult={searchFetchedData?.DISH?.cards}
                searchName={JSON.parse(searchInfo).query}
              />
            </>
          ) : (
            <>
              {/* if not data / data with 2 more */}
              {Object.keys(searchFetchedData.RESTAURANT).length === 0 ? (
                <>
                  <div className="w-full h-[400px] flex items-center justify-center">
                    <h1 className="text-xl font-bold">
                      No match found for "{JSON.parse(searchInfo).query}"
                    </h1>
                  </div>
                </>
              ) : (
                <>
                  {searchFetchedData?.RESTAURANT?.cards?.length === 2 ? (
                    <>
                      <Restaurant
                        searchRestaurantResult={
                          searchFetchedData?.RESTAURANT?.cards[0].card.card.info
                        }
                        searchMoreResult={searchFetchedData?.RESTAURANT?.cards[1].card.card.restaurants.slice(
                          0,
                          30
                        )}
                        searchName={JSON.parse(searchInfo).query}
                      />
                    </>
                  ) : (
                    <>
                      <RestaurantError
                        searchMoreResult={searchFetchedData?.RESTAURANT?.cards.slice(
                          0,
                          30
                        )}
                        searchName={JSON.parse(searchInfo).query}
                      />
                    </>
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}

export default SearchRestaurants;
