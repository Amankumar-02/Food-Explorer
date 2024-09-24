import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import 'remixicon/fonts/remixicon.css'

function SearchBar({value1 = ""}) {
  const [restSearchInput, setRestSearchInput] = useState(value1);
  const [searchBtn, setSearchBtn] = useState(false);
  const [debouncedInput, setDebouncedInput] = useState("");
  const navigate = useNavigate();

  const onChangeSearchRestaurantsEvent = (value) => {
      setRestSearchInput(value);
      setSearchBtn(true);
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
    if (debouncedInput.length > 0) {
      navigate(`/search/${debouncedInput.toLowerCase()}`);
      setSearchBtn(true);
    }
  }, [debouncedInput, navigate]);

  const handleSubmit = (e) => {
    console.log("first")
    e.preventDefault();
    if (searchBtn) {
      setRestSearchInput("");
      setSearchBtn(false);
      navigate(`/search`);
    }
  };

  return (
    <div className="my-6 lg:my-10 m-auto w-[94%] lg:w-[80%]">
      <div className="w-full flex items-center justify-center">
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
          className={`px-5 lg:py-2 rounded-md rounded-s-none w-fit border border-black border-s-0 ${
            searchBtn ? "cursor-pointer" : "cursor-default"
          }`}
          onClick={handleSubmit}
        >
          {searchBtn ? "❌" : <i className="ri-search-line"></i>}
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
