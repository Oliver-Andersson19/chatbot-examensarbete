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


app.use(Express.json());
app.use(cors())
app.use(Express.urlencoded({ extended: false }));
app.use(Express.static(chatBotClientPath));

// Define a new route for HTTP
app.get("/hello-http", (req, res) => {
    res.send("Hello, welcome to the HTTP server!");
});

app.use("/", routes)

const httpServer = http.createServer(app);

httpServer.listen(80, IP, () => {
    console.log(`HTTP Running at: ${IP}:${80}`);
});


const httpsServer = https.createServer({
    key: fs.readFileSync("cert/private.key", 'utf-8'),
    cert: fs.readFileSync("cert/certificate.crt", 'utf-8')
}, app);

httpsServer.listen(PORT, IP, () => {
    console.log(`HTTPS Running at: ${IP}:${PORT}`);
});