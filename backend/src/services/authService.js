import userModel from "../models/userModel.js";
import jwtService from "./jwtService.js";
import bcrypt from 'bcrypt'

async function authenticate(username, password) {
  //Get current userinformation
  try {
    
    const userInfo = await userModel.getUser(username);
    if (userInfo && userInfo.length > 0 && userInfo[0]) {
      const storedPassword = userInfo[0].password;
      if (await validatePassword(storedPassword, password)) {
        delete userInfo[0].password;
        delete userInfo[0].id;
        //Add jwt token to userinfo here
        const token = jwtService.generateToken(userInfo[0].username);
        return token;
      }
    }
  } catch (error) {
    throw error;
  }
}

async function validatePassword(hashedPassword, password) {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  if (isMatch) {
    return true;
  }
  return false;
}

export default { authenticate };
