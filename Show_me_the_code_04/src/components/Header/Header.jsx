import React, { useState } from 'react';
import './Header.css';
import logo from '../../../public/logo.png';

function Header() {
  const [btnName, setBtnName] = useState({title:"Login", color:"#008000db"});
  const [btnStatus, setBtnStatus] = useState(true);
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
    <div className="header">
      <div className="logo-container">
        <img className='logo' src={logo} alt="" />
      </div>
      <div className="search">
        <form>
          <input type="text" placeholder='Search'/>
          <input type="submit" value="Go"/> 
        </form>
      </div>
      <div className="nav-items">
        <ul>
          <li>Home</li>
          <li>About Us</li>
          <li>Contact Us</li>
          <li>Cart</li>
          <button className='login-btn' style={{backgroundColor:`${btnName.color}`}} onClick={changeBtnName}>{btnName.title}</button>
        </ul>
      </div>
    </div>
  )
}

export default Header