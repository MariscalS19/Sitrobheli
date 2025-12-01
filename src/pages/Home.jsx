import { useState } from 'react';
import './Home.css';
import Register from './Register.jsx';
import SitroLogo from '../Components/SitroLogo.jsx';

export default function Home() {
    const [showRegister, setShowRegister] = useState(false);

    const toggleRegister = () => {
        setShowRegister(!showRegister);
    };
    return (
        <div className='homeMainContainer'>
            <div className='homeContainer'>
                <h1 className='homeContainerTitle'>
                    <SitroLogo className='homeContainerLogo' />
                </h1>

                <div className='homeContainerButtons'>
                    <a href='/login' className='btn'>
                        Log In
                    </a>
                    <button onClick={toggleRegister} className='btn'>
                        {showRegister ? 'Hide Register' : 'Sign Up'}
                    </button>
                </div>
            </div>

            {showRegister && (
                <div className='homeRegisterSection'>
                    <Register onClose={toggleRegister} />
                </div>
            )}
        </div>
    );
}
