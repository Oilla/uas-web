// /login/page.tsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from 'src/components/UserContext';

// di komponen login



export default function LoginPage() {
    const { setUser } = useUser();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('');
    const router = useRouter();

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
    const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    // Ambil response text dulu
    const text = await res.text();

    // Jika ada isi text, parse JSON, jika tidak beri nilai default
    const data = text ? JSON.parse(text) : {};

    if (res.ok) {
        setStatus('✅ Login berhasil');
        if (data.user?.role === 'admin') {
            setUser(data.user);
            router.push('/profile');
        } else {
            router.push('/');
        }
        } else {
        setStatus(`❌ ${data.error || 'Login gagal'}`);
        }
    }catch (error) {
    // Pastikan error message aman
        const message = error instanceof Error ? error.message : String(error);
        setStatus(`❌ Terjadi kesalahan: ${message}`);
    }
    };

    return (
    
    <main className="max-w-md mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>

        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
        <input
            type="email"
            placeholder="Email"
            className="w-full border rounded p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
        />
        <input
            type="password"
            placeholder="Password"
            className="w-full border rounded p-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
        />
        <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
            Masuk
        </button>
        </form>

        {status && <p className="mt-4 text-center text-sm text-gray-700">{status}</p>}
    </main>
    );
}


