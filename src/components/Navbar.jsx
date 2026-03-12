import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiMoon, FiSun } from 'react-icons/fi';
export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const [isDarkMode, setIsDarkMode] = useState(
        document.documentElement.classList.contains('dark') ||
        localStorage.getItem('theme') === 'dark'
    );

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    const handleNavClick = (e, hash) => {
        if (location.pathname === '/') {
            e.preventDefault();
            if (hash === 'home') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                window.history.pushState(null, '', import.meta.env.BASE_URL);
            } else {
                const element = document.getElementById(hash);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    window.history.pushState(null, '', `${import.meta.env.BASE_URL}#${hash}`);
                }
            }
            setIsOpen(false);
        } else {
            setIsOpen(false);
        }
    };


    return (
        <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center">
                            <span className="text-2xl font-bold text-purple-500">
                                BtechBaba
                            </span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" onClick={(e) => handleNavClick(e, 'home')} className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors cursor-pointer">Home</Link>
                        <Link to="/#notes" onClick={(e) => handleNavClick(e, 'notes')} className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors cursor-pointer">Notes</Link>
                        <Link to="/#pyq" onClick={(e) => handleNavClick(e, 'pyq')} className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors cursor-pointer">PYQ</Link>
                        <Link to="/#videos" onClick={(e) => handleNavClick(e, 'videos')} className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors cursor-pointer">YouTube Videos</Link>
                        <Link to="/#about" onClick={(e) => handleNavClick(e, 'about')} className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors cursor-pointer">About</Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        <button
                            onClick={() => setIsDarkMode(!isDarkMode)}
                            className="p-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 focus:outline-none transition-colors"
                            aria-label="Toggle Dark Mode"
                        >
                            {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
                        </button>


                    </div>

                    <div className="flex items-center md:hidden space-x-2">
                        <button
                            onClick={() => setIsDarkMode(!isDarkMode)}
                            className="p-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 focus:outline-none transition-colors"
                        >
                            {isDarkMode ? <FiSun size={24} /> : <FiMoon size={24} />}
                        </button>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 p-2"
                        >
                            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 px-4 py-4 space-y-4 shadow-lg absolute w-full left-0 z-40 transition-colors duration-300">
                    <Link to="/" className="block text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium" onClick={(e) => handleNavClick(e, 'home')}>Home</Link>
                    <Link to="/#notes" className="block text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium" onClick={(e) => handleNavClick(e, 'notes')}>Notes</Link>
                    <Link to="/#pyq" className="block text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium" onClick={(e) => handleNavClick(e, 'pyq')}>PYQ</Link>
                    <Link to="/#videos" className="block text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium" onClick={(e) => handleNavClick(e, 'videos')}>YouTube Videos</Link>
                    <Link to="/#about" className="block text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium" onClick={(e) => handleNavClick(e, 'about')}>About</Link>


                </div>
            )}
        </nav>
    );
}
