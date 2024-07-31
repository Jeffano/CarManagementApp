import React, { useState, useContext } from 'react';
import { FaPlus } from 'react-icons/fa';
import AddCarModal from './AddCarModal';
import './collection.css'; // Assuming you will add styles for other components here
import { AuthContext } from '../authentication/AuthProvider';

const AddCar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Using useContext inside the component function
    const { user } = useContext(AuthContext);
    const currentUserEmail = user ? user.email : ''; // Handle case where user might be undefined

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div>
            <div className="addBox">
                <button className="addButton" onClick={openModal}>
                    <FaPlus />
                </button>
            </div>
            <AddCarModal isOpen={isModalOpen} onClose={closeModal} userEmail={currentUserEmail} />
        </div>
    );
}

export default AddCar;
