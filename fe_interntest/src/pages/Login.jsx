import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import img from "../assets/login2.jpg";

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'Admin#1234') {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('username', username);
      setIsAuthenticated(true);
      navigate('/dashboard');
    } else {
      alert('Username dan Password salah');
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="flex rounded-2xl shadow-2xl max-w-3xl p-5 items-center">
        <div className="md:w-1/2 px-8 md:px-16">
          <h2 className="font-bold text-2xl">Login</h2>
          <p className="text-xs mt-4">Masukkan akun Anda untuk login</p>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              className="p-3 mt-8 rounded-3xl border shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300"
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              className="p-3 rounded-3xl border shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300"
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="p-3 bg-gradient-to-r from-blue-500 ring-indigo-500 text-white font-bold rounded-full transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg"
            >
              Login
            </button>
          </form>
          <div className="mt-4 bg-blue-100 border border-blue-500 text-blue-700 p-2 rounded-md">
            <p className="text-sm">Login Menggunakan:</p>
            <p className="text-sm">Username: <strong>admin</strong></p>
            <p className="text-sm">Password: <strong>Admin#1234</strong></p>
          </div>
        </div>
        <div className="md:block hidden w-1/2">
          <img className="rounded-2xl" src={img} alt="Login" />
        </div>
      </div>
    </section>
  );
};

export default Login;