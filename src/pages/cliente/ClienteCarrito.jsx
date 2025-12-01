import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CarritoContext } from "../../context/CarritoContext.jsx";
import "./ClienteCarrito.css";

export default function ClienteCarrito() {
  const navigate = useNavigate();
  const { carrito, actualizarCantidad, eliminarProducto, idPedido } = useContext(CarritoContext);

  const [menuAbierto, setMenuAbierto] = useState(false);

  if (idPedido === null) {
    return <p>Cargando carrito...</p>;
  }

  // Botones de sumar y restar
  const sumar = (p) => actualizarCantidad(p.idProducto, p.Cantidad + 1);
  const restar = (p) => p.Cantidad > 1 ? actualizarCantidad(p.idProducto, p.Cantidad - 1) : eliminarProducto(p.idProducto);

  // Totales
  const subtotal = carrito.reduce((acc, p) => acc + p.Precio * p.Cantidad, 0);
  const descuento = subtotal * 0.1;
  const total = subtotal - descuento;

  return (
    <div className="carrito-container">
      {/* Sidebar */}
      <div className={`sidebar ${menuAbierto ? "open" : ""}`}>
        <div className="sidebarHeader">
          <button className="closeSidebar" onClick={() => setMenuAbierto(false)}>✕</button>
        </div>
        <ul className="sidebarMenu">
          <li>Inicio</li>
          <li>Mi Perfil</li>
          <li>Mis Pedidos</li>
          <li>Categorías</li>
          <li>Cerrar Sesión</li>
        </ul>
      </div>
      {menuAbierto && <div className="overlay" onClick={() => setMenuAbierto(false)}></div>}

      {/* Header */}
      <header className="clientePedidosHeader">
        <button className="iconBtn" onClick={() => setMenuAbierto(true)}>
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
            <path d="M3 6h18M3 12h18M3 18h18" stroke="#143D2B" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <div className="logoSitrobheli">
          <img src="/assets/images/backup/sitroLogo.svg" alt="Sitrobheli Logo" className="sitroLogoIMG" />
        </div>

        {/* Botón volver */}
        <button className="btn-volver" onClick={() => navigate("/cliente/pedidos")}>
          ← Volver
        </button>
      </header>

      {/* Lista de productos */}
      <div className="carrito-items">
        {carrito.length === 0 ? (
          <p style={{ textAlign: "center" }}>No tienes productos en tu carrito</p>
        ) : (
          carrito.map(p => (
            <div key={p.idProducto} className="carrito-item">
              <img src={`/assets/images/${p.Imagen}`} alt={p.Nombre} />
              <div className="carrito-info">
                <h3>{p.Nombre}</h3>
                <p>${p.Precio} / {p.Unidad}</p>
                <div className="cantidad-controles">
                  <button className="btn-cantidad" onClick={() => restar(p)}>-</button>
                  <span>{p.Cantidad} {p.Unidad}</span>
                  <button className="btn-cantidad" onClick={() => sumar(p)}>+</button>
                </div>
              </div>
              <button className="btn-eliminar" onClick={() => eliminarProducto(p.idProducto)}>🗑</button>
            </div>
          ))
        )}
      </div>

      {/* Resumen de compra */}
      <div className="resumen-container">
        <h2>Resumen de Compra</h2>
        <div className="resumen-row">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="resumen-row">
          <span>Descuento</span>
          <span>${descuento.toFixed(2)}</span>
        </div>
        <div className="resumen-row total">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <button className="btn-pagar">Proceder al Pago</button>
      </div>
    </div>
  );
}
