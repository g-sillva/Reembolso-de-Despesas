import React from 'react';

import "./Header.css";

function Header() {
  return (
    <div className='header'>
      <img className='header-textura' src='/img/header_texture.png' alt='textura'/>
      <div className='header-container'>
        <div className='header-user-container'>
          <i className="fa-solid fa-user"></i>
          <div className='header-user-container-content'>
            <p>Olá,</p>
            <p className='header-content-username'>Gabriel Lima</p>
          </div>
        </div>
        <i className="fa-regular fa-bell"></i>
      </div>
    </div>
  )
}

export default Header
