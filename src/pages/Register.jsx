import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../Components/input.jsx';
import './Register.css';

export default function Register({ onClose }) {
    const [nombre, setNombre] = useState('');
    const [apellidoMaterno, setApellidoMaterno] = useState('');
    const [apellidoPaterno, setApellidoPaterno] = useState('');
    const [telefono, setTelefono] = useState('');
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [isClosing, setIsClosing] = useState(false);
    const navigate = useNavigate();

    const manejarSubmit = (e) => {
        e.preventDefault();
        console.log({
            nombre,
            apellidoMaterno,
            apellidoPaterno,
            telefono,
            correo,
            password,
        });
        // Aquí iría la lógica para registrar al usuario

        // Cerrar el formulario después de guardar con transición
        if (onClose) {
            setIsClosing(true);
            setTimeout(() => {
                onClose();
            }, 400); // Tiempo de la animación
        } else {
            navigate('/');
        }
    };

    return (
        <div className={`registerContainer ${isClosing ? 'closing' : ''}`}>
            <div className='registerContent'>
                <h1 className='registerTitle'>Sign Up</h1>

                <form onSubmit={manejarSubmit} className='registerForm'>
                    <Input
                        keyword='Register'
                        className='inputRegister'
                        text='Name'
                        type='text'
                        placeholder='Name'
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                    <Input
                        keyword='Register'
                        className='inputRegister'
                        text='Paternal Last Name'
                        type='text'
                        placeholder='Paternal Last Name'
                        value={apellidoPaterno}
                        onChange={(e) => setApellidoPaterno(e.target.value)}
                    />
                    <Input
                        keyword='Register'
                        className='inputRegister'
                        text='Maternal Last Name'
                        type='text'
                        placeholder='Maternal Last Name'
                        value={apellidoMaterno}
                        onChange={(e) => setApellidoMaterno(e.target.value)}
                    />
                    <Input
                        keyword='Register'
                        className='inputRegister'
                        text='Email'
                        type='email'
                        placeholder='Email'
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                    />
                    <Input
                        keyword='Register'
                        className='inputRegister'
                        text='Phone'
                        type='number'
                        placeholder='Phone'
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                    />
                    <Input
                        keyword='Register'
                        className='inputRegister'
                        text='Password'
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type='submit' className='submitButtonRegister'>
                        Save
                    </button>
                </form>
            </div>
        </div>
    );
}
