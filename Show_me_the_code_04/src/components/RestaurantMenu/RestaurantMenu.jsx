import React, { useEffect, useState } from 'react';
import {Shimmer} from '../index';
import { useParams } from 'react-router-dom';
import { MENU_IMG_URL, RESTAURANT_MENU_RESULT } from '../../utils/constants';
import useApiFetch from '../../hooks/useApiFetch';

function RestaurantMenu() {
    const {restId} = useParams();
    const [restMenu, setRestMenu] = useState("");
    const [restMenuInfo, setRestMenuInfo] = useState([]);
    // const [restMenuOffers, setRestMenuOffers] = useState([]);
    const [restMenuItems, setRestMenuItems] = useState([]);

    const fetchMenuData = useApiFetch(RESTAURANT_MENU_RESULT+restId);
    useEffect(()=>{
      if(fetchMenuData){
        setRestMenu(fetchMenuData?.data?.cards);
        setRestMenuInfo(fetchMenuData?.data?.cards[2]?.card?.card?.info);
        // setRestMenuOffers(fetchMenuData?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle);
        // setRestMenuItems(fetchMenuData?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards);
        setRestMenuItems(fetchMenuData?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards);
        console.log("All Menu Data Rendered");
        // console.log(fetchMenuData);
      }
    }, [fetchMenuData]);

    // if(restMenu === null){return(<Shimmer/>)}

    // const {name, cuisines, costForTwoMessage} = restMenuInfo;

    return (
      <>
        {!restMenu ? (
          <Shimmer />
        ) : (
          <>
            <div className="menu">
              <h1>{restMenuInfo?.name}</h1>
              <p>
                {restMenuInfo?.cuisines.join(", ")} -{" "}
                {restMenuInfo?.costForTwoMessage}
              </p>
              <h2>Menu</h2>
              {restMenuItems.map(({ card }, index) =>
                card?.card?.title && card?.card?.itemCards ? (
                  <div key={index}>
                    <h1>
                      {card?.card?.title} ({card?.card?.itemCards.length})
                    </h1>
                    {card?.card?.itemCards.map(({ card }, index2) => (
                      <div key={index2}>
                        <ul>
                          <li>{card?.info?.name}</li>
                          <li>Rs.
                            {card?.info?.price / 100 ||
                              card?.info?.defaultPrice / 100}
                          </li>
                        </ul>
                        {card?.info?.imageId? (
                            <img src={MENU_IMG_URL + card?.info?.imageId}/>
                        ):null}
                      </div>
                    ))}
                  </div>
                ) : null
              )}
            </div>
          </>
        )}
      </>
    );
}

export default RestaurantMenu