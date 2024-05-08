import React, { useEffect, useState } from "react";
import Line from "../components/Line";
import { FaCopy, FaCheck } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";

function ViewChatbot(props) {
    
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        Prism.highlightAll();
      }, []);

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(props.chatbot.scriptTag);
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
          } catch (error) {
            console.error('Failed to copy:', error);
          }
    }


    return (
        <>
            
            <button onClick={() => props.setView()} className="mb-6 text-4xl"><IoIosArrowBack /></button>
                
            <h2 className="text-center text-6xl leading-tight mb-10">{props.chatbot.companyName}</h2>
        
            

            <Line></Line>

            <h2 className="text-4xl leading-tight mb-4">Follow the Instructions to Install Your Chatbot</h2>
            <p className=" mb-4 ml-2">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam libero sed dolorem perspiciatis nam quasi consequatur? Nemo, cupiditate quia quod porro aut velit libero deleniti similique sapiente! Culpa, voluptate delectus!
            </p>

            <ol className="list-disc ml-10 mb-4">
                <li>Copy the script-tag from the code below</li>
                <li>Lorem ipsum dolor sit amet consectetur adipisicing </li>
                <li>Copy the script-tag from the code below</li>
            </ol>

            <p className="mb-16 ml-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit ad vitae veritatis, vel molestias vero nam provident quis quibusdam ullam accusamus, facere nulla? Fugiat neque voluptatum id repellat quae eius.</p>
        
        
        

            
            <div className="flex justify-center">
                <pre className="inline-block relative !pt-10 rounded-lg shadow-xl">
                    <button onClick={copyToClipboard} className="absolute top-2 right-2 p-1 text-lg text-white">{!copied ? <FaCopy /> : <FaCheck />}</button>
                    
                        <code className="language-html">{props.chatbot.scriptTag}</code>
                    
                </pre>
            </div>
        </>
    );
}

export default ViewChatbot;
