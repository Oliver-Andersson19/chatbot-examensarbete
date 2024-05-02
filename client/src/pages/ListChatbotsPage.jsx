import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useOutletContext, Navigate } from "react-router-dom";
import useFetchData from "../hooks/useFetchData";
import ChatbotItem from "../components/ChatbotItem";
import ViewChatbot from "../components/ViewChatbot";

function ListChatbotsPage() {

    const [chatbotToView, setChatbotToView] = useState();
    const { loading, err, data } = useFetchData("api/chatbots/");


    const { isLoggedIn } = useOutletContext();

    if (!isLoggedIn) return <Navigate to={"/login"} />;

    const setView = (chatbot) => {
        setChatbotToView(chatbot)
    }

    console.log(data)

    return (
        <div className="w-full flex-1 p-10 lg:mt-10 max-w-screen-lg mx-auto rounded-xl bg-white shadow-lg">

            { !chatbotToView && <>

                <h2 className="text-6xl leading-tight mb-2">Your Chatbot Library</h2>
                <p className="w-96 mb-20 ml-2">See your list of created chatbots below. Click on a chatbot to view installation instructions and start using it seamlessly in your projects.</p>
        
                {data && data.map((chatbot) => {
                    return (<ChatbotItem key={chatbot.id} chatbot={chatbot} setView={setView}></ChatbotItem>)
                })}
            </>}

            {chatbotToView && <ViewChatbot setView={setView} chatbot={chatbotToView}>:3</ViewChatbot>}
        </div>
    );
}

export default ListChatbotsPage;
