import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import jwtService from "../services/jwtService.js";

async function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (authHeader == undefined) {
    res.status(400);
    res.send("Authorization header is missing");
  } else {
    const authToken = authHeader.replace("Bearer ", "");
    try {
      const payload = jwtService.verify(authToken);
      const userInfo = await userModel.getUser(payload.username);
      if (userInfo === undefined) {
        return res.status(401).send({ error: "Email not found in the database" });
      } else {
        payload.username = userInfo[0].username;
        req.decoded = payload;
        return next();
      }
    } catch (err) {
      return res.status(401).send(err);
    }
  }
}

// async function loginCheck(req, res, next) {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1]; // hämta accesstoken från request
//   if (token == null) return next(); // kolla så token finns

//   jwt.verify(token, process.env.SUPER_SECRET, async (err, payload) => {
//     // verify token mot env secret
//     if (err) return next();
//     const userInfo = await userModel.getProfile(payload.email);
//     if (userInfo === undefined) {
//       return res.status(401).send({ error: "Email not found in the database" });
//     } else {
//       payload.id = userInfo[0].User_id;
//       req.decoded = payload;
//       // req.decoded.id = userInfo[0].User_id;
//       return next();
//     }
//   });
// }

export default { verifyToken };
