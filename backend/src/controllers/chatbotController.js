import path from 'path';
import { fileURLToPath } from 'url';
import chatbotModel from '../models/chatbotModel.js';
// import { prompt } from "../services/llamaChat.js";
import ollamaModel from '../models/ollamaModel.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


async function serveJS(req, res) {
    const id = req.query.id;
    const publicIP = req.socket.remoteAddress;

    try {
        const js = await chatbotModel.getChatbotJS(id, publicIP)

        res.setHeader('Content-Type', 'application/javascript');
        res.send(js);

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function runQuery(req, res) {
    const id = req.query.id;
    const msg = req.body.msg;

    const answer = await ollamaModel.prompt(msg)
    console.log(answer)
    res.json({answer: answer})
}


export default { serveJS, runQuery }