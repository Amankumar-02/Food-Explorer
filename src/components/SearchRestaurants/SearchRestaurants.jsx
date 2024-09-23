import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { RESTAURANT_SEARCH_RESULT, SERVER_APIKEY } from "../../utils/constants";
import { useParams } from "react-router-dom";
import { Dish, Restaurant } from "./index";
import RestaurantError from "./Restaurant/RestaurantError";
import Shimmer from "../Shimmer/Shimmer";

function SearchRestaurants() {
  const { restSearchId } = useParams();
  const [changeUrl, setChangeUrl] = useState(null);
  const [searchInfo, setSearchInfo] = useState(null);
  const [searchFetchedData, setSearchFetchedData] = useState(null);
  const [abortController, setAbortController] = useState(null);

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

  // Fetch search API data
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
          signal: controller.signal,
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
    if (changeUrl) {
      fetchRestaurantSearchData();
    }
  }, [changeUrl]);

  return (
    <>
      <SearchBar value1={restSearchId} />

      {/* stage1 */}
      {!searchFetchedData ? (
        <>
          <Shimmer />
        </>
      ) : (
        <>
          {/* stage2 */}
          {searchFetchedData.DISH ? (
            <>
              <Dish
                searchFoodResult={searchFetchedData?.DISH?.cards}
                searchName={JSON.parse(searchInfo).query}
              />
            </>
          ) : (
            <>
              {/* stage3 */}
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
                  {/* stage4 & final */}
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
