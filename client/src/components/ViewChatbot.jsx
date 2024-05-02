import React, { useEffect, useState } from "react";


function ViewChatbot(props) {


    console.log(props.chatbot)

    return (
        <>
            <button onClick={() => props.setView()} className="mb-10">BACK</button>
            <h2>{props.chatbot.companyName}</h2>
            <h2>{props.chatbot.scriptTag}</h2>
        </>
    );
}

export default ViewChatbot;
