import React, { useState } from "react";
import fetchService from "../service/FetchService";
import cacheService from "../service/CacheService";
import { useOutletContext, useNavigate, NavLink, Navigate } from "react-router-dom";


function LoginPage() {

  const [formData, setFormData] = useState({username: "", password: ""})
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const { setIsLoggedIn } = useOutletContext();


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.username === "" || formData.password === "") return false;

    const res = await fetchService.fetchRes("/api/login", "POST", formData);
    if (res.status >= 400) {
      setMsg("Login failed")
      return false;
    } else {
      const jwt = await res.json();
      console.log(jwt)
      cacheService.saveLocalValue("token", jwt);

      setIsLoggedIn(true);
      setMsg("Login successfull")
      setTimeout(() => navigate("/"), 2000);
    }
  }

  return (
    <div className="w-full flex-1 flex justify-center items-center p-8">
      <form className="bg-white p-6 flex flex-col shadow-lg w-full rounded-lg max-w-lg">
        <h2 className="mb-2 text-xl">Login</h2>

        <label htmlFor="">Username</label>
        <input type="text" name="username" placeholder="" onChange={handleInputChange}
          className="border-solid border-[1px] border-gray-400 rounded-sm p-1 mb-6"
        />
        
        
        <label htmlFor="">Password</label>
        <input type="password" name="password" placeholder="" onChange={handleInputChange}
          className="border-solid border-[1px] border-gray-400 rounded-sm p-1 mb-6"
        />

        <p className="text-sm mb-2">No account? Create one <NavLink to="/register" className="text-blue-800">here</NavLink></p>
        

        <button onClick={handleSubmit} className="bg-blue-600 text-white p-2 font-bold">Submit</button>
        {msg}
      </form>
    </div>
  );
}

export default LoginPage;
