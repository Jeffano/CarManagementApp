import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../authentication/AuthProvider';

const SignUp = () => {
    const { createUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from || { pathname: '/' };

    const handleSignUp = async (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirmPassword = form['confirm-password'].value;
        const firstName = form.firstName.value;  // New variable for first name
        const lastName = form.lastName.value;    // New variable for last name

        // Clear error message when user starts typing in the text box
        const inputs = form.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                form.querySelector('label[for=error]').textContent = '';
            });
        });

        // Regular expression for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            form.querySelector('label[for=error]').textContent = 'Invalid Email';
            return;
        }

        if (password !== confirmPassword) {
            form.querySelector('label[for=error]').textContent = 'Passwords Do Not Match';
            return;
        }

        // Check if the password is at least 8 characters long
        if (password.length < 8) {
            form.querySelector('label[for=error]').textContent = 'Password must be at least 8 characters long';
            return;
        }

        try {
            const userCredential = await createUser(email, password);
            const user = userCredential.user;
    
            // Proceed to add user details to MongoDB
            try {
                const response = await fetch('http://localhost:3000/add-user', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ firstName, lastName, email }),
                });
    
                const result = await response.json();
    
                if (response.ok) {
                    console.log('User added successfully:', result);
                    navigate(from, { replace: true });
                } else {
                    console.error('Failed to add user:', result);
                    form.querySelector('label[for=error]').textContent = 'Failed to add user';
                }
            } catch (dbError) {
                console.error('Error adding user to database:', dbError);
                form.querySelector('label[for=error]').textContent = 'Error adding user to database';
            }
    
        } catch (error) {
            form.querySelector('label[for=error]').textContent = 'Email Already Exists';
            console.error("Error Checking Email:", error);
            // Handle error message setting if needed
        }
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900 mt-16">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-center text-gray-900 md:text-2xl dark:text-white">
                            Create Your Account
                        </h1>
                        <form
                            onSubmit={handleSignUp}
                            className="space-y-4 md:space-y-6"
                            action="#"
                        >
                            <div>
                                <label
                                    htmlFor="firstName"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    id="firstName"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="John"
                                    required=""
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="lastName"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    id="lastName"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Doe"
                                    required=""
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="example@email.com"
                                    required=""
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required=""
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="confirm-password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    name="confirm-password"
                                    id="confirm-password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required=""
                                />
                            </div>
                            <div className="flex items-start">
                                <div className="ml-3 text-sm">
                                    <label
                                        htmlFor="error"
                                        className="font-bold"
                                        style={{ color: 'rgb(182, 36, 79)' }}
                                    ></label>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                style={{
                                    color: 'black', // Explicitly set text color to black
                                    backgroundColor: 'rgb(233, 211, 208)',
                                    transition: 'background-color 0.3s', // Add transition for smooth effect
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.backgroundColor =
                                        'rgb(200, 180, 175)';
                                }} // Darker color on hover
                                onMouseLeave={(e) => {
                                    e.target.style.backgroundColor =
                                        'rgb(233, 211, 208)';
                                }} // Original color on mouse leave
                            >
                                Create Account
                            </button>

                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account?{' '}
                                <Link
                                    to="/sign-in"
                                    className="font-medium"
                                    style={{ color: 'rgb(233, 211, 208)' }}
                                >
                                    {' '}
                                    Login Here{' '}
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SignUp;
