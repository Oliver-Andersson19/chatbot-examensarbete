import Express from "express";
import fs from 'fs'
import http from "http"; // Import the built-in 'http' module for HTTP server
import https from "https";
import routes from "./src/router/routes.js";
import path from 'path';
import cors from 'cors'
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const chatBotClientPath = path.join(__dirname + "/../chatbot-client")

const app = Express();
const IP = "192.168.0.196";
const PORT = 8080;
const HTTPPORT = 8081


app.use(cors())
app.use(Express.json());
app.use(Express.urlencoded({ extended: false }));
app.use(Express.static(chatBotClientPath));


app.use("/api", routes)



const httpServer = http.createServer(app);

httpServer.listen(HTTPPORT, IP, () => {
    console.log(`HTTP Running at: ${IP}:${HTTPPORT}`);
});


const httpsServer = https.createServer({
    key: fs.readFileSync("cert/private.key", 'utf-8'),
    cert: fs.readFileSync("cert/certificate.crt", 'utf-8')
}, app);

httpsServer.listen(PORT, IP, () => {
    console.log(`HTTPS Running at: ${IP}:${PORT}`);
});