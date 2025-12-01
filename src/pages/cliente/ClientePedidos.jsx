
import React, { useState, useEffect } from "react";
import "./ClientePedidos.css";

const categorias = ["Todo", "Frutas", "Verduras", "Cereales", "Abarrotes", "Cremería", "Carnes"];

export default function ClientePedidos() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [categoriaActiva, setCategoriaActiva] = useState("Todo");
  const [busqueda, setBusqueda] = useState("");
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/producto")
      .then((res) => res.json())
      .then((data) => {
        setProductos(data);
        setCargando(false);
      })
      .catch((err) => {
        console.error("Error al obtener productos:", err);
        setCargando(false);
      });
  }, []);

  const productosFiltrados = productos.filter((prod) => {
    const coincideCategoria =
      categoriaActiva === "Todo" || prod.Nombre.toLowerCase().includes(categoriaActiva.toLowerCase());
    const coincideBusqueda = prod.Nombre.toLowerCase().includes(busqueda.toLowerCase());
    return coincideCategoria && coincideBusqueda;
  });

  return (
    <div className="clientePedidosContainer">

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

        <button className="iconBtn" onClick={() => alert("Ir al carrito...")}>
          <svg width="28" height="28" fill="none" stroke="#143D2B" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="9" cy="20" r="1" />
            <circle cx="17" cy="20" r="1" />
            <path d="M3 4h2l3 12h11l3-8H6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </header>

      {/* Buscador */}
      <div className="clientePedidosBusqueda">
        <div className="iconSearch">
          <svg width="20" height="20" viewBox="0 0 24 24" stroke="#888" strokeWidth="2" fill="none">
            <circle cx="11" cy="11" r="7" />
            <line x1="16" y1="16" x2="22" y2="22" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Buscar productos..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      {/* Categorías */}
      <div className="clientePedidosCategorias">
        {categorias.map((cat) => (
          <button
            key={cat}
            className={cat === categoriaActiva ? "btnCategoria active" : "btnCategoria"}
            onClick={() => setCategoriaActiva(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid de Productos */}
      <div className="clientePedidosGrid">
        {cargando ? (
          <p>Cargando productos...</p>
        ) : productosFiltrados.length === 0 ? (
          <p>No hay productos disponibles</p>
        ) : (
          productosFiltrados.map((prod) => (
            <div key={prod.idProducto} className="cardProducto">
              <img src={`/assets/images/${prod.Imagen}`} alt={prod.Nombre} />
              <div className="infoProducto">
                <p className="nombreProducto">{prod.Nombre}</p>
                <p className="precioProducto">${prod.Precio} / {prod.Unidad}</p>
              </div>
              <button className="btnAgregar">+</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
