import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const manejarSubmit = (e) => {
        e.preventDefault();
        console.log('Login:', correo, password);

        // Aquí validarías las credenciales con el backend
        // Si el login es exitoso:

        // Ejemplo: redirigir según el tipo de usuario
        if (correo.includes('admin')) {
            navigate('/admin/productos');
        } else if (correo.includes('trabajador')) {
            navigate('/trabajador/pedidos');
        } else {
            navigate('/cliente/pedidos');
        }

        // O simplemente ir al home:
        // navigate('/');
    };

    return (
        <div className='loginContainer'>
            <div className='loginContent'>
                <h1 className='loginTitle'>Iniciar sesión</h1>

                <form onSubmit={manejarSubmit} className='loginForm'>
                    <div className='inputGroup'>
                        <input
                            type='email'
                            placeholder='Correo'
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                        />
                    </div>

                    <div className='inputGroup'>
                        <input
                            type='password'
                            placeholder='Contraseña'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button type='submit' className='submitButton'>
                        Ingresar
                    </button>
                </form>
            </div>
        </div>
    );
}
