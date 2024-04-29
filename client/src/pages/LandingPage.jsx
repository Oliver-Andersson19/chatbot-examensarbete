import React from "react";
import previewImg from "../assets/landingpage-preview-img.png";
import { NavLink } from "react-router-dom";

function LandingPage() {

  return (
    <section className="flex-1 items-baseline">
      <div className="flex flex-col lg:flex-row lg:justify-center lg:items-start gap-20 items-center justify-between mx-auto p-10 max-w-screen-lg pt-20">
        <div className="">
          <h2 className="text-7xl w-96 leading-tight">AI chatbot trained with your data.</h2>
          <p className="w-96 mt-2">Resolve 70% of customer support queries instantly. Save time for your team and customers with AI-powered answers.</p>
          <NavLink to="/create" className="inline-block bg-black text-white rounded-full px-7 py-4 mt-5">Get Started</NavLink>
        </div>
        <div className="h-full">
          <img className="w-80" src={previewImg}/>
        </div>
      </div>
    </section>
  );
}

export default LandingPage;