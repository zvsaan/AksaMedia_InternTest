import React, { useState } from 'react';

const UserProfile = ({ setUsername }) => {
  const [username, setLocalUsername] = useState(localStorage.getItem('username'));

  const handleSave = () => {
    localStorage.setItem('username', username);
    setUsername(username);
    alert('Profile berhasil diupdate');
  };

  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="flex rounded-2xl shadow-2xl max-w-3xl p-5 items-center">
        <div className="w-full px-8 md:px-16">
          <h2 className="font-bold text-2xl mb-4">User Profile</h2>
          <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="flex flex-col gap-4">
            <input
              className="p-3 mt-4 rounded-3xl border shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300"
              type="text"
              name="username"
              placeholder="Nama"
              value={username}
              onChange={(e) => setLocalUsername(e.target.value)}
              required
            />
            <button 
              type="submit" 
              className="p-3 bg-gradient-to-r from-blue-500 ring-indigo-500 text-white font-bold rounded-full transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;