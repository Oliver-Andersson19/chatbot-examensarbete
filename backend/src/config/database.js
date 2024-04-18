import mysql2 from "mysql2/promise";
import "dotenv/config";

const connection =  mysql2.createPool({
  host: "localhost",
  port: "3306",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "chatbot",
  multipleStatements: true,
  timezone: "+00:00"
});

await connection.getConnection((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Connection to database established");
  }
});

export default connection;
