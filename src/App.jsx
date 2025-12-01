import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ClientePedidos from './pages/cliente/ClientePedidos';
import ClienteCarrito from './pages/cliente/ClienteCarrito';
import TrabajadorPedidos from './pages/trabajador/TrabajadorPedidos';
import AdminProductos from './pages/admin/AdminProductos';

function App() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />

            {/* Rutas por rol */}
            <Route path='/cliente/pedidos' element={<ClientePedidos />} />
            <Route path='/cliente/carrito' element={<ClienteCarrito />} />
            
            <Route path='/trabajador/pedidos' element={<TrabajadorPedidos />} />
            <Route path='/admin/productos' element={<AdminProductos />} />
        </Routes>
    );
}

export default App;
