import React from 'react';
import Contents from './Contents.js';
import { NavLink } from 'react-router-dom'
import { ReactSession } from 'react-client-session';

function NavBar() {
  const type = ReactSession.get("type");
  console.log("user id is dispalyed "+type);
    return (
      <div id="navbar">
      <nav>
        {/* <NavLink exact to="/">Home</NavLink>
        {' | '}
        <NavLink to="/barcode">Scan Barcode</NavLink>
        {' | '} */}
        {type =="Supervisor" &&
        <NavLink to="/products">Stock</NavLink>
        
      }
      {type =="Admin" &&
      <NavLink to="/products">Stock</NavLink>
    }
    {type =="Admin" &&
    <NavLink to="/users">Users</NavLink>
    
  }
      <NavLink id="prod" to="/products">Products</NavLink>
      {(type!=null) &&
      <NavLink to="/">Logout</NavLink>
        
      }

      </nav>
      </div>
    );
  }

  export default function Page() {
    console.log("inside Page");
    document.getElementById("scanner-main").style.display="none";
    return (
      <div>
        <NavBar />
        <Contents />
      </div>
    );
  }