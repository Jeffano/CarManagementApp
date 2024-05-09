import React from 'react';
import { motion } from 'framer-motion';

const Banner = () => {
    return (
        <div className="px-4 lg:px-24 items-center" style={{ backgroundColor: 'rgb(233, 211, 208)' }}>
            <div className='flex flex-col items-center pt-20 pb-5'>
                <motion.h2 className='text-5xl font-bold leading-snug text-black'
                    whileHover={{ scale: 1.05, transition: { duration: 0.5 }, cursor: 'default' }}
                    whileTap={{ scale: 0.95 }}>
                    My Lists
                </motion.h2>
            </div>
            <div>
                <motion.p className="text-lg text-center text-gray-700 pb-10">
                    Manage a list of your favorite cars
                </motion.p>
            </div>
        </div>
    )
}

export default Banner;
