import { Router } from "express";
import chatbotController from '../controllers/chatbotController.js'
import sslController from '../controllers/sslController.js'

const routes = Router();



// Chatbot
routes.get("/js", chatbotController.serveJS)
routes.post("/query", chatbotController.runQuery)



// SSL Validation txt
routes.get("/.well-known/pki-validation/7D4287E8977AE9477B619F5D32DF9A1F.txt", sslController.certValidation)


export default routes;