import React, { useEffect, useState } from 'react'
import { RESTAURANT_SEARCH_RESULT } from '../../utils/constants';
import { useNavigate, useParams } from 'react-router-dom';
import {Dish, Restaurant} from './index';
import Shimmer from '../Shimmer/Shimmer';

function SearchRestaurants(){
    // const navigate = useNavigate();
    const {restSearchId} = useParams();
    const [changeUrl , setChangeUrl] = useState(null);
    const [searchFetchedData, setSearchFetchedData] = useState(null);

    // call everytime when params update
    useEffect(()=>{
        if(restSearchId){
            const searchQuery = restSearchId.replaceAll("%", " ").replaceAll("|", " ").replaceAll("/", " ").replaceAll("&", "and").replaceAll(" ", "%2520");
            const url = `${RESTAURANT_SEARCH_RESULT}${searchQuery}%26trackingId%3Dundefined%26submitAction%3DENTER%26queryUniqueId%3Dundefined`;
            setChangeUrl(url);
        }
    }, [restSearchId])

    // fetch search api 
    useEffect(()=>{
        const fetchRestaurantSearchData = async()=>{
            try{
              const res = await fetch(changeUrl);
              if(!res.ok){
                throw new Error("Error Serving Search Data");
              }else{
                const data = await res.json();
                setSearchFetchedData(data?.data?.cards[1]?.groupedCard?.cardGroupMap)
                console.log(data?.data?.cards)
              }
            }catch (error){
              console.log("Error fetching data:", error)
            }
          };
        if(changeUrl){
            fetchRestaurantSearchData();
        }
    }, [changeUrl])
  return (
    <>
    {!searchFetchedData? (<><Shimmer/></>) : (
        <>
        {searchFetchedData.DISH? (<><Dish searchFetchedData={searchFetchedData?.DISH?.cards}/></>) : (<><Restaurant  searchFetchedData={searchFetchedData?.RESTAURANT?.cards}/></>)}
        </>
    )}
    </>
  )
}

export default SearchRestaurants