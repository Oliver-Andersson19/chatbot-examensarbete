import React from 'react';
// import 'https://193.183.247.22:8080/main.css';

function ChatbotPreview(props) {
  return (
    <>
        
        <div className="chatbot-wrapper preview-wrapper flex flex-row-reverse gap-5 items-end">
            <div className="chatbot-window flex shadow-xl">

                <div className="chat-view">
                    <header style={{backgroundColor: props.colorScheme.primaryColor}}>
                        <button className="chatbot-close-btn"><span className="material-symbols-outlined">close</span></button>
                        <h3>Chatta med oss</h3>
                    </header>
                    <div className="chatbot-chatfeed">
                        <p style={{backgroundColor: props.colorScheme.accentColor}} className="ai-bubble">
                        Hej och välkommen till vår virtuella assistent! <br/><br/> Här får du svar på vanliga frågor, om du vill skicka oss ett mail istället <span class="contact-link">klicka här.</span> <br/><br/>Vad kan vi hjälpa dig med?
                        </p>
                    </div>
                    <div className="input-field">
                        <input type="text" placeholder="Ställ din fråga här..."/>
                        <button style={{backgroundColor: props.colorScheme.secondaryColor}} className="send-btn"><span className="material-symbols-outlined">send</span></button>
                    </div>
                </div>
                
                <div className="contact-view hide">
                    <header>
                        <button className="back-btn"><span className="material-symbols-outlined">arrow_back_ios</span></button>
                        <h3>Kontakta Oss</h3>
                    </header>
                    
                    <div className="form-container">
                        <label>E-post*</label>
                        <input type="text" placeholder="E-postaddress"/>

                        
                        <label>Namn</label>
                        <input type="text" placeholder="Förnamn Efternamn"/>
                        
                        <label>Telefon</label>
                        <input type="text" placeholder="Telefonnummer"/>
                        
                        <label>Meddelande*</label>
                        <textarea rows="5" placeholder="Skriv ditt meddelande"/>

                        <button className="contact-send-btn">SKICKA</button>
                    </div>
                </div>
            </div>
            {/* <button style={{backgroundColor: props.colorScheme.primaryColor}} className="chatbot-open-btn">
                <span className="material-symbols-outlined">chat_bubble</span>
            </button>  */}
        </div>
    </>
    )
}

export default ChatbotPreview