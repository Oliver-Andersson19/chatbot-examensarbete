import connection from "../config/database.js";

async function getChatbotHTML(id) {
    
    const [colorScheme] = await connection.execute(
        `SELECT c.primaryColor, c.secondaryColor, c.accentColor
        FROM chatbots AS cb
        JOIN colorScheme AS c ON cb.colorSchemeId = c.id
        WHERE cb.id = ?`,
        [id]
    );

    const [chatbot] = await connection.execute(
        `SELECT * FROM chatbots WHERE id = ?`,
        [id]
    );

    return /*html*/`
    
    <style>
        .chatbot-wrapper header {
            background-color: ${colorScheme[0].primaryColor};
        }
        .chatbot-wrapper .chatbot-open-btn {
            background: ${colorScheme[0].primaryColor}
        }
        .chatbot-wrapper .chatbot-chatfeed .ai-bubble {
            background-color: ${colorScheme[0].accentColor};
        }
        .chatbot-wrapper .chatbot-window .input-field .send-btn {
            background: ${colorScheme[0].secondaryColor};
        }
        .chatbot-wrapper .chatbot-window .contact-view .form-container .contact-send-btn {
            background: ${colorScheme[0].primaryColor}
        }

    </style>
    
    <div class="chatbot-window">

        <div className="chat-view">
            <header>
                <button class="chatbot-close-btn"><span class="material-symbols-outlined">close</span></button>
                <h3>${chatbot[0].headerText}</h3>
            </header>
            <div class="chatbot-chatfeed">
                <p class="ai-bubble">
                Hej och välkommen till vår virtuella assistent! <br/><br/> Här får du svar på vanliga frågor, om du vill skicka oss ett mail istället <span class="contact-link">klicka här.</span> <br/><br/>Vad kan vi hjälpa dig med?
                </p>
            </div>
            <div class="input-field">
                <input type="text" placeholder="${chatbot[0].inputPlaceholder}"/>
                <button class="send-btn"><span class="material-symbols-outlined">send</span></button>
            </div>
        </div>
        
        <div class="contact-view hide">
            <header>
                <button class="back-btn"><span class="material-symbols-outlined">arrow_back_ios</span></button>
                <h3>Kontakta Oss</h3>
            </header>
            
            <div class="form-container">
                <label>E-post*</label>
                <input type="text" placeholder="E-postaddress" class="contact-email"/>

                
                <label>Namn</label>
                <input type="text" placeholder="Förnamn Efternamn" class="contact-name"/>
                
                <label>Telefon</label>
                <input type="text" placeholder="Telefonnummer" class="contact-phone"/>
                
                <label>Meddelande*</label>
                <textarea rows="5" placeholder="Skriv ditt meddelande" class="contact-msg"/></textarea>

                <button class="contact-send-btn">SKICKA</button>
            </div>

            
        </div>

    </div>

    <button class="chatbot-open-btn"><span class="material-symbols-outlined">chat_bubble</span></button>
    `
}


async function getChatbotJS(id, ip) {
    

    let innerHTML = await getChatbotHTML(id)
    innerHTML = innerHTML.replace(/(\r\n|\n|\r)/gm, "")

    const js = /*js*/`

    // Fetch styling
    const head  = document.getElementsByTagName('head')[0];
    const link  = document.createElement('link');
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = 'https://${ip}:8080/main.css';
    
    head.appendChild(link);

    // Create chatbot wrapper
    const chatbotWrapper = document.createElement("div");
    chatbotWrapper.className = "chatbot-wrapper";
    chatbotWrapper.style.position = "fixed";
    chatbotWrapper.style.right = "15px";
    chatbotWrapper.style.bottom = "15px";

    document.body.appendChild(chatbotWrapper);
    
    // Add HTML
    
    chatbotWrapper.innerHTML = '${innerHTML}'

    
    // JS
    const chatWindow = document.querySelector('.chatbot-wrapper .chatbot-window')
    const chatFeed = document.querySelector('.chatbot-wrapper .chatbot-window .chatbot-chatfeed')

    const contactView = document.querySelector('.chatbot-wrapper .chatbot-window .contact-view')

    const openBtn = document.querySelector('.chatbot-wrapper .chatbot-open-btn')
    const closeBtn = document.querySelector('.chatbot-wrapper .chatbot-close-btn')
    
    const sendBtn = document.querySelector('.chatbot-wrapper .input-field .send-btn')
    const inputField = document.querySelector('.chatbot-wrapper .input-field input')

    const contactBtn = document.querySelector('.chatbot-wrapper .chatbot-window .contact-link')
    const backBtn = document.querySelector('.chatbot-wrapper .chatbot-window .contact-view .back-btn')
    const contactSendBtn = document.querySelector('.chatbot-wrapper .chatbot-window .contact-view .contact-send-btn')
    

    const contactEmailField = document.querySelector('.chatbot-wrapper .chatbot-window .contact-email')
    const contactNameField = document.querySelector('.chatbot-wrapper .chatbot-window .contact-name')
    const contactPhoneField = document.querySelector('.chatbot-wrapper .chatbot-window .contact-phone')
    const contactMsgField = document.querySelector('.chatbot-wrapper .chatbot-window .contact-msg')

    openBtn.addEventListener('click', () => {
        chatWindow.classList.toggle("show");
        openBtn.classList.toggle("hide");
    })

    closeBtn.addEventListener('click', () => {
        chatWindow.classList.toggle("show");
        openBtn.classList.toggle("hide");
    })


    contactBtn.addEventListener('click', () => {
        contactView.classList.toggle("hide");
    })

    backBtn.addEventListener('click', () => {
        contactView.classList.toggle("hide");
    })

    contactSendBtn.addEventListener('click', async () => {
        const res = await sendMail();
        console.log(res)
    })


    sendBtn.addEventListener('click', () => {
        handleSubmit(inputField.value);
        inputField.value = "";
    })

    inputField.addEventListener('keypress', (e) => {
        if(e.key === "Enter") {
            e.preventDefault();
            handleSubmit(inputField.value);
            inputField.value = "";
        }
    })


    async function handleSubmit(userMsg) {
        if (userMsg === "") return;

        await createMSGBubble("user", userMsg)
        const loaderBubble = await createMSGBubble("loader")

        await createMSGBubble("ai", userMsg)
        loaderBubble.remove()
    }


    async function createMSGBubble(type, content) {

        bubble = document.createElement('p');

        if (type === "user") {
            bubble.className = "user-bubble";
            bubble.textContent = content;
        } else if(type === "ai") {
            bubble.className = "ai-bubble";
            bubble.textContent = await fetchAnswer(content);
        } else if (type === "loader") {
            bubble = document.createElement('div');
            bubble.className = "ai-bubble";
            bubble.innerHTML = "<span class='loader'></span>";
        }

        chatFeed.append(bubble)
        chatFeed.scrollTop = chatFeed.scrollHeight;
        
        return bubble
    }

    async function fetchAnswer(query) {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({msg: query})
        }

        const res = await fetch('https://${ip}:8080/api/query/?id=${id}', options)
        const data = await res.json()

        return data.answer
    }


    async function sendMail() {
        const email = contactEmailField.value
        const name = contactNameField.value
        const phone = contactPhoneField.value
        const msg = contactMsgField.value

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                name: name,
                phone: phone,
                msg: msg,
            
            })
        }

        const res = await fetch('https://${ip}:8080/api/mail/?id=${id}', options)
        const data = await res.json()

        return data.answer
    }
    `

    return js;
}



export default { getChatbotJS };