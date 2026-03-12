import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp, FiDownload } from 'react-icons/fi';
import { curriculumData } from '../data/curriculum';
import { pdfUrls } from '../data/urls';

export default function PYQ() {
    const [openYear, setOpenYear] = useState(null);
    const [openSem, setOpenSem] = useState(null);
    const [openSubject, setOpenSubject] = useState(null);



    const handleDownload = (e, pyq, sub, semNumber) => {
        // Prevent navigation if the link is a placeholder
        if (e.currentTarget.getAttribute('href') === '#') {
            e.preventDefault();
        }
    };

    return (
        <section id="pyq" className="pt-24 pb-24 bg-white dark:bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* PYQ Section */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Previous Year Questions (PYQ)</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-lg">Access previous year question papers for all your semesters and subjects.</p>
                </div>

                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
                    {curriculumData.map((yearData, yIdx) => (
                        <div key={yIdx} className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300">
                            <button
                                onClick={() => { setOpenYear(openYear === yIdx ? null : yIdx); setOpenSem(null); setOpenSubject(null); }}
                                className={`w-full bg-white dark:bg-gray-800 hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-colors ${openYear === yIdx ? 'px-5 py-5 flex items-center justify-between border-b border-gray-100 dark:border-gray-700' : 'aspect-square flex flex-col items-center justify-center p-6'}`}
                            >
                                {openYear !== yIdx ? (
                                    <>
                                        <div className="w-20 h-20 rounded-2xl bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 flex items-center justify-center font-extrabold text-4xl mb-6 shadow-sm border border-purple-200">
                                            {yIdx + 1}
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{yearData.year}</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 font-medium tracking-wide uppercase">All Semesters</p>
                                        <div className="w-10 h-10 rounded-full bg-gray-50 dark:bg-gray-900 flex items-center justify-center text-gray-500 dark:text-gray-400 shadow-sm border border-gray-200 dark:border-gray-700">
                                            <FiChevronDown size={24} />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 flex items-center justify-center font-extrabold text-lg mr-3 shadow-sm flex-shrink-0 border border-purple-200">
                                                {yIdx + 1}
                                            </div>
                                            <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">{yearData.year}</h3>
                                        </div>
                                        <div className="w-8 h-8 flex-shrink-0 rounded-full bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center text-purple-600 dark:text-purple-400 border border-purple-200">
                                            <FiChevronUp size={20} />
                                        </div>
                                    </>
                                )}
                            </button>

                            <div className={`grid transition-all duration-300 ease-in-out ${openYear === yIdx ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                                <div className="overflow-hidden">
                                    <div className="px-4 pb-5 pt-1">
                                        <div className="space-y-3">
                                            {yearData.semesters?.map((semData, sIdx) => {
                                                const actualSemNumber = yIdx * 2 + sIdx + 1;
                                                const currentSemToken = `${yIdx}-${sIdx}`;
                                                return (
                                                    <div key={sIdx} className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                                                        <button
                                                            onClick={() => { setOpenSem(openSem === currentSemToken ? null : currentSemToken); setOpenSubject(null); }}
                                                            className="w-full px-5 py-4 flex items-center justify-between bg-gray-50 dark:bg-gray-900 hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-colors"
                                                        >
                                                            <span className="font-bold text-lg text-gray-800 dark:text-gray-100">{semData.semesterLabel}</span>
                                                            {openSem === currentSemToken ? <FiChevronUp className="text-gray-600 dark:text-gray-400" size={20} /> : <FiChevronDown className="text-gray-600 dark:text-gray-400" size={20} />}
                                                        </button>

                                                        <div className={`grid transition-all duration-300 ease-in-out ${openSem === currentSemToken ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                                                            <div className="overflow-hidden">
                                                                <div className="p-3 bg-white dark:bg-gray-800 grid grid-cols-1 gap-3">
                                                                    {semData.subjects?.map((subData, subIdx) => {
                                                                        const currentSubToken = `${yIdx}-${sIdx}-${subIdx}`;
                                                                        return (
                                                                            <div key={subIdx} className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden flex flex-col shadow-sm">
                                                                                <button
                                                                                    onClick={() => setOpenSubject(openSubject === currentSubToken ? null : currentSubToken)}
                                                                                    className={`w-full text-left px-4 py-3 transition-colors flex justify-between items-center ${openSubject === currentSubToken ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-700' : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-100'}`}
                                                                                >
                                                                                    <span className="font-semibold text-xs pr-2">{subData.name}</span>
                                                                                    {openSubject === currentSubToken ? <FiChevronUp size={16} className="flex-shrink-0" /> : <FiChevronDown size={16} className="text-gray-400 flex-shrink-0" />}
                                                                                </button>

                                                                                <div className={`grid transition-all duration-300 ease-in-out ${openSubject === currentSubToken ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                                                                                    <div className="overflow-hidden">
                                                                                        <div className="bg-gray-50 dark:bg-gray-900 p-2 space-y-2 border-t border-gray-200 dark:border-gray-700">
                                                                                            {subData.pyqs?.map((pyq, cIdx) => {
                                                                                                const link = (pyq.id && pyq.id.startsWith('http')) ? pyq.id : ((pdfUrls?.[yearData.year]?.[semData.semesterLabel]?.[subData.name]?.[pyq.name]) || '#');
                                                                                                return (
                                                                                                    <div key={cIdx} className="flex items-center justify-between bg-white dark:bg-gray-800 px-2.5 py-2 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 group hover:border-purple-200 dark:hover:border-purple-700 transition-colors">
                                                                                                        <span className="text-xs font-medium text-gray-600 dark:text-gray-400 line-clamp-1 flex-1 pr-2 group-hover:text-gray-900 dark:hover:text-white transition-colors" title={pyq.name}>{pyq.name}</span>
                                                                                                        <a
                                                                                                            href={link}
                                                                                                            {...(link.startsWith('http') ? { target: "_blank", rel: "noopener noreferrer" } : { download: true })}
                                                                                                            onClick={(e) => handleDownload(e, pyq.name, subData.name, actualSemNumber)}
                                                                                                            className={`flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full transition-all group-hover:shadow-md ${link !== '#' ? 'bg-purple-100 dark:bg-purple-900/40 hover:bg-purple-500 hover:text-white text-purple-600 dark:text-purple-400' : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed'}`}
                                                                                                            title={link !== '#' ? `Download ${pyq.name} PDF` : `Not Available`}
                                                                                                        >
                                                                                                            <FiDownload size={14} />
                                                                                                        </a>
                                                                                                    </div>
                                                                                                )
                                                                                            })}
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        );
                                                                    })}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
