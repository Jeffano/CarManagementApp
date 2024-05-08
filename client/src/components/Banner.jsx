import React from 'react'

const Banner = () => {
  return (
    <div className="px-4 lg:px-24 bg-teal-100 items-center">
      <div className='flex w-full backdrop:flex-col md:flex-row justify-between items-center gap-12 py-40'>
        
        {/*left side*/}
        <div>
          <h2 className='text-5xl font-bold leading-snug text-black'>
            Welcome to our Diecast Car Management System!
          </h2>
        </div>


        {/*right side*/}
        <div className="w-3/4">
          <pv>
            Dive into a world where your passion for collecting model cars meets digital organization.
            Whether you're an avid Car enthusiast or a Model Car collector, our platform empowers you to curate, showcase, and share your prized possessions with ease.
            From cataloging your favorite Cars to creating personalized lists and engaging with fellow collectors through comments, our website is your ultimate destination for all things model cars.
            Start exploring and bring your passion for miniature automotive marvels to life!
          </pv>
        </div>
      </div>
    </div>
  )
}

export default Banner
