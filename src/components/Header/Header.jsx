import React, { useState } from 'react';
import './Header.css';
import logo from '../../../public/logo.png';
import {Link} from 'react-router-dom';
import useInternetStatus from '../../hooks/useInternetStatus';
// import { useContext } from 'react';
// import { UserContextStore } from '../../utils/UserContextStore';
import { useSelector } from 'react-redux';

function Header() {
  const [btnName, setBtnName] = useState({title:"Login", color:"#008000db"});
  const [btnStatus, setBtnStatus] = useState(true);
  const internetStatus = useInternetStatus();
  // const {logginName} = useContext(UserContextStore);
  const storeData = useSelector((state) => state.cartStore.cart);

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
    <div className="header sticky top-0 left-0 z-[999] bg-[#D5CBF6de] shadow-md flex justify-between items-center mb-4 py-2 px-16">
      <div className="logo-container">
        <Link to={"/"}>
          <img className="logo w-[140px]" src={logo} alt="" />
        </Link>
      </div>
      <div className="search">
        <form>
          <input type="text" className='me-2 px-5 py-1 border border-black rounded-xl' placeholder="Search" />
          <input type="submit" className='px-5 py-1 border border-black rounded-xl cursor-pointer hover:bg-[#ad9fdb]' value="Go" />
        </form>
      </div>
      <div className="nav-items">
        <ul className="flex items-center gap-6 list-none">
          <li className="text-lg font-semibold text-black">Status: {internetStatus ? <>✅</> : <>🔴</>}</li>
          <Link to={"/"} className="no-underline">
            <li className="text-lg font-semibold text-black hover:border-2 hover:border-gray-800 hover:border-x-0 hover:border-t-0">
              Home
            </li>
          </Link>
          <Link to={"/grocery"} className="no-underline">
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
          </Link>
          <Link to={"/cart"} className="no-underline">
          <li className="text-lg font-semibold text-black hover:border-2 hover:border-gray-800 hover:border-x-0 hover:border-t-0">
            Cart{storeData.length===0? null:(<>: {storeData.length}</>)}
          </li>
          </Link>
          <button
            className="login-btn py-2 px-4 m-3 cursor-pointer font-semibold text-sm border-none rounded-xl text-white hover:outline hover:outline-gray-400"
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