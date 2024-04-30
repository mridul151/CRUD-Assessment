import React from 'react';
import UserItem from './UserItem';

const BASE_URL = 'http://localhost:8000';

const UserList = ({ users, onUpdateUser, onDeleteUser }) => {
    return (
      <div>
        <h2>User List</h2>
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone_number}</td>
                <td>
                  {user.file_path && (
                    <img src={`${BASE_URL}${user.file_path}`} alt={user.name} className="user-image" />
                  )}
                </td>
                <td>
                  <button className="update-button" onClick={() => onUpdateUser(user)}>Update</button>
                  <button className="delete-button" onClick={() => onDeleteUser(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
export default UserList;