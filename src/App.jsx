import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import ClientePedidos from './pages/cliente/ClientePedidos';
import TrabajadorPedidos from './pages/trabajador/TrabajadorPedidos';
import AdminProductos from './pages/admin/AdminProductos';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />

                {/* Rutas por rol */}
                <Route path='/cliente/pedidos' element={<ClientePedidos />} />
                <Route
                    path='/trabajador/pedidos'
                    element={<TrabajadorPedidos />}
                />
                <Route path='/admin/productos' element={<AdminProductos />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
