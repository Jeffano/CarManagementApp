import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

// react icons
import { FaCar } from "react-icons/fa";

const Navbar = () => {

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
  const navItems = [
    { link: 'Home', path: '/' },
    { link: 'Collection', path: '/collection' },
    { link: 'List', path: '/list' },
    { link: 'Account', path: '/account' },
  ]
  return (
    <header className='w-full bg-transparant fixed top-0 left-0 right-0 transtion-all ease-in duration-300'>
      <nav className={`py-4 lg:px-24 px-4 ${isSticky ? "sticky top-0 left-0 right-0 bg-blue-300" : ""}`}>
        <div className='flex justify-between items-center text-base gap-8'>
          {/* logo */}
          <Link to='/' className='text-2xl font-bold text-blue-700 flex items-center gap-2'><FaCar className='inline-block' />Model Car Management</Link>

          {/* nav items for large devices */}
          <ul className='md:flex space-x-12 hidden'>
            {
              navItems.map(({ link, path }) => (
                <li key={path}>
                  <Link to={path} className='block text-base text-black uppercase cursor-pointer hover:text-700'>{link}</Link>
                </li>
              ))
            }
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
