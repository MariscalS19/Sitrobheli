import { createContext, useState, useEffect } from "react";

export const CarritoContext = createContext();

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState([]);
  const [idPedido, setIdPedido] = useState(null);
  const idCliente = 1;

  useEffect(() => {
    const cargarCarrito = async () => {
      try {
        // Obtener pedido pendiente
        let res = await fetch(`http://localhost:3000/pedido/pendiente/${idCliente}`);
        let data = await res.json();

        let pedidoId = data.idPedido;
        if (!pedidoId) {
          const crear = await fetch("http://localhost:3000/pedido", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idCliente }),
          });
          const creado = await crear.json();
          pedidoId = creado.idPedido;
        }

        setIdPedido(pedidoId);

        // Cargar productos del carrito
        const carritoRes = await fetch(`http://localhost:3000/pedido/${pedidoId}/productos`);
        const carritoData = await carritoRes.json();
        setCarrito(carritoData);
      } catch (err) {
        console.error("Error cargando carrito:", err);
      }
    };
    cargarCarrito();
  }, []);

  // Función para agregar producto
  const agregarProducto = async (producto, Cantidad = 1) => {
    if (!idPedido) return;

    try {
      const res = await fetch("http://localhost:3000/pedido/agregar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idCliente,
          idProducto: producto.idProducto,
          Cantidad
        })
      });
      const data = await res.json();

      setIdPedido(data.idPedido);

      // Actualizar carrito en memoria sin recargar
      setCarrito(prev => {
        const existe = prev.find(p => p.idProducto === producto.idProducto);
        if (existe) {
          return prev.map(p => p.idProducto === producto.idProducto ? { ...p, Cantidad: p.Cantidad + Cantidad } : p);
        } else {
          return [...prev, { ...producto, Cantidad }];
        }
      });

    } catch (err) {
      console.error("Error agregando producto:", err);
    }
  };

  // Función para actualizar cantidad
  const actualizarCantidad = async (idProducto, Cantidad) => {
    if (!idPedido) return;
    try {
      const res = await fetch(`http://localhost:3000/pedido/${idPedido}/producto`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idProducto, Cantidad })
      });
      if (res.ok) {
        setCarrito(prev => prev.map(p => p.idProducto === idProducto ? { ...p, Cantidad } : p));
      }
    } catch (err) {
      console.error("Error actualizando cantidad:", err);
    }
  };

  // Función para eliminar producto
  const eliminarProducto = async (idProducto) => {
    if (!idPedido) return;
    try {
      const res = await fetch(`http://localhost:3000/pedido/${idPedido}/producto/${idProducto}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setCarrito(prev => prev.filter(p => p.idProducto !== idProducto));
      }
    } catch (err) {
      console.error("Error eliminando producto:", err);
    }
  };

  return (
    <CarritoContext.Provider value={{ carrito, setCarrito, idPedido, agregarProducto, actualizarCantidad, eliminarProducto }}>
      {children}
    </CarritoContext.Provider>
  );
}
