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
        <div id="home" className="relative overflow-hidden bg-white dark:bg-gray-800 pt-24 pb-32">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-purple-50 dark:bg-purple-900/20 opacity-50 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-purple-50 dark:bg-purple-900/20 opacity-50 blur-3xl"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">

                    <div className="text-center lg:text-left lg:col-span-6 mb-16 lg:mb-0">
                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 font-semibold text-sm mb-6 border border-purple-100 shadow-sm">
                            <span className="flex h-2 w-2 rounded-full bg-purple-500 mr-2 animate-pulse"></span>
                            The Smarter Way to Crack Your Semester.
                        </div>
                        <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-6 leading-tight">
                            Master Your Semester with <br />
                            <span className="text-purple-500 dark:text-purple-400">
                                Premium Notes &amp; Resources
                            </span>
                        </h1>
                        <p className="mt-4 text-xl text-gray-500 dark:text-gray-400 mb-8 max-w-2xl mx-auto lg:mx-0">
                            Access high-quality notes, PYQs and curated learning materials.
                        </p>

                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10">
                            <div className="flex items-center text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 px-5 py-2.5 rounded-xl shadow-sm border border-purple-100">
                                <FiCalendar className="mr-2.5 text-purple-500 dark:text-purple-400" size={18} />
                                <span className="font-medium text-sm">{formattedDate}</span>
                            </div>
                            <div className="flex items-center text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 px-5 py-2.5 rounded-xl shadow-sm border border-purple-100">
                                <FiClock className="mr-2.5 text-purple-500 dark:text-purple-400" size={18} />
                                <span className="font-medium text-sm tracking-wide min-w-[70px] text-center">{formattedTime}</span>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-6 relative">
                        <div className="relative mx-auto w-full rounded-2xl shadow-xl lg:max-w-md overflow-hidden aspect-[4/5]">
                            <img
                                className="w-full h-full object-cover transform scale-105 hover:scale-100 transition-transform duration-700"
                                src="images/heroimage3.jpg"
                                alt="Student learning"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        </div>
                    </div>

                </div>
            
            </div>
        </div>
    );
}
