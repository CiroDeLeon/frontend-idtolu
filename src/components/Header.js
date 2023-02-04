import React from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.png';
import './Header.css';

const Header = () => {
  return (
    <header>
    <img src={logo} alt="Logo" />
    <h1>Prueba Tecnica</h1>
  </header>
  );
};

export default Header;
