import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserList from '../src/components/UserList';
import SearchBar from '../src/components/SearchBar';
import UserFormModal from './components/UserFormModal';


const BASE_URL = 'http://localhost:8000';

const App = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/users/`);
      setUsers(response.data.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleCreateUser = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handleUpdateUser = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`${BASE_URL}/api/users/${userId}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitForm = () => {
    fetchData();
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h1>User Management App</h1>
      <button onClick={handleCreateUser}>Create User</button>
      <SearchBar onSearch={handleSearch} />
      <UserList
        users={filteredUsers}
        onUpdateUser={handleUpdateUser}
        onDeleteUser={handleDeleteUser}
      />
      <UserFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitForm}
        initialValues={selectedUser}
      />
    </div>
  );
}


export default App;
