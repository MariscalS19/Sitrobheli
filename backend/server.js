import express from "express";
import cors from "cors";
import mysql from "mysql2";

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MySQL (XAMPP)
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",       // en XAMPP normalmente está vacío
    database: "sitrobheli"   // nombre de tu base de datos
});

// Verificar conexión
db.connect(err => {
    if (err) {
        console.error("Error al conectar con MySQL:", err);
        return;
    }
    console.log("✔ Conectado a MySQL");
});

// Ruta de prueba
app.get("/", (req, res) => {
    res.send("Servidor funcionando correctamente 🚀");
});

// =======================
// RUTAS DE PRODUCTO
// =======================

// Listar todos los productos
app.get("/producto", (req, res) => {
    const query = "SELECT * FROM producto";
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

// Obtener un producto por ID
app.get("/producto/:id", (req, res) => {
    const { id } = req.params;
    const query = "SELECT * FROM producto WHERE idProducto = ?";
    db.query(query, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        if (results.length === 0) return res.status(404).json({ message: "Producto no encontrado" });
        res.json(results[0]);
    });
});

// Crear un nuevo producto
app.post("/producto", (req, res) => {
    const { Nombre, Unidad, Precio } = req.body;
    const query = "INSERT INTO producto (Nombre, Unidad, Precio) VALUES (?, ?, ?)";
    db.query(query, [Nombre, Unidad, Precio], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: "Producto agregado correctamente", id: results.insertId });
    });
});

// Actualizar un producto por ID
app.put("/producto/:id", (req, res) => {
    const { id } = req.params;
    const { Nombre, Unidad, Precio } = req.body;
    const query = "UPDATE producto SET Nombre = ?, Unidad = ?, Precio = ? WHERE idProducto = ?";
    db.query(query, [Nombre, Unidad, Precio, id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        if (results.affectedRows === 0) return res.status(404).json({ message: "Producto no encontrado" });
        res.json({ message: "Producto actualizado correctamente" });
    });
});

// Eliminar un producto por ID
app.delete("/producto/:id", (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM producto WHERE idProducto = ?";
    db.query(query, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        if (results.affectedRows === 0) return res.status(404).json({ message: "Producto no encontrado" });
        res.json({ message: "Producto eliminado correctamente" });
    });
});

// =======================
// INICIAR SERVIDOR
// =======================
app.listen(3000, () => {
    console.log("Servidor backend corriendo en http://localhost:3000");
});
