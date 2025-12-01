// server.js
import express from "express";
import cors from "cors";
import mysql from "mysql2";

const app = express();
app.use(cors());
app.use(express.json());


const dbConfig = process.env.MYSQLHOST
  ? {
      host: process.env.MYSQLHOST,              
      user: process.env.MYSQLUSER,                    password: process.env.MYSQL_ROOT_PASSWORD, 
      database: process.env.MYSQL_DATABASE,      
      port: process.env.MYSQLPORT || 3306
    }
  : {
      host: "localhost",
      user: "root",
      password: "",            
      database: "sitrobheli", 
      port: 3306
    };


const db = mysql.createConnection(dbConfig);

db.connect(err => {
  if (err) {
    console.error("❌ Error al conectar con MySQL:", err);
    return;
  }
  console.log(
    "✔ Conectado a MySQL " + (process.env.MYSQLHOST ? "(Railway)" : "(local)")
  );
});


app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente 🚀");
});


app.get("/productos", (req, res) => {
  const query = "SELECT * FROM productos";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
