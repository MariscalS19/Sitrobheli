import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Input from '../Components/input.jsx';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login:', email, password);

        // Aquí validarías las credenciales con el backend
        // Si el login es exitoso:

        // Ejemplo: redirigir según el tipo de usuario
        if (email.includes('admin')) {
            navigate('/admin/productos');
        } else if (email.includes('trabajador')) {
            navigate('/trabajador/pedidos');
        } else {
            navigate('/cliente/pedidos');
        }
    };

    return (
        <div className='loginContainer'>
            <div className='loginContent'>
                <h1 className='loginTitle'>Log In</h1>

                <form onSubmit={handleSubmit} className='loginForm'>
                    <div className='inputLoginGroup'>
                        <Input
                            keyword='Login'
                            className='inputLogin'
                            text='Email'
                            type='email'
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            icon={
                                <svg viewBox='0 0 24 24'>
                                    <path d='M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z' />
                                </svg>
                            }
                        />
                    </div>

                    <div className='inputLoginGroup'>
                        <Input
                            keyword='Login'
                            className='inputLogin'
                            text='Password'
                            type='password'
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            icon={
                                <svg viewBox='0 0 24 24'>
                                    <path d='M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z' />
                                </svg>
                            }
                        />
                    </div>

                    <button type='submit' className='submitButtonLogin'>
                        Enter
                    </button>
                </form>
            </div>
        </div>
    );
}
