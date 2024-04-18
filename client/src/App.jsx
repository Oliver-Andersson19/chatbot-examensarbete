import React from "react";

import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
// import cacheService from "./service/CacheService";
// import fetchService from "./service/FetchService";

function App() {

  return (
    <>
      <Navbar/>
      <main>
        <Outlet/>
      </main>
      <Footer/>
    </>
  );
}

export default App;
