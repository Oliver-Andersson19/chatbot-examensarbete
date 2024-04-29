import connection from "../config/database.js";

async function getUser(username) {
  const [user] = await connection.execute("SELECT * FROM users WHERE username = ?", [username]);
  return user;
}

async function registerUser(username, password) {
  const [rows] = await connection.execute("INSERT INTO users (username, password) VALUES (?, ?)", [username, password]);
  return rows;
}

export default { getUser, registerUser };