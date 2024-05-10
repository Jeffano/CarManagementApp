import React, { useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AuthContext } from '../authentication/AuthProvider';

// react icons
import { FaCar } from "react-icons/fa";
import { FaBarsStaggered } from "react-icons/fa6";
import { FaXmark } from "react-icons/fa6";

const Navbar = () => {

  // Get user and signOutUser from AuthContext
  const { user, signOutUser } = useContext(AuthContext);

  // Define a state variable isMenuOpen with initial value of false
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  // Define another state variable isSticky with initial value of false
  const [isSticky, setIsSticky] = React.useState(false);

  // toggle menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.addEventListener('scroll', handleScroll);
    }
  }, []);

  // navItems
  const navItems = user ? [
    { link: 'Home', path: '/' },
    { link: 'Collection', path: '/collection' },
    { link: 'List', path: '/list' },
    { link: 'Account', path: '/account' },
    { link: 'Log Out', onClick: signOutUser },
  ] : [
    { link: 'Home', path: '/' },
    { link: 'Sign Up', path: '/sign-up' },
    { link: 'Log In', path: '/sign-in' }
  ]

  return (
    <header className='w-full bg-transparent fixed top-0 left-0 right-0 transtion-all ease-in duration-300'>
      <nav className={`py-4 lg:px-24 px-4 ${isSticky ? "sticky top-0 left-0 right-0 dark:bg-gray-800" : ""}`}>
        <div className='flex justify-between items-center text-base gap-8'>

          {/* logo */}
          <Link to='/' className='text-2xl font-bold flex items-center gap-2' style={{ color: 'rgb(233, 211, 208)' }}><FaCar className='inline-block' />CARS</Link>

          {/* nav items for large devices */}
          <ul className='md:flex space-x-12 hidden'>
            {
              navItems.map(({ link, path, onClick }) => (
                <li key={link}>
                  {onClick ? (
                    <button onClick={onClick} className='block text-base uppercase cursor-pointer'>
                      {link}
                    </button>
                  ) : (
                    <Link to={path} className='block text-base uppercase cursor-pointer' style={{ color: 'rgb(233, 211, 208)' }}>
                      <span style={{ transition: 'color 0.3s, transform 0.3s' }} className='hover:text-blue-400 hover:transform hover:scale-105'>
                        {link}
                      </span>
                    </Link>
                  )}
                </li>
              ))
            }
          </ul>

          {/* btn items for lg devices */}
          {/* <div className='space-x-12 hidden lg:flex items-center'>
            <button>
              <FaBarsStaggered className='w-5 hover:text-blue-700' />
            </button>
          </div> 
          */}

          {/* menu btn formobile devices */}
          <div className='md:hidden'>
            <button onClick={toggleMenu} className='text-black focus:outline-none'>
              {
                isMenuOpen ? <FaXmark className='h-5 w-5 text-black' /> : <FaBarsStaggered className='h-5 w-5 text-black' />
              }
            </button>
          </div>
        </div>

        {/* nav items for sm devices */}
        <ul className={`space-y-4 px-4 mt-16 py-7 bg-blue-700 ${isMenuOpen ? "block fixed top-0 right-0 left-0" : "hidden"}`}>
          {
            navItems.map(({ link, path }) => (
              <li key={path}>
                <Link to={path} className='block text-base text-white uppercase cursor-pointer'>{link}</Link>
              </li>
            ))
          }
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
