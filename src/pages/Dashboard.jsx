/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { FiBookOpen, FiFileText, FiUser, FiLogOut, FiDownload } from 'react-icons/fi';
import { useNavigate, Link } from 'react-router-dom';

export default function Dashboard() {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const [downloads, setDownloads] = useState([]);

    useEffect(() => {
        if (currentUser && currentUser.email) {
            const userDownloadsKey = `downloads_${currentUser.email}`;
            const existingDownloads = JSON.parse(localStorage.getItem(userDownloadsKey) || '[]');

            setDownloads(existingDownloads);
        }
    }, [currentUser]);

    async function handleLogout() {
        try {
            await logout();
            navigate('/login');
        } catch {
            console.error('Failed to log out');
        }
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">Welcome Builder,</h1>
                    <p className="text-gray-500 dark:text-gray-400 text-lg">Logged in as {currentUser.email}. What would you like to do today?</p>
                </div>
                <button
                    onClick={handleLogout}
                    className="mt-4 md:mt-0 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 px-6 py-3 rounded-xl font-bold flex items-center transition-colors shadow-sm"
                >
                    <FiLogOut className="mr-2" size={20} /> Logout
                </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 items-start">
                <div className="flex-1 w-full order-2 lg:order-1">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                        <FiDownload className="mr-3 text-purple-500 dark:text-purple-400" /> Your Downloaded Materials
                    </h2>
                    {downloads.length > 0 ? (
                        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl shadow-sm overflow-hidden">
                            <ul className="divide-y divide-gray-100">
                                {downloads.map((item, idx) => (
                                    <li key={idx} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex flex-col sm:flex-row justify-between items-start sm:items-center">
                                        <div className="flex items-start space-x-4 mb-4 sm:mb-0">
                                            <div className={`p-3 rounded-xl flex-shrink-0 ${item.type === 'PYQ' ? 'bg-orange-50 text-orange-500' : 'bg-purple-50 dark:bg-purple-900/20 text-purple-500 dark:text-purple-400'}`}>
                                                {item.type === 'PYQ' ? <FiFileText size={20} /> : <FiBookOpen size={20} />}
                                            </div>
                                            <div>
                                                <p className="text-lg font-bold text-gray-900 dark:text-white mb-1">{item.title}</p>
                                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{item.subject} • Downloaded on {item.date}</p>
                                            </div>
                                        </div>
                                        <a
                                            href={item.link}
                                            download
                                            className="inline-flex items-center px-4 py-2 bg-purple-100 dark:bg-purple-900/40 text-purple-700 hover:bg-purple-500 hover:text-white rounded-lg font-semibold text-sm transition-colors"
                                        >
                                            <FiDownload className="mr-2" size={16} /> Re-download {item.type}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 border-dashed rounded-3xl p-12 text-center">
                            <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400 shadow-sm border border-gray-100 dark:border-gray-700">
                                <FiBookOpen size={24} />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">No downloads yet</h3>
                            <p className="text-gray-500 dark:text-gray-400">When you download Notes or PYQs, they will seamlessly appear here for easy access!</p>
                            <Link to="/" className="mt-6 inline-block bg-purple-500 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-purple-600 transition-colors">
                                Browse Materials
                            </Link>
                        </div>
                    )}
                </div>

                <div className="w-full lg:w-80 flex-shrink-0 order-1 lg:order-2">
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-lg border border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center space-y-4 transition-all w-full sticky top-24">
                        <div className="w-20 h-20 bg-purple-50 dark:bg-purple-900/20 text-purple-500 dark:text-purple-400 rounded-full flex items-center justify-center border-4 border-white shadow-sm">
                            <FiUser size={40} />
                        </div>
                        <div className="text-center w-full">
                            <p className="text-xl font-bold text-gray-900 dark:text-white">Profile Details</p>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-2 truncate max-w-full" title={currentUser.email}>{currentUser.email}</p>
                        </div>

                        <div className="w-full border-t border-gray-100 dark:border-gray-700 pt-5 mt-5 space-y-3">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500 dark:text-gray-400 font-medium">Status</span>
                                <span className="text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded">Active</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500 dark:text-gray-400 font-medium">Total Downloads</span>
                                <span className="text-gray-900 dark:text-white font-bold">{downloads.length} items</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div >
    );
}
