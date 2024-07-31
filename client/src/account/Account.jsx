import React, { useState, useEffect, useContext } from 'react';
import './Account.css'; // Import the CSS file for additional styling
import Banner from './Banner';
import { AuthContext } from '../authentication/AuthProvider';

const Account = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: `${user.email}`,
  });
  const [alert, setAlert] = useState({ type: '', message: '' });

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
        setAlert({ type: 'success', message: 'Account has been updated!' });
      } else {
        console.error('Failed to add or update user:', response.statusText);
        setAlert({ type: 'error', message: 'Failed to update user. Please try again.' });
      }
    } catch (error) {
      console.error('Error adding or updating user:', error);
      setAlert({ type: 'error', message: 'An error occurred. Please try again.' });
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:bg-gray-800 dark:border dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h2 className="text-xl font-bold leading-tight tracking-tight text-center text-gray-900 md:text-2xl dark:text-white">
              Account Information
            </h2>
            {alert.message && (
              <div
                className={`flex items-center p-4 mb-4 text-sm ${alert.type === 'success' ? 'text-green-800 border border-green-300 bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800' : 'text-red-800 border border-red-300 bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800'}`}
                role="alert"
              >
                <svg
                  className="flex-shrink-0 inline w-4 h-4 me-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d={alert.type === 'success' ? "M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" : "M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"}
                  />
                </svg>
                <span className="sr-only">{alert.type === 'success' ? 'Success' : 'Error'}</span>
                <div>
                  <span className="font-medium">{alert.type === 'success' ? 'Success!' : 'Error alert!'}</span> {alert.message}
                </div>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  readOnly
                />
              </div>
              <button
                type="submit"
                className="w-full font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                style={{
                  color: 'black',
                  backgroundColor: 'rgb(233, 211, 208)',
                  transition: 'background-color 0.3s',
                }}
                onMouseEnter={(e) => { e.target.style.backgroundColor = 'rgb(200, 180, 175)' }}
                onMouseLeave={(e) => { e.target.style.backgroundColor = 'rgb(233, 211, 208)' }}
              >
                Save Account Information
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Account;
