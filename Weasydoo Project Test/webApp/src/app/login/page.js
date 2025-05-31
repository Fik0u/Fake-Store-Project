"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import '@/styles/login.css';


export default function LoginPage() {
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        const success = await login(username, password);
        if (success) {
            router.push('/');
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <div className='login-container'>
            <h2 className='login-title'>Login</h2>
            <form onSubmit={handleLogin} className='login-form'>
                <div>
                    <label>Username</label>
                    <input
                        type='text'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className='login-error'>{error}</p>}
                <button type='submit' className='login-button'>Login</button>
            </form>
        </div>
    )
};