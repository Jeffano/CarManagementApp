import React from 'react';
import { motion } from 'framer-motion';

const Banner = () => {
  return (
    <div className="px-4 lg:px-24 items-center" style={{ backgroundColor: 'rgb(236, 206, 142)' }}>
      <div className='flex flex-col md:flex-row justify-between items-center gap-12 py-40'>

        {/* left side */}
        <div>
          <motion.h2 className='text-5xl font-bold leading-snug text-black'
            whilehover={{ scale: 1.05, transition: { duration: 0.5 }, cursor: 'default'}}
            whiletap={{ scale: 0.95 }}>
            Welcome to our Diecast Car Management System!
          </motion.h2>
        </div>

        {/* right side */}
        {/* Set width to full on small screens and 3/4 on medium screens and above */}
        <div className="w-full md:w-3/4" whilehover={{ scale: 1.05 }} whiletap={{ scale: 0.95 }}> 
          <motion.p className="text-sm md:text-base text-justify"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}> {/* Adjust text size */}
            Dive into a world where your passion for collecting model cars meets digital organization.
            Whether you're an avid Car enthusiast or a Model Car collector, our platform empowers you to curate, showcase, and share your prized possessions with ease.
            From cataloging your favorite Cars to creating personalized lists and engaging with fellow collectors through comments, our website is your ultimate destination for all things model cars.
            Start exploring and bring your passion for miniature automotive marvels to life!
          </motion.p>
        </div>
      </div>
    </div>
  )
}

export default Banner;
