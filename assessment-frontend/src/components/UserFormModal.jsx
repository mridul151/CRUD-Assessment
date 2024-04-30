// UserFormModal.js
import React, { useState,useEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

const UserFormModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    file: null
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    phone_number: '',
    file: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    validateField(name, value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prevState => ({
      ...prevState,
      file: file
    }));
    validateField('file', file);
  };

  const validateField = (name, value) => {
    let errorMessage = '';
    switch (name) {
      case 'name':
        errorMessage = value.trim() === '' ? 'Name is required' : '';
        break;
      case 'email':
        errorMessage = value.trim() === '' ? 'Email is required' : !isValidEmail(value) ? 'Invalid email format' : '';
        break;
      case 'phone_number':
        errorMessage = value.trim() === '' ? 'Phone number is required' : value.length !== 10 ? 'Phone number must be 10 digits' : '';
        break;
      case 'file':
        errorMessage = !value ? 'File is required' : '';
        break;
      default:
        break;
    }
    setFormErrors(prevState => ({
      ...prevState,
      [name]: errorMessage
    }));
  };

  const isValidEmail = (email) => {
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValidForm = true;
    Object.values(formErrors).forEach(error => {
      if (error !== '') {
        isValidForm = false;
      }
    });
    if (isValidForm) {
      // Form is valid, proceed with submission
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone_number', formData.phone_number);
      formDataToSend.append('file', formData.file);
      try {
        await axios.post(`${BASE_URL}/api/users/`, formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json'
          }
        });
        onSubmit();
        onClose();
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <div className="modal" style={{ display: isOpen ? 'block' : 'none' }}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Create User</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            {formErrors.name && <span className="error">{formErrors.name}</span>}
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            {formErrors.email && <span className="error">{formErrors.email}</span>}
          </div>
          <div className="form-group">
            <label>Phone Number:</label>
            <input type="tel" name="phone_number" value={formData.phone_number} onChange={handleChange} required />
            {formErrors.phone_number && <span className="error">{formErrors.phone_number}</span>}
          </div>
          <div className="form-group">
            <label>Image:</label>
            <input type="file" name="file" onChange={handleFileChange} required />
            {formErrors.file && <span className="error">{formErrors.file}</span>}
          </div>
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
}

export default UserFormModal;
