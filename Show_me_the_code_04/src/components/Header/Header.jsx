import React from 'react';
import './Header.css';
import logo from '../../../public/food app icon food explorer - Made with PosterMyWall.png'

function Header() {
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
        </ul>
      </div>
    </div>
  )
}

export default Header