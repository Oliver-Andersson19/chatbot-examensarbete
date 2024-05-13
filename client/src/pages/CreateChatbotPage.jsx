import React, { useState } from "react";
import fetchService from "../service/FetchService";
import cacheService from "../service/CacheService";
import { useOutletContext, Navigate, useNavigate } from "react-router-dom";
import { HexColorPicker } from 'react-colorful';
import ChatbotPreview from "../components/ChatbotPreview";
import ColorBlob from "../components/ColorBlob";
import Line from "../components/Line";

function CreateChatbotPage() {

  const [formData, setFormData] = useState({
    primaryColor: "#292929",
    secondaryColor: "#3A8CD9",
    accentColor: "#E8F2FF",
    headerText: "Chatta med oss",
    email: "",
    inputPlaceholder: "Ställ din fråga här...",
    url: "",
    companyName: ""
  })
  
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
    if (formData.primaryColor === "" || formData.secondaryColor === "" || formData.accentColor === "") return false;
    if (formData.headerText === "" || formData.inputPlaceholder === "") return false;
    if (formData.companyName === "" || formData.email === "" || formData.url === "") return false;
    
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
      
      <h2 className="text-4xl lg:text-6xl leading-tight mb-2">Create Your Own Chatbot with Custom Colors and Text!</h2>
      <p className="max-w-96 mb-20 ml-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum aut, laborum excepturi saepe molestias deserunt dolorum doloribus soluta.</p>
      
      
      <Line></Line>
      
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
          
          <div className="flex flex-col mt-6">
            <h2 className="mb-2">Header Text</h2>
            <input name="headerText" type="text" value={formData.headerText} onChange={handleInputChange} className="border-b border-black mb-4 p-2 text-sm"/>
            <h2 className="mb-2">Message Placeholder</h2>
            <input name="inputPlaceholder" type="text" value={formData.inputPlaceholder} onChange={handleInputChange} className="border-b border-black mb-4 p-2 text-sm"/>

          </div>


        </div>
        
        
        
        <div className="mb-32">
          <ChatbotPreview previewData={formData}></ChatbotPreview>
        </div>

      </div>

      
      <h2 className="text-4xl lg:text-6xl leading-tight mb-2">Now Just Fill In Information About Your Company!</h2>
      <p className="max-w-96 mb-20 ml-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum aut, laborum excepturi saepe molestias deserunt dolorum doloribus soluta.</p>
      
      <Line></Line>

      <div className="flex flex-col gap-5 items-center w-full mb-20">
          
        <input className="w-full border p-2 lg:w-2/3" type="text" name="companyName" placeholder="Company Name" onChange={handleInputChange}/>
        <input className="w-full border p-2 lg:w-2/3" type="text" name="email" placeholder="Email for recieving messages" onChange={handleInputChange}/>
        <input className="w-full border p-2 lg:w-2/3" type="text" name="url" placeholder="URL to your about page" onChange={handleInputChange}/>
        <button onClick={handleSubmit} className="bg-primary text-white p-2 w-full lg:w-2/3">Create Chatbot!</button>
      </div>
      
    </div>
  );
}

export default CreateChatbotPage;
