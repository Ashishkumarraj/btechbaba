import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiMenu, FiX, FiUser, FiMoon, FiSun } from 'react-icons/fi';
export default function Navbar() {
    const { currentUser, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const profileRef = useRef();

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
                window.history.pushState(null, '', '/');
            } else {
                const element = document.getElementById(hash);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    window.history.pushState(null, '', `/#${hash}`);
                }
            }
            setIsOpen(false);
        } else {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    async function handleLogout() {
        try {
            await logout();
            navigate('/login');
        } catch {
            console.error('Failed to log out');
        }
    }

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

                        {currentUser ? (
                            <>
                                <div className="relative" ref={profileRef}>
                                    <button
                                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                                        className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 flex items-center justify-center hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors shadow-sm"
                                    >
                                        <FiUser size={20} />
                                    </button>

                                    {isProfileOpen && (
                                        <div className="absolute right-0 mt-3 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 py-2 flex flex-col z-50 overflow-hidden">
                                            <div className="px-4 py-3 border-b border-gray-50 dark:border-gray-700 mb-1 bg-gray-50/50 dark:bg-gray-800/50">
                                                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Signed in as</p>
                                                <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{currentUser.email}</p>
                                            </div>
                                            <Link to="/dashboard" className="px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-gray-700 transition-colors" onClick={() => setIsProfileOpen(false)}>Dashboard</Link>
                                            <Link to="/dashboard" className="px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-gray-700 transition-colors" onClick={() => setIsProfileOpen(false)}>Profile Details</Link>
                                            <button
                                                onClick={() => { handleLogout(); setIsProfileOpen(false); }}
                                                className="w-full text-left px-4 py-2.5 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors border-t border-gray-50 dark:border-gray-700 mt-1"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors">
                                    Log in
                                </Link>
                                <Link to="/signup" className="bg-purple-500 hover:bg-purple-600 text-white px-5 py-2.5 rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all transform hover:-translate-y-0.5">
                                    Sign up
                                </Link>
                            </>
                        )}
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

                    <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-col space-y-3">
                        {currentUser ? (
                            <>
                                <Link to="/dashboard" className="block text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium" onClick={() => setIsOpen(false)}>Dashboard</Link>
                                <button
                                    onClick={() => { handleLogout(); setIsOpen(false); }}
                                    className="w-full text-left text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="block text-gray-600 dark:text-gray-300 font-medium hover:text-purple-600 dark:hover:text-purple-400" onClick={() => setIsOpen(false)}>Log in</Link>
                                <Link to="/signup" className="block bg-purple-500 text-white text-center px-4 py-2 rounded-xl font-medium hover:bg-purple-600" onClick={() => setIsOpen(false)}>Sign up</Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
