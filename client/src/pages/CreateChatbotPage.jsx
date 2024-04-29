import React, { useState } from "react";
import fetchService from "../service/FetchService";
import cacheService from "../service/CacheService";
import { useOutletContext, Navigate } from "react-router-dom";
import { HexColorPicker } from 'react-colorful';
import ChatbotPreview from "../components/ChatbotPreview";

function CreateChatbotPage() {

  const [formData, setFormData] = useState({primaryColor: "#292929", secondaryColor: "#3A8CD9", accentColor: "#E8F2FF", faq: ""})
  const [msg, setMsg] = useState("");
  const { setIsLoggedIn, isLoggedIn } = useOutletContext();

  if (!isLoggedIn) return <Navigate to={"/login"} />;


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.primaryColor === "" || formData.secondaryColor === "" || formData.accentColor === "" || formData.faq === "") return false;

    const res = await fetchService.fetchRes("https://192.168.0.196:8080/create", "POST", { chatbotData: formData});
    if (res.status >= 400) {
      setMsg(":(");
      return false;
    } else {
      const jwt = await res.json();
      console.log(jwt)
      cacheService.saveLocalValue("token", jwt);

      setIsLoggedIn(true);
      setMsg("yippie");
    }
  }

  console.log(formData)

  return (
    <div className="bg-gray-100 w-full flex-1 pt-32">

      <div className="p-5 flex flex-col items-center gap-3">
        <div className="flex flex-row justify-around">
          <div className="flex flex-col">
            <HexColorPicker 
              color={formData.primaryColor}
              onChange={(color) => setFormData({ ...formData, ["primaryColor"]: color })}
            />
            <input type="text" className="mb-5" value={formData.primaryColor}/>
            <HexColorPicker 
              color={formData.secondaryColor}
              onChange={(color) => setFormData({ ...formData, ["secondaryColor"]: color })}
            />
            <input type="text" className="mb-5" value={formData.secondaryColor}/>
            <HexColorPicker 
              color={formData.accentColor}
              onChange={(color) => setFormData({ ...formData, ["accentColor"]: color })}
            />
            <input type="text" className="mb-5" value={formData.accentColor}/>
          </div>
          <div className="w-1/2 flex flex-col gap-10 justify-center items-center">
            <ChatbotPreview colorScheme={formData}></ChatbotPreview>
          </div>
        </div>

        <textarea className="w-1/2" type="text" name="faq" placeholder="FAQ" onChange={handleInputChange}/>

        <button onClick={handleSubmit} className="bg-gray-800 text-white p-1 w-1/2">Submit</button>
        {msg}
      </div>
    </div>
  );
}

export default CreateChatbotPage;
