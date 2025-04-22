import React, { useState, useEffect } from 'react';
import { getFarmers, getConsumers, addUser, blockUser, unblockUser, removeUser } from '../utils/api';

const UserManagement = ({ token }) => {
  const [farmers, setFarmers] = useState([]);
  const [consumers, setConsumers] = useState([]);
  const [farmerPage, setFarmerPage] = useState(1);
  const [consumerPage, setConsumerPage] = useState(1);
  const [farmerSearch, setFarmerSearch] = useState('');
  const [consumerSearch, setConsumerSearch] = useState('');
  const [farmerTotal, setFarmerTotal] = useState(0);
  const [consumerTotal, setConsumerTotal] = useState(0);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'farmer' });
  const [showAddForm, setShowAddForm] = useState(false);

  const fetchFarmers = async () => {
    try {
      const { data } = await getFarmers({ page: farmerPage, limit: 10, search: farmerSearch }, token);
      setFarmers(data.farmers);
      setFarmerTotal(data.total);
    } catch (err) {
      console.error('Error fetching farmers:', err);
    }
  };

  const fetchConsumers = async () => {
    try {
      const { data } = await getConsumers({ page: consumerPage, limit: 10, search: consumerSearch }, token);
      setConsumers(data.consumers);
      setConsumerTotal(data.total);
    } catch (err) {
      console.error('Error fetching consumers:', err);
    }
  };

  useEffect(() => {
    fetchFarmers();
    fetchConsumers();
  }, [farmerPage, consumerPage, farmerSearch, consumerSearch, token]);

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await addUser(newUser, token);
      setNewUser({ name: '', email: '', password: '', role: 'farmer' });
      setShowAddForm(false);
      if (newUser.role === 'farmer') fetchFarmers();
      else fetchConsumers();
    } catch (err) {
      console.error('Error adding user:', err);
    }
  };

  const handleAction = async (action, id, role) => {
    if (action === 'remove' && !window.confirm('Are you sure you want to remove this user?')) return;
    try {
      if (action === 'block') await blockUser(id, token);
      else if (action === 'unblock') await unblockUser(id, token);
      else if (action === 'remove') await removeUser(id, token);
      if (role === 'farmer') fetchFarmers();
      else fetchConsumers();
    } catch (err) {
      console.error(`Error ${action} user:`, err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-500/20 backdrop-blur-xl rounded-3xl shadow-2xl p-6 text-white">
        <h3 className="text-xl font-bold mb-4">Farmer Management</h3>
        <input
          type="text"
          placeholder="Search farmers..."
          value={farmerSearch}
          onChange={(e) => setFarmerSearch(e.target.value)}
          className="mb-4 p-2 border rounded-md w-full"
        />
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-transparent">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {farmers.map((farmer) => (
              <tr key={farmer._id}>
                <td className="p-2 border">{farmer.name}</td>
                <td className="p-2 border">{farmer.email}</td>
                <td className="p-2 border">{farmer.status}</td>
                <td className="p-2 border space-x-2">
                  {farmer.status === 'active' ? (
                    <button
                      onClick={() => handleAction('block', farmer._id, 'farmer')}
                      className="bg-yellow-500 text-white p-1 rounded"
                    >
                      Block
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAction('unblock', farmer._id, 'farmer')}
                      className="bg-green-500 text-white p-1 rounded"
                    >
                      Unblock
                    </button>
                  )}
                  <button
                    onClick={() => handleAction('remove', farmer._id, 'farmer')}
                    className="bg-red-500 text-white p-1 rounded"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 flex justify-between">
          <button
            onClick={() => setFarmerPage((p) => Math.max(p - 1, 1))}
            disabled={farmerPage === 1}
            className="p-2 bg-blue-600 text-white rounded "
          >
            Previous
          </button>
          <button
            onClick={() => setFarmerPage((p) => p + 1)}
            disabled={farmerPage * 10 >= farmerTotal}
            className="p-2 bg-blue-600 text-white rounded "
          >
            Next
          </button>
        </div>
      </div>

      <div className="bg-gray-500/20 backdrop-blur-xl rounded-3xl shadow-2xl p-6 text-white">
        <h3 className="text-xl font-bold mb-4">Consumer Management</h3>
        <input
          type="text"
          placeholder="Search consumers..."
          value={consumerSearch}
          onChange={(e) => setConsumerSearch(e.target.value)}
          className="mb-4 p-2 border rounded-md w-full"
        />
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-transparent">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {consumers.map((consumer) => (
              <tr key={consumer._id}>
                <td className="p-2 border">{consumer.name}</td>
                <td className="p-2 border max-w-[150px] overflow-x-auto whitespace-nowrap text-ellipsis overflow-hidden  ">{consumer.email}</td>
                <td className="p-2 border">{consumer.status}</td>
                <td className="p-2 border space-x-2">
                  {consumer.status === 'active' ? (
                    <button
                      onClick={() => handleAction('block', consumer._id, 'consumer')}
                      className="bg-yellow-500 text-white p-1 rounded"
                    >
                      Block
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAction('unblock', consumer._id, 'consumer')}
                      className="bg-green-500 text-white p-1 rounded"
                    >
                      Unblock
                    </button>
                  )}
                  <button
                    onClick={() => handleAction('remove', consumer._id, 'consumer')}
                    className="bg-red-500 text-white p-1 rounded"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 flex justify-between">
          <button
            onClick={() => setConsumerPage((p) => Math.max(p - 1, 1))}
            disabled={consumerPage === 1}
            className="p-2 bg-blue-600 text-white rounded "
          >
            Previous
          </button>
          <button
            onClick={() => setConsumerPage((p) => p + 1)}
            disabled={consumerPage * 10 >= consumerTotal}
            className="p-2 bg-blue-600 text-white rounded "
          >
            Next
          </button>
        </div>
      </div>

      <div className="bg-gray-500/20 backdrop-blur-xl rounded-3xl shadow-2xl p-6 text-white">
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="mb-4 bg-blue-600 text-white p-2 rounded"
        >
          {showAddForm ? 'Cancel' : 'Add New User'}
        </button>
        {showAddForm && (
          <form onSubmit={handleAddUser} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white">Name</label>
              <input
                type="text"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                className="mt-1 block w-full p-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white">Email</label>
              <input
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                className="mt-1 block w-full p-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white">Password</label>
              <input
                type="password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                className="mt-1 block w-full p-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white bg-transparent">Role</label>
              <select
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                className="mt-1 block w-full p-2 border rounded-md"
                required
              >
                <option value="farmer" className="bg-cyan-950 text-white">Farmer</option>
                <option value="consumer" className="bg-cyan-950 text-white">Consumer</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
            >
              Add User
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UserManagement;