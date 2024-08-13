import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [divisions, setDivisions] = useState([]); 
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newPosition, setNewPosition] = useState('');
  const [newDivisionId, setNewDivisionId] = useState('');
  const [newImage, setNewImage] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchEmployees();
    fetchDivisions(); 
  }, [page, searchTerm]);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/employees`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          page,
          search: searchTerm
        }
      });
      if (response.data.status === 'success') {
        setData(response.data.data.employees);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const fetchDivisions = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/divisions', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data.status === 'success') {
        setDivisions(response.data.data.divisions);
      }
    } catch (error) {
      console.error("Error fetching divisions:", error);
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append('name', newName);
      formData.append('phone', newPhone);
      formData.append('position', newPosition);
      formData.append('division_id', newDivisionId);
      if (newImage) formData.append('image', newImage);

      const url = editIndex !== null
        ? `http://localhost:8000/api/employees/${data[editIndex].id_employee}`
        : 'http://localhost:8000/api/employees';

      const method = editIndex !== null ? 'post' : 'post';

      const response = await axios({
        method: method,
        url: url,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
        data: formData
      });

      if (response.data.status === 'success') {
        fetchEmployees();
        setIsModalOpen(false);
        setNewName('');
        setNewPhone('');
        setNewPosition('');
        setNewDivisionId('');
        setNewImage(null);
        setEditIndex(null);
      }
    } catch (error) {
      console.error("Error saving employee data:", error);
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setNewName(data[index].name);
    setNewPhone(data[index].phone);
    setNewPosition(data[index].position);
    setNewDivisionId(data[index].division.id_division);
    setIsModalOpen(true);
  };

  const handleDelete = async (id_employee) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/employees/${id_employee}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.status === 'success') {
        fetchEmployees();
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
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
              <th scope="col" className="px-6 py-3">No</th>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Phone</th>
              <th scope="col" className="px-6 py-3">Position</th>
              <th scope="col" className="px-6 py-3">Division</th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.name}</td>
                <td className="px-6 py-4">{item.phone}</td>
                <td className="px-6 py-4">{item.position}</td>
                <td className="px-6 py-4">{item.division.name}</td>
                <td className="px-6 py-4">
                  <button onClick={() => handleEdit(index)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
                  <button onClick={() => handleDelete(item.id_employee)} className="font-medium text-red-600 dark:text-red-500 hover:underline ml-2">Delete</button>
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
              type="text"
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
              placeholder="Phone"
              className="w-full mb-4 p-3 rounded-full border shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300 dark:bg-gray-700 dark:text-white"
            />
            <input 
              type="text"
              value={newPosition}
              onChange={(e) => setNewPosition(e.target.value)}
              placeholder="Position"
              className="w-full mb-4 p-3 rounded-full border shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300 dark:bg-gray-700 dark:text-white"
            />
            <select
              value={newDivisionId}
              onChange={(e) => setNewDivisionId(e.target.value)}
              className="w-full mb-4 p-3 rounded-full border shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select Division</option>
              {divisions.map(division => (
                <option key={division.id_division} value={division.id_division}>{division.name}</option>
              ))}
            </select>
            <input 
              type="file"
              onChange={(e) => setNewImage(e.target.files[0])}
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