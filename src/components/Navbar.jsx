import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiMoon, FiSun, FiLogOut, FiUser } from 'react-icons/fi';
import { createRipple } from '../utils/ripple';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);
    const location = useLocation();

    const [isDarkMode, setIsDarkMode] = useState(
        document.documentElement.classList.contains('dark') ||
        localStorage.getItem('theme') === 'dark'
    );

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setIsOpen(false);
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

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
                        <Link to="/" onClick={(e) => handleNavClick(e, 'home')} className="nav-link-animated text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors cursor-pointer">Home</Link>
                        <Link to="/feed/notes" className="nav-link-animated text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors cursor-pointer">Notes</Link>
                        <Link to="/feed/pyqs" className="nav-link-animated text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors cursor-pointer">PYQ</Link>
                        <Link to="/#videos" onClick={(e) => handleNavClick(e, 'videos')} className="nav-link-animated text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors cursor-pointer">YouTube Videos</Link>
                        <Link to="/#about" onClick={(e) => handleNavClick(e, 'about')} className="nav-link-animated text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors cursor-pointer">About</Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        <button
                            onClick={(e) => { createRipple(e); setIsDarkMode(!isDarkMode); }}
                            className="ripple-container btn-press p-2 rounded-full text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 focus:outline-none transition-colors"
                            aria-label="Toggle Dark Mode"
                        >
                            {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
                        </button>

                        {user ? (
                            <div className="flex items-center space-x-6">
                                <Link to="/feed" className="nav-link-animated text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors">
                                    Feed
                                </Link>
                                <div className="flex items-center space-x-4">
                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center cursor-pointer hover:text-purple-500">
                                        <FiUser className="mr-1" /> Profile
                                    </span>
                                    <button
                                        onClick={handleLogout}
                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-all transform hover:scale-105 flex items-center shadow-lg shadow-red-500/20"
                                    >
                                        <FiLogOut className="mr-1" /> Logout
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-full font-medium transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-purple-500/20"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>

                    <div className="flex items-center md:hidden space-x-2">
                        <button
                            onClick={(e) => { createRipple(e); setIsDarkMode(!isDarkMode); }}
                            className="ripple-container btn-press p-2 rounded-full text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 focus:outline-none transition-colors"
                        >
                            {isDarkMode ? <FiSun size={24} /> : <FiMoon size={24} />}
                        </button>
                        <button
                            onClick={(e) => { createRipple(e); setIsOpen(!isOpen); }}
                            className="ripple-container btn-press text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 p-2 rounded-full"
                        >
                            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="mobile-menu-enter md:hidden bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 px-4 py-4 space-y-4 shadow-lg absolute w-full left-0 z-40 transition-colors duration-300">
                    <Link to="/" className="nav-link-animated block text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium" onClick={(e) => handleNavClick(e, 'home')}>Home</Link>
                    <Link to="/feed/notes" className="nav-link-animated block text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium" onClick={() => setIsOpen(false)}>Notes</Link>
                    <Link to="/feed/pyqs" className="nav-link-animated block text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium" onClick={() => setIsOpen(false)}>PYQ</Link>
                    <Link to="/#videos" className="nav-link-animated block text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium" onClick={(e) => handleNavClick(e, 'videos')}>YouTube Videos</Link>
                    <Link to="/#about" className="nav-link-animated block text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium" onClick={(e) => handleNavClick(e, 'about')}>About</Link>
                    
                    <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-col space-y-3">
                        {user ? (
                            <>
                                <Link
                                    to="/feed"
                                    className="text-center text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium py-2"
                                    onClick={() => setIsOpen(false)}
                                >
                                    My Feed
                                </Link>
                                <div className="text-center py-2 text-gray-600 dark:text-gray-300 font-medium flex items-center justify-center">
                                    <FiUser className="mr-2" /> My Profile
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-medium shadow-lg"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="text-center text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium py-2"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="text-center bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-medium shadow-lg shadow-purple-500/20"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
