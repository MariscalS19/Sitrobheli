// server.js
import express from "express";
import cors from "cors";
import mysql from "mysql2";

const app = express();
app.use(cors());
app.use(express.json());

// =======================
// CONEXIÓN A MYSQL
// =======================
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // normalmente vacío en XAMPP
  database: "sitrobheli"
});

// Verificar conexión
db.connect(err => {
  if (err) {
    console.error("Error al conectar con MySQL:", err);
    return;
  }
  console.log("✔ Conectado a MySQL");
});

// =======================
// RUTA DE PRUEBA
// =======================
app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente 🚀");
});

// =======================
// RUTAS DE PRODUCTO
// =======================
app.get("/producto", (req, res) => {
  const query = "SELECT * FROM producto";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

app.get("/producto/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM producto WHERE idProducto = ?";
  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ message: "Producto no encontrado" });
    res.json(results[0]);
  });
});

app.post("/producto", (req, res) => {
  const { Nombre, Unidad, Precio, Imagen } = req.body;
  const query = "INSERT INTO producto (Nombre, Unidad, Precio, Imagen) VALUES (?, ?, ?, ?)";
  db.query(query, [Nombre, Unidad, Precio, Imagen || null], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Producto agregado correctamente", id: results.insertId });
  });
});

app.put("/producto/:id", (req, res) => {
  const { id } = req.params;
  const { Nombre, Unidad, Precio, Imagen } = req.body;
  const query = "UPDATE producto SET Nombre = ?, Unidad = ?, Precio = ?, Imagen = ? WHERE idProducto = ?";
  db.query(query, [Nombre, Unidad, Precio, Imagen || null, id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.affectedRows === 0) return res.status(404).json({ message: "Producto no encontrado" });
    res.json({ message: "Producto actualizado correctamente" });
  });
});

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
// RUTAS DE PEDIDO / CARRITO
// =======================

// Obtener pedido pendiente de un cliente
app.get("/pedido/pendiente/:idCliente", (req, res) => {
  const { idCliente } = req.params;
  const query = "SELECT * FROM pedido WHERE idCliente = ? AND EstadoPedido = 'Pendiente' LIMIT 1";
  db.query(query, [idCliente], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.json({}); // No hay pedido pendiente
    res.json(results[0]);
  });
});

// Agregar producto al carrito/pedido
app.post("/pedido/agregar", (req, res) => {
  const { idCliente, idProducto, Cantidad } = req.body;

  if (!idCliente || !idProducto || !Cantidad) {
    return res.status(400).json({ error: "Faltan datos: idCliente, idProducto o Cantidad" });
  }

  // Buscar pedido pendiente del cliente
  const pedidoQuery = "SELECT * FROM pedido WHERE idCliente = ? AND EstadoPedido = 'Pendiente' LIMIT 1";
  db.query(pedidoQuery, [idCliente], (err, pedidos) => {
    if (err) return res.status(500).json({ error: err });

    let idPedido;

    if (pedidos.length === 0) {
      // Crear pedido pendiente
      const crearPedidoQuery = "INSERT INTO pedido (idCliente, FechaPedido, EstadoPedido) VALUES (?, NOW(), 'Pendiente')";
      db.query(crearPedidoQuery, [idCliente], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        idPedido = result.insertId;
        agregarProducto(idPedido, idProducto, Cantidad, res);
      });
    } else {
      idPedido = pedidos[0].idPedido;
      agregarProducto(idPedido, idProducto, Cantidad, res);
    }
  });
});

// Función para agregar producto y actualizar cantidad si ya existe
function agregarProducto(idPedido, idProducto, Cantidad, res) {
  const checkQuery = "SELECT * FROM pedido_producto WHERE idPedido = ? AND idProducto = ?";
  db.query(checkQuery, [idPedido, idProducto], (err, results) => {
    if (err) return res.status(500).json({ error: err });

    if (results.length > 0) {
      const nuevaCantidad = results[0].Cantidad + Cantidad;
      const updateQuery = "UPDATE pedido_producto SET Cantidad = ? WHERE idPedido = ? AND idProducto = ?";
      db.query(updateQuery, [nuevaCantidad, idPedido, idProducto], (err) => {
        if (err) return res.status(500).json({ error: err });
        devolverCarrito(idPedido, res);
      });
    } else {
      const insertQuery = "INSERT INTO pedido_producto (idPedido, idProducto, Cantidad) VALUES (?, ?, ?)";
      db.query(insertQuery, [idPedido, idProducto, Cantidad], (err) => {
        if (err) return res.status(500).json({ error: err });
        devolverCarrito(idPedido, res);
      });
    }
  });
}

// Devolver carrito actualizado
function devolverCarrito(idPedido, res) {
  const query = `
    SELECT pp.idProducto, p.Nombre, p.Precio, pp.Cantidad, p.Unidad, p.Imagen
    FROM pedido_producto pp
    JOIN producto p ON pp.idProducto = p.idProducto
    WHERE pp.idPedido = ?
  `;
  db.query(query, [idPedido], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
}

// Obtener productos de un pedido
app.get("/pedido/:idPedido/productos", (req, res) => {
  const { idPedido } = req.params;
  const query = `
    SELECT pp.idProducto, p.Nombre, p.Precio, pp.Cantidad, p.Unidad, p.Imagen
    FROM pedido_producto pp
    JOIN producto p ON pp.idProducto = p.idProducto
    WHERE pp.idPedido = ?
  `;
  db.query(query, [idPedido], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Actualizar cantidad de un producto en el carrito
app.put("/pedido/:idPedido/producto", (req, res) => {
  const { idPedido } = req.params;
  const { idProducto, Cantidad } = req.body;
  if (!idProducto || !Cantidad) return res.status(400).json({ error: "Faltan datos" });

  const query = "UPDATE pedido_producto SET Cantidad = ? WHERE idPedido = ? AND idProducto = ?";
  db.query(query, [Cantidad, idPedido, idProducto], (err) => {
    if (err) return res.status(500).json({ error: err });
    devolverCarrito(idPedido, res);
  });
});

// Eliminar producto del carrito
app.delete("/pedido/:idPedido/producto/:idProducto", (req, res) => {
  const { idPedido, idProducto } = req.params;
  const query = "DELETE FROM pedido_producto WHERE idPedido = ? AND idProducto = ?";
  db.query(query, [idPedido, idProducto], (err) => {
    if (err) return res.status(500).json({ error: err });
    devolverCarrito(idPedido, res);
  });
});

// Finalizar pedido
app.put("/pedido/:idPedido/finalizar", (req, res) => {
  const { idPedido } = req.params;
  const query = "UPDATE pedido SET EstadoPedido = 'Finalizado' WHERE idPedido = ?";
  db.query(query, [idPedido], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ mensaje: "Pedido finalizado" });
  });
});

// =======================
// INICIAR SERVIDOR
// =======================
app.listen(3000, () => {
  console.log("Servidor backend corriendo en http://localhost:3000");
});
