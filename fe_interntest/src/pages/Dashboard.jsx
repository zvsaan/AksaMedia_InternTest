import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [data, setData] = useState(JSON.parse(localStorage.getItem('data')) || []);
  const [page, setPage] = useState(new URLSearchParams(window.location.search).get('page') || 1);
  const [searchTerm, setSearchTerm] = useState(new URLSearchParams(window.location.search).get('search') || '');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set('page', page);
    params.set('search', searchTerm);
    window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
  }, [page, searchTerm]);

  const handleSave = () => {
    const updatedData = [...data];
    if (editIndex !== null) {
      updatedData[editIndex] = { name: newName, age: newAge, address: newAddress };
      setEditIndex(null);
    } else {
      updatedData.push({ name: newName, age: newAge, address: newAddress });
    }
    setData(updatedData);
    localStorage.setItem('data', JSON.stringify(updatedData));
    setIsModalOpen(false);
    setNewName('');
    setNewAge('');
    setNewAddress('');
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setNewName(data[index].name);
    setNewAge(data[index].age);
    setNewAddress(data[index].address);
    setIsModalOpen(true);
  };

  const handleDelete = (index) => {
    const updatedData = data.filter((_, i) => i !== index);
    setData(updatedData);
    localStorage.setItem('data', JSON.stringify(updatedData));
  };

  const filteredData = data.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="p-8 bg-white dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">Dashboard</h1>

      <div className="pb-4 bg-white dark:bg-gray-900">
        <div className="relative mt-1 flex justify-between">
          <input 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for items"
            className="p-3 w-80 rounded-full border shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300 dark:bg-gray-700 dark:text-white"
          />
          <button
            className="p-3 bg-gradient-to-r from-blue-500 text-white font-bold rounded-full transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg"
            onClick={() => setIsModalOpen(true)}
          >
            Create
          </button>
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="p-4">
                <div className="flex items-center">
                  <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                  <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Umur</th>
              <th scope="col" className="px-6 py-3">Alamat</th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.slice((page - 1) * 10, page * 10).map((item, index) => (
              <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input id={`checkbox-table-search-${index}`} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label htmlFor={`checkbox-table-search-${index}`} className="sr-only">checkbox</label>
                  </div>
                </td>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {item.name}
                </th>
                <td className="px-6 py-4">{item.age}</td>
                <td className="px-6 py-4">{item.address}</td>
                <td className="px-6 py-4">
                  <button onClick={() => handleEdit(index)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
                  <button onClick={() => handleDelete(index)} className="font-medium text-red-600 dark:text-red-500 hover:underline ml-2">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">{editIndex !== null ? 'Edit Data' : 'Create New Data'}</h2>
            <input 
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Name"
              className="w-full mb-4 p-3 rounded-full border shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300 dark:bg-gray-700 dark:text-white"
            />
            <input 
              type="number"
              value={newAge}
              onChange={(e) => setNewAge(e.target.value)}
              placeholder="Age"
              className="w-full mb-4 p-3 rounded-full border shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300 dark:bg-gray-700 dark:text-white"
            />
            <input 
              type="text"
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
              placeholder="Address"
              className="w-full mb-4 p-3 rounded-full border shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300 dark:bg-gray-700 dark:text-white"
            />
            <div className="flex justify-end space-x-4">
              <button 
                className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-full shadow hover:bg-gray-400 dark:hover:bg-gray-700"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                className="px-4 py-2 bg-blue-500 text-white rounded-full shadow hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;