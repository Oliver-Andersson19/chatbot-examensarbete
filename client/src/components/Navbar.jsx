import React, {useState, useRef, useEffect} from "react";
import { NavLink, useOutletContext } from 'react-router-dom'
import '../styling/navbar.css'
import { IoClose, IoMenu, IoOpen } from "react-icons/io5";
import { pages } from "../router/routes";

function Navbar({ isLoggedIn, setIsLoggedIn}) {
  
  const [navOpen, setNavOpen] = useState(false)
  const navRef = useRef(null);

  const toggleNav = () => {
    setNavOpen(!navOpen)
  }

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setNavOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [navRef]);

  return (
    <header className="page-header" ref={navRef}>

      {navOpen ? 
      <IoClose className="nav-open-btn" onClick={toggleNav}/> : 
      <IoMenu className="nav-open-btn" onClick={toggleNav}/>}

      <div className={`nav-list shadow-lg ${navOpen && "open"}`}>

          {pages.map(({label, path, right}) => {
            return ( !right && <NavLink to={path} key={path}>{label}</NavLink>);
          })}

          <div className="right">            
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register" className="register-btn">Register</NavLink>
          </div>

      </div>
      
    </header>
  );
}

export default Navbar;