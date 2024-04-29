import authService from "../services/authService.js"
import bcrypt from 'bcrypt'
import jwtService from "../services/jwtService.js";
import userModel from "../models/userModel.js";

async function registerUser(req, res) {
  const { username, password } = req.body;
  const hashedPass = await bcrypt.hash(password, 12);
  try {
    const userInfo = await userModel.getUser(username);
    if (userInfo[0] !== undefined) return res.status(401).send({ message: "A user already exist" });
    await userModel.registerUser(username, hashedPass);
    const token = await jwtService.generateToken(username);
    res.status(200).json(token);
  } catch (error) {
    res.status(500).json({ error: "A problem when registering user occured." });
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body;
    const login = await authService.authenticate(username, password);

    if (!login) {
      // Authentication failed
      return res.status(401).json({ error: "Invalid credentials" });
    }
    res.status(200).json(login);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getProfile(req, res) {
  try {
      const username = req.decoded.username;
      const userInfo = await userModel.getUser(username);

      res.json({
          username: userInfo[0].username,
      });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export default { login, registerUser, getProfile };
