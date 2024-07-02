import { FaHome, FaCar, FaList, FaSignOutAlt } from "react-icons/fa";
import { BsCollectionFill } from "react-icons/bs";
import { MdAccountBox } from "react-icons/md";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";

import React, { useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../authentication/AuthProvider';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, signOutUser } = useContext(AuthContext);

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isSticky, setIsSticky] = React.useState(false);

  const from = location.state?.from || { pathname: '/' };

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
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const navItems = user ? [
    { link: 'Home', path: '/', icon: <FaHome /> },
    { link: 'Collection', path: '/collection', icon: <BsCollectionFill /> },
    { link: 'List', path: '/list', icon: <FaList /> },
    { link: 'Account', path: '/account', icon: <MdAccountBox /> },
    { link: 'Log Out', onClick: handleSignOut, icon: <FaSignOutAlt /> },
  ] : [
    { link: 'Home', path: '/', icon: <FaHome /> },
    { link: 'Sign Up', path: '/sign-up', icon: <MdAccountBox /> },
    { link: 'Sign In', path: '/sign-in', icon: <MdAccountBox /> }
  ];

  function handleSignOut() {
    signOutUser();
    navigate(from, { replace: true });
  }

  return (
    <header className='w-full bg-transparent fixed top-0 left-0 right-0 transition-all ease-in duration-300'>
      <nav className={`py-4 lg:px-24 px-4 ${isSticky ? "sticky top-0 left-0 right-0 dark:bg-gray-800" : ""}`}>
        <div className='flex justify-between items-center text-base gap-8'>

          <Link to='/' className='text-2xl font-bold flex items-center gap-2' style={{ color: '#92d5e6' }}>
            <FaCar className='inline-block' />MY CARS
          </Link>

          <ul className='md:flex space-x-12 hidden'>
            {
              navItems.map(({ link, path, onClick, icon }) => (
                <li key={link} className='flex flex-col items-center'>
                  {onClick ? (
                    <button onClick={onClick} className='text-base uppercase cursor-pointer flex flex-col items-center' style={{ color: 'rgb(233, 211, 208)' }}>
                      <span style={{ transition: 'color 0.3s, transform 0.3s' }} className='hover:text-blue-400 hover:transform hover:scale-105 flex flex-col items-center'>
                        {icon}
                        {link}
                      </span>
                    </button>
                  ) : (
                    <Link to={path} className='text-base uppercase cursor-pointer flex flex-col items-center' style={{ color: 'rgb(233, 211, 208)' }}>
                      <span style={{ transition: 'color 0.3s, transform 0.3s' }} className='hover:text-blue-400 hover:transform hover:scale-105 flex flex-col items-center'>
                        {icon}
                        {link}
                      </span>
                    </Link>
                  )}
                </li>
              ))
            }
          </ul>

          <div className='md:hidden'>
            <button onClick={toggleMenu} className='text-black focus:outline-none'>
              {
                isMenuOpen ? <FaXmark className='h-5 w-5 text-black' /> : <FaBarsStaggered className='h-5 w-5 text-black' />
              }
            </button>
          </div>
        </div>

        <ul className={`space-y-4 px-4 mt-16 py-7 bg-blue-700 ${isMenuOpen ? "block fixed top-0 right-0 left-0" : "hidden"}`}>
          {
            navItems.map(({ link, path, icon }) => (
              <li key={path} className='flex flex-col items-center'>
                <Link to={path} className='text-base text-white uppercase cursor-pointer flex flex-col items-center'>
                  {icon}
                  {link}
                </Link>
              </li>
            ))
          }
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
