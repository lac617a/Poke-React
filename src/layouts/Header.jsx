import React from 'react';
import '../assets/scss/header.scss';
import logo from '../assets/img/logo.svg';

const Header = () => {
  return (
    <header className='header'>
      <figure className='header-figure'>
        <img className='header-img' src={logo} alt='logo'/>
      </figure>
    </header>
  )
}

export default Header;