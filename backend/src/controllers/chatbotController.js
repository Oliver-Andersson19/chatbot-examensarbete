import path from 'path';
import { fileURLToPath } from 'url';
import chatbotFrontendModel from '../models/chatbotFrontendModel.js';
import chatbotModel from '../models/chatbotModel.js';
import ollamaModel from '../models/ollamaModel.js';
import userModel from '../models/userModel.js';
import mailService from '../services/mailService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


async function serveJS(req, res) {
    const id = req.query.id;
    const publicIP = req.socket.remoteAddress;

    try {
        const js = await chatbotFrontendModel.getChatbotJS(id, publicIP)

        res.setHeader('Content-Type', 'application/javascript');
        res.send(js);

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
        console.log(error)
    }
}


async function runQuery(req, res) {
    const id = req.query.id;
    const msg = req.body.msg;

    const answer = await ollamaModel.prompt(msg, id)
    res.json({answer: answer})
}


async function createChatbot(req, res) {
    const username = req.decoded.username;
    const { chatbotData } = req.body;
    const url = chatbotData.url;
    const companyName = chatbotData.companyName;
    const email = chatbotData.email;
    const headerText = chatbotData.headerText;
    const inputPlaceholder = chatbotData.inputPlaceholder;


    const colorScheme = {
        primaryColor: chatbotData.primaryColor,
        secondaryColor: chatbotData.secondaryColor,
        accentColor: chatbotData.accentColor,
    }
    

    if (username == undefined)
        return res.status(500).json({ error: "no email or account provided" });

    try {

        const userInfo = await userModel.getUser(username)
        const userId = userInfo[0].id

        const chatbotId = await chatbotModel.createChatbot(headerText, inputPlaceholder, url, colorScheme, companyName, email, userId);
  
        res.status(200).json(chatbotId);
      
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function getChatbotList(req, res) {
    const username = req.decoded.username
    
    if (username == undefined)
        return res.status(500).json({ error: "no email or account provided" });

    try {

        const userInfo = await userModel.getUser(username)
        const userId = userInfo[0].id

        const chatbots = await chatbotModel.getChatbotsByUserId(userId);
  
        res.status(200).json(chatbots);
      
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function sendContactMail(req, res) {
    const id = req.query.id;

    const email = req.body.email;
    const name = req.body.name;
    const phone = req.body.phone;
    const msg = req.body.msg;

    
    
    console.log(id)    
    
    try {
        const chatbot = await chatbotModel.getChatbotById(id)
        const emailTo = chatbot[0].email
        mailService.sendMail(emailTo, email, name, phone, msg)
        
        res.status(200).json({msg: "Email sent"})
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal Server Error" });
    }
}


export default { serveJS, runQuery, createChatbot, getChatbotList, sendContactMail }