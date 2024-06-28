import React from 'react';
import { motion } from 'framer-motion';

const Banner = () => {
    return (
        <div className="px-4 lg:px-24 items-center  dark:bg-gray-800">
            <div className='flex flex-col items-center pt-20 pb-5'>
                <motion.h2 className='text-5xl font-bold leading-snug'
                    style={{ color: 'rgb(233, 211, 208)' }}
                    whileHover={{ scale: 1.05, transition: { duration: 0.5 }, cursor: 'default' }}
                    whileTap={{ scale: 0.95 }}>
                    My Collection
                </motion.h2>
            </div>
            <div>
                <motion.p className="text-lg text-center pb-10" style={{ color: 'rgb(146, 213, 230)' }}>
                    Manage Your Cars
                </motion.p>
            </div>
        </div>
    )
}

export default Banner;
