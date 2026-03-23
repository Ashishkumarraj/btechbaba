import React from 'react';
import { Link } from 'react-router-dom';
import { FiInstagram, FiLinkedin, FiYoutube } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer id="about" className="bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-12">
                    <div className="col-span-1 md:col-span-1">
                        <Link to="/" className="flex items-center mb-4">
                            <span className="text-2xl font-bold text-purple-500 dark:text-purple-400">
                                BtechBaba
                            </span>
                        </Link>
                        <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm leading-relaxed">
                            The best platform to empower your skills. Learn from expert instructors and build your future today.
                        </p>
                        <div className="flex space-x-4 text-gray-400">
                            
                            <a href="https://www.instagram.com/ashishsahani____?igsh=djJkZXd4eGlyaGo3" target="_blank" rel="noopener noreferrer" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors"><FiInstagram size={20} /></a>
                            <a href="https://www.linkedin.com/in/ashish-kumar-ba5a6b328?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors"><FiLinkedin size={20} /></a>
                            <a href="https://youtube.com/@techpath54?si=KHdUQm-AlGIdWFma" target="_blank" rel="noopener noreferrer" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors"><FiYoutube size={20} /></a>
                            
                    
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Company</h3>
                        <ul className="space-y-3">
                            <li><Link to="/" className="text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-sm">About Us</Link></li>
                            <li><Link to="/" className="text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-sm">Careers</Link></li>
                            <li><Link to="/" className="text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-sm">Blog</Link></li>
                            <li><Link to="/" className="text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-sm">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Resources</h3>
                        <ul className="space-y-3">
                            <li><Link to="/" className="text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-sm">Courses</Link></li>
                            <li><Link to="/" className="text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-sm">Tutorials</Link></li>
                            <li><Link to="/" className="text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-sm">Webinars</Link></li>
                            <li><Link to="/" className="text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-sm">Community</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Legal</h3>
                        <ul className="space-y-3">
                            <li><Link to="/" className="text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-sm">Terms of Service</Link></li>
                            <li><Link to="/" className="text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-sm">Privacy Policy</Link></li>
                            <li><Link to="/" className="text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-sm">Cookie Policy</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-100 dark:border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-400 text-sm mb-4 md:mb-0">
                        &copy; {new Date().getFullYear()} BtechBaba. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
