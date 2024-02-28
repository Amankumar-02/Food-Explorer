import React, { useState } from 'react';
import './Header.css';
import logo from '../../../public/logo.png';
import {Link} from 'react-router-dom';
import useInternetStatus from '../../hooks/useInternetStatus';

function Header() {
  const [btnName, setBtnName] = useState({title:"Login", color:"#008000db"});
  const [btnStatus, setBtnStatus] = useState(true);
  const internetStatus = useInternetStatus();
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
    <div className="header flex justify-between items-center py-2 px-16">
      <div className="logo-container">
        <Link to={"/"}>
          <img className="logo w-[140px]" src={logo} alt="" />
        </Link>
      </div>
      <div className="search">
        <form>
          <input type="text" className='ms-1 px-5 py-1' placeholder="Search" />
          <input type="submit" className='ms-1 px-5 py-1' value="Go" />
        </form>
      </div>
      <div className="nav-items">
        <ul className="flex items-center list-none">
          <li className="p-3 mx-2 text-lg font-semibold text-black">Status: {internetStatus ? <>✅</> : <>🔴</>}</li>
          <Link to={"/"} className="no-underline">
            <li className="p-3 mx-2 text-lg font-semibold text-black">
              Home
            </li>
          </Link>
          <Link to={"/grocery"} className="no-underline">
            <li className="p-3 mx-2 text-lg font-semibold text-black">
              Grocery
            </li>
          </Link>
          <Link to={"/about"} className="no-underline">
            <li className="p-3 mx-2 text-lg font-semibold text-black">
              About Us
            </li>
          </Link>
          <Link to={"/contact"} className="no-underline">
            <li className="p-3 mx-2 text-lg font-semibold text-black">
              Contact Us
            </li>
          </Link>
          <li className="p-3 mx-2 text-lg font-semibold text-black">
            Cart
          </li>
          <button
            className="login-btn p-3 m-3 cursor-pointer font-semibold text-sm border-none rounded-xl text-white"
            style={{ backgroundColor: `${btnName.color}` }}
            onClick={changeBtnName}
          >
            {btnName.title}
          </button>
        </ul>
      </div>
    </div>
  );
}

export default Header