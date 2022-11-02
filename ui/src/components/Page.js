import React from 'react';
import Contents from './Contents.js';
import { NavLink } from 'react-router-dom'
function NavBar() {
    return (
      <nav>
        <NavLink exact to="/">Home</NavLink>
        {' | '}
        <NavLink to="/">Scan Barcode</NavLink>
        {' | '}
        <NavLink to="/">Add Product</NavLink>
        {' | '}
        <NavLink to="/">Login</NavLink>
        {' | '}
        <NavLink to="/">Logout</NavLink>

      </nav>
    );
  }

  export default function Page() {
    return (
      <div>
        <NavBar />
        <Contents />
      </div>
    );
  }