import React from "react";
import { useNavigate } from 'react-router-dom';

function Restaurant({ searchFetchedData }) {
    const navigate = useNavigate();
    // rest, food ==> array[0,1]
  return (
    <>
      <div>
        <h1>
          {
            searchFetchedData[1].card.card.restaurants[0].info
              .name
          }
        </h1>
        <h1>
          {
            searchFetchedData[1].card.card.restaurants[0].info
              .id
          }
        </h1>
        <button
          onClick={() =>
            navigate(
              `/restaurants/${searchFetchedData[1].card.card.restaurants[0].info
                .id}`
            )
          }
        >
          More
        </button>
      </div>
    </>
  );
}

export default Restaurant;
