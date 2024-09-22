import React, { useState } from 'react';
import './Header.css';
import logo from '../../../public/logo.png';
import {Link, useNavigate} from 'react-router-dom';
import useInternetStatus from '../../hooks/useInternetStatus';
// import { useContext } from 'react';
// import { UserContextStore } from '../../utils/UserContextStore';
import { useSelector } from 'react-redux';

function Header() {
  const [btnName, setBtnName] = useState({title:"Login", color:"#008000db"});
  const [btnStatus, setBtnStatus] = useState(true);
  // const [restSearchInput, setRestSearchInput] = useState("");
  // const navigate = useNavigate();
  const internetStatus = useInternetStatus();
  // const {logginName} = useContext(UserContextStore);
  const storeData = useSelector((state) => state.cartStore.cart);

  // const searchRestaurantsEvent = (e)=>{
  //   e.preventDefault();
  //   if(restSearchInput.length>0){
  //     navigate(`/search/${restSearchInput.toLowerCase()}`)
  //     setRestSearchInput("");
  //   }
  // }

  const changeBtnName = ()=>{
    if(btnStatus===true){
      setBtnName({title:"Logout", color:"red"});
      setBtnStatus(false);
    }else{
      setBtnName({title:"Login", color:"#008000db"});
      setBtnStatus(true);
    }
  }

  return (
    <div className="header sticky top-0 left-0 z-[999] b-[#D5CBF6de] shadow-lg flex flex-col lg:flex-row justify-between items-center py-2 lg:px-16" style={{background: "linear-gradient(0deg, rgb(201, 188, 244) 0%, rgb(201, 188, 244) 95.83%)"}}>
      <div className="logo-container">
        <Link to={"/"}>
          <img className="logo w-[80px] lg:w-[100px]" src={logo} alt="" />
        </Link>
      </div>
      {/* <div className="search">
        <form onSubmit={searchRestaurantsEvent}>
          <input type="text" className='px-5 lg:py-1 rounded-xl rounded-e-none lg:w-[500px]' placeholder="Search" value={restSearchInput} onChange={(e)=>{setRestSearchInput(e.target.value)}}/>
          <input type="submit" className='px-4 lg:py-1 rounded-xl rounded-s-none cursor-pointer bg-white hover:bg-[#ad9fdb]' value="🔍"/>
        </form>
      </div> */}
      <div className="nav-items">
        <ul className="flex items-center gap-6 list-none mt-2 lg:mt-auto">
          <li className="font-semibold text-black">Active Status: {internetStatus ? <><span className='text-xs'>✅</span></> : <><span className='text-xs'>🔴</span></>}</li>
          {/* <li className='text- font-semibold text-black'>📍 Location New Delhi</li> */}
          <Link to={"/"} className="no-underline">
            <li className="text-lg font-semibold text-black hover:border-2 hover:border-gray-800 hover:border-x-0 hover:border-t-0">
              Home
            </li>
          </Link>
          <Link to={"/search"} className="no-underline">
            <li className="text-lg font-semibold text-black hover:border-2 hover:border-gray-800 hover:border-x-0 hover:border-t-0">
              Search
            </li>
          </Link>
          {/* <Link to={"/grocery"} className="no-underline">
            <li className="text-lg font-semibold text-black hover:border-2 hover:border-gray-800 hover:border-x-0 hover:border-t-0">
              Grocery
            </li>
          </Link>
          <Link to={"/about"} className="no-underline">
            <li className="text-lg font-semibold text-black hover:border-2 hover:border-gray-800 hover:border-x-0 hover:border-t-0">
              About Us
            </li>
          </Link>
          <Link to={"/contact"} className="no-underline">
            <li className="text-lg font-semibold text-black hover:border-2 hover:border-gray-800 hover:border-x-0 hover:border-t-0">
              Contact Us
            </li>
          </Link> */}
          <Link to={"/cart"} className="no-underline">
          <li className="text-lg font-semibold text-black hover:border-2 hover:border-gray-800 hover:border-x-0 hover:border-t-0">
            Cart{storeData.length===0? null:(<>: {storeData.length}</>)}
          </li>
          </Link>
          <button
            className="login-btn py-1 lg:py-2 px-4 lg:m-3 cursor-pointer font-semibold text-sm border-none rounded-xl text-white hover:outline hover:outline-gray-400"
            style={{ backgroundColor: `${btnName.color}` }}
            onClick={changeBtnName}
          >
            {btnName.title}
          </button>
          {/* <li>{logginName}</li> */}
        </ul>
      </div>
    </div>
  );
}

export default Header