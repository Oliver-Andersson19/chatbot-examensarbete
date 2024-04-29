import { Router } from "express";
import chatbotController from '../controllers/chatbotController.js'
import sslController from '../controllers/sslController.js'
import authController from "../controllers/authController.js";
import jwtFilter from "../middleware/jwtFilter.js";

const routes = Router();



// Chatbot
routes.get("/js", chatbotController.serveJS)
routes.post("/query", chatbotController.runQuery)

routes.post("/create", jwtFilter.verifyToken, chatbotController.createChatbot)


// Auth
routes.post("/login", authController.login);
routes.post("/register", authController.registerUser);
routes.get("/profile", jwtFilter.verifyToken, authController.getProfile);


// SSL Validation txt
routes.get("/.well-known/pki-validation/CA2E14A16132802AEFD4F79B917290AE.txt", sslController.certValidation)


export default routes;