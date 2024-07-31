import React, { useState, useEffect, useContext } from 'react';
import './Account.css'; // Import the CSS file for styling
import { AuthContext } from '../authentication/AuthProvider';

const Account = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: `${user.email}`,  // Use Firebase data
  });

  useEffect(() => {
    // Fetch user data on component mount
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/user/${user.email}`);
        const data = await response.json();

        if (data) {
          setFormData({
            firstName: data.firstName || '',
            lastName: data.lastName || '',
            email: `${user.email}`,
          });
        } else {
          // If no data found, use Firebase info
          setFormData(prevData => ({
            ...prevData,
          }));
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle error as needed
      }
    };

    fetchUserData();
  }, [user.email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/add-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('User added or updated successfully:', data);
        alert('Account Updated');
      } else {
        console.error('Failed to add or update user:', response.statusText);
        alert('Failed to add or update user. Please try again.');
      }
    } catch (error) {
      console.error('Error adding or updating user:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="account-container">
      <h2>Account Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter your first name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter your last name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            readOnly
          />
        </div>
        <button type="submit">Save Account Information</button>
      </form>
    </div>
  );
};

export default Account;
