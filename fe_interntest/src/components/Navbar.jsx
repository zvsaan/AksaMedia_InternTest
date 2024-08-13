import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Dropdown from './Dropdown';
import DarkModeToggle from './DarkModeToggle';

const Navbar = () => {
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
    navigate('/login');
    window.location.reload();
  };
  

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="text-white font-bold text-xl cursor-pointer" onClick={() => navigate('/dashboard')}>Intern Test</div>
      <div className="flex items-center space-x-4">
        <DarkModeToggle />
        <Dropdown username={username} onLogout={handleLogout} />
      </div>
    </nav>
  );
};

export default Navbar;