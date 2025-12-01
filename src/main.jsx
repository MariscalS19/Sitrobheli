import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { CarritoProvider } from './context/CarritoContext.jsx'; // <- importa el provider
import { BrowserRouter } from 'react-router-dom'; // <- si usas rutas

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <CarritoProvider>
                <App />
            </CarritoProvider>
        </BrowserRouter>
    </StrictMode>
);
