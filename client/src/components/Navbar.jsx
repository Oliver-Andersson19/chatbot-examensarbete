import React, {useState, useRef, useEffect} from "react";
import { NavLink, useOutletContext } from 'react-router-dom'
import '../styling/navbar.css'
import { IoClose, IoMenu, IoOpen } from "react-icons/io5";
import { pages } from "../router/routes";
import CacheService from "../service/CacheService";

function Navbar({ isLoggedIn, setIsLoggedIn}) {
  
  const [navOpen, setNavOpen] = useState(false)
  const navRef = useRef(null);

  const toggleNav = () => {
    setNavOpen(!navOpen)
  }

  function logoutUser() {
    CacheService.removeLocalValue("token");
    setIsLoggedIn(false);
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
            {isLoggedIn ? 
            <NavLink onClick={logoutUser}>Logout</NavLink> : 
            <NavLink to="/login">Login</NavLink>}
            {isLoggedIn ? 
            <NavLink to="/chatbots" className="register-btn hover:text-black hover:bg-inherit lg:outline-width-2 lg:outline lg:outline-black transition">My Bots</NavLink> : 
            <NavLink to="/register" className="register-btn hover:text-black hover:bg-inherit lg:outline-width-2 lg:outline lg:outline-black transition">Register</NavLink>}
          </div>

      </div>
      
    </header>
  );
}

export default Navbar;