import React, { useState } from "react";
import fetchService from "../service/FetchService";
import cacheService from "../service/CacheService";
import { useOutletContext, Navigate, useNavigate } from "react-router-dom";
import { HexColorPicker } from 'react-colorful';
import ChatbotPreview from "../components/ChatbotPreview";
import ColorBlob from "../components/ColorBlob";

function CreateChatbotPage() {

  const [formData, setFormData] = useState({primaryColor: "#292929", secondaryColor: "#3A8CD9", accentColor: "#E8F2FF", faq: "", companyName: ""})
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { isLoggedIn } = useOutletContext();

  if (!isLoggedIn) return <Navigate to={"/login"} />;



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const changeColor = (name, color) => {
    setFormData({ ...formData, [name]: color })
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.primaryColor === "" || formData.secondaryColor === "" || formData.accentColor === "" || formData.faq === "") return false;

    let res = await fetchService.fetchRes("/api/create", "POST", { chatbotData: formData});
    if (res.status >= 400) {
      setMsg(":(");
      return false;
    } else {
      res = await res.json();
      console.log(res)
      setTimeout(() => navigate("/chatbots"), 2000);
      
    }
  }

  const pColorList = ["#292929", "#3A8CD9", "#823f30", "#154d23", "#3b1342"]
  const sColorList = ["#292929", "#3A8CD9", "#823f30", "#154d23", "#3b1342"]
  const aColorList = ["#c9c9c9", "#E8F2FF", "#fcd9d2", "#bee8c9", "#ebd3f0"]

  console.log(formData)

  return (
    <div className="w-full flex-1 p-16 lg:mt-10 max-w-screen-lg mx-auto rounded-xl bg-white shadow-lg">
      
      <h2 className="text-6xl leading-tight mb-2">Create Your Own Chatbot with Custom Colors and Text!</h2>
      <p className="w-96 mb-20 ml-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum aut, laborum excepturi saepe molestias deserunt dolorum doloribus soluta.</p>
      
      <div className="h-1 w-1/2 mx-auto mb-32 bg-purple-900"></div>
      
      <div className="flex flex-col items-center gap-20
                      lg:flex-row lg:justify-between lg:items-baseline
      ">
        
        <div className="">
          <h2>Primary Color</h2>
          <div className="flex gap-2 mt-2">
            {pColorList.map((color) => {
              return (<ColorBlob key={color} color={color} name="primaryColor" changeColor={changeColor}></ColorBlob>)
            })}
          </div>
          <input value={formData.primaryColor}  type="text" className="border-b border-black mb-5 w-20 mt-2 p-1" name="primaryColor" onChange={handleInputChange}/>
          <h2>Secondary Color</h2>
          <div className="flex gap-2 mt-2">
            {sColorList.map((color) => {
                return (<ColorBlob key={color} color={color} name="secondaryColor" changeColor={changeColor}></ColorBlob>)
            })}
          </div>
          <input value={formData.secondaryColor}  type="text" className="border-b border-black mb-5 w-20 mt-2 p-1" name="secondaryColor" onChange={handleInputChange}/>
          <h2>Accent Color</h2>
          <div className="flex gap-2 mt-2">
            {aColorList.map((color) => {
                return (<ColorBlob key={color} color={color} name="accentColor" changeColor={changeColor}></ColorBlob>)
            })}
          </div>
          <input value={formData.accentColor} type="text" className="border-b border-black mb-5 w-20 mt-2 p-1" name="accentColor" onChange={handleInputChange}/>
        </div>
        
        
        
        <div className="mb-32">
          <ChatbotPreview colorScheme={formData}></ChatbotPreview>
        </div>

      </div>

      
      <h2 className="text-6xl leading-tight mb-2">Now Just Fill in Information about Your Company!</h2>
      <p className="w-96 mb-20 ml-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum aut, laborum excepturi saepe molestias deserunt dolorum doloribus soluta.</p>
      
      <div className="h-1 w-1/2 mx-auto mb-32 bg-purple-900"></div>

      <div className="flex flex-col gap-5 items-center w-full mb-20">
          
        <input className="w-full border p-2 lg:w-2/3" type="text" name="companyName" placeholder="Company Name" onChange={handleInputChange}/>
        <textarea className="w-full border p-2 lg:w-2/3" rows={5} type="text" name="faq" placeholder="FAQ" onChange={handleInputChange}/>
        <button onClick={handleSubmit} className="bg-primary text-white p-2 w-full lg:w-2/3">Create Chatbot!</button>
      </div>
      
    </div>
  );
}

export default CreateChatbotPage;
