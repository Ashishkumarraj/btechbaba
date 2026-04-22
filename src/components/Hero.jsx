import React, { useState, useEffect } from 'react';
import { FiPlay, FiStar, FiUsers, FiClock, FiCalendar } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function Hero() {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formattedDate = currentTime.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const formattedTime = currentTime.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    return (
        <div id="home" className="relative overflow-hidden bg-white dark:bg-gray-800 pt-16 lg:pt-24 pb-20 lg:pb-32">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-purple-50 dark:bg-purple-900/10 opacity-50 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-purple-50 dark:bg-purple-900/10 opacity-50 blur-3xl"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">

                    <div className="text-center lg:text-left lg:col-span-6 mb-12 lg:mb-0">
                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 font-bold text-[10px] sm:text-xs mb-6 border border-purple-100 dark:border-purple-900/30 shadow-sm">
                            <span className="flex h-2 w-2 rounded-full bg-purple-500 mr-2 animate-pulse"></span>
                            Crack Your Semester with Ease
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white tracking-tight mb-6 leading-[1.1]">
                            Master Your <br className="hidden sm:block" /> Semester with <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-500">
                                Premium Resources
                            </span>
                        </h1>
                        <p className="mt-4 text-base sm:text-lg text-gray-500 dark:text-gray-400 mb-8 max-w-2xl mx-auto lg:mx-0 font-medium">
                            The all-in-one platform for B.Tech students to access high-quality notes, PYQs and community support.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 mb-10">
                            <Link to="/signup" className="w-full sm:w-auto px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl font-bold text-sm shadow-xl shadow-purple-500/20 transition-all active:scale-95">
                                Join BtechBaba
                            </Link>
                            <div className="flex items-center text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 px-5 py-3.5 rounded-2xl border border-gray-100 dark:border-gray-700">
                                <FiClock className="mr-2 text-purple-500" size={16} />
                                <span className="font-bold text-xs tracking-wider">{formattedTime}</span>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-6 relative px-4 sm:px-0">
                        <div className="relative mx-auto w-full rounded-[2.5rem] shadow-2xl lg:max-w-md overflow-hidden aspect-[4/5] border-8 border-white dark:border-gray-900">
                            <img
                                className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-1000"
                                src="images/heroimage3.jpg"
                                alt="Student learning"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                            <div className="absolute bottom-8 left-8 right-8">
                                <div className="flex items-center space-x-2 text-white mb-2">
                                    <FiStar className="text-yellow-400 fill-yellow-400" />
                                    <span className="text-sm font-bold tracking-widest text-white">4.9/5 RATING</span>
                                </div>
                                <p className="text-white text-lg font-bold leading-tight">Join 10,000+ students across various branches.</p>
                            </div>
                        </div>
                    </div>

                </div>
            
            </div>
        </div>
    );
}
