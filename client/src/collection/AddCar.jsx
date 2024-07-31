// src/components/AddCar.jsx
import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import AddCarModal from './AddCarModal';
import './collection.css'; // Assuming you will add styles for other components here

const AddCar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div>
            <div className="addBox">
            <button className="addButton" onClick={openModal}>
                <FaPlus />
            </button>
        </div>
            <AddCarModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
        
    );
}

export default AddCar;
