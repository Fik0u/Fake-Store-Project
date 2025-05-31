'use client';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import '@/styles/navbar.css'

export default function Navbar() {

    const { user, logout } = useAuth();

return (
    <nav className="navbar">
        <div>
        <Link href="/">Home</Link>
        </div>
        <div className='navbar-user'>
        {user ? (
            <>
                <span><strong>{user.username}</strong></span>
                <button onClick={logout}>Logout</button>
            </>
        ) : (
            <Link href="/login">Login</Link>
        )}
        </div>
    </nav>
);
}
