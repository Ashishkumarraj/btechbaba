import React, { useState, useEffect } from 'react';
import { 
    FiFileText, FiDownload, FiUsers, FiMessageSquare, 
    FiHash, FiHeart, FiSearch, FiPlus, FiSend, 
    FiLoader, FiTrendingUp, FiBookmark, FiChevronDown, FiChevronUp, FiX, FiShield, FiLock, FiGlobe, FiHome
} from 'react-icons/fi';
import { auth, db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate, NavLink, Outlet, useLocation } from 'react-router-dom';
import { collection, query, onSnapshot, orderBy, addDoc, serverTimestamp, where, getDocs } from 'firebase/firestore';
import { curriculumData } from '../data/curriculum';
import { pdfUrls } from '../data/urls';
import { createRipple } from '../utils/ripple';

const Feed = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (!currentUser) {
                navigate('/login');
            } else {
                setUser(currentUser);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, [navigate]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    if (!user) return null;

    const SidebarItem = ({ to, icon: Icon, label }) => (
        <NavLink
            to={to}
            className={({ isActive }) => `w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive 
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' 
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-purple-600'
            }`}
        >
            <Icon size={20} />
            <span className="font-medium">{label}</span>
        </NavLink>
    );

    const BottomNavItem = ({ to, icon: Icon, label }) => (
        <NavLink
            to={to}
            className={({ isActive }) => `flex flex-col items-center justify-center flex-1 py-1 transition-all duration-200 ${
                isActive 
                ? 'text-purple-600 dark:text-purple-400' 
                : 'text-gray-400 dark:text-gray-500'
            }`}
        >
            <Icon size={22} className={({ isActive }) => isActive ? 'scale-110' : ''} />
            <span className="text-[10px] mt-1 font-medium">{label}</span>
        </NavLink>
    );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300 pb-20 lg:pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8 flex flex-col lg:flex-row gap-8">
                {/* Desktop Sidebar */}
                <aside className="hidden lg:block w-72 space-y-4 lg:sticky lg:top-24 lg:self-start">
                    <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest px-4 mb-4">Navigation</p>
                        <div className="space-y-1">
                            <SidebarItem to="/feed/notes" icon={FiFileText} label="Study Notes" />
                            <SidebarItem to="/feed/pyqs" icon={FiDownload} label="PYQ Archive" />
                            <SidebarItem to="/feed/communities" icon={FiUsers} label="Communities" />
                            <SidebarItem to="/feed/messages" icon={FiMessageSquare} label="Messages" />
                            <SidebarItem to="/feed/random-chats" icon={FiHash} label="Random Chats" />
                            <SidebarItem to="/feed/confessions" icon={FiHeart} label="Confessions" />
                        </div>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 min-w-0">
                    <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden min-h-[60vh] lg:min-h-[80vh]">
                        <Outlet />
                    </div>
                </main>

                {/* Right Sidebar - Desktop Only */}
                <aside className="hidden xl:block w-80 space-y-6 sticky top-24 self-start">
                    <div className="bg-gradient-to-br from-purple-600 to-indigo-700 p-6 rounded-3xl text-white shadow-xl">
                        <h4 className="font-bold text-lg mb-2">BtechBaba Pro</h4>
                        <p className="text-sm opacity-90 mb-4">Get unlimited access to all premium resources.</p>
                        <button className="w-full py-2 bg-white text-purple-600 rounded-xl font-bold text-sm hover:bg-opacity-90 transition-all active:scale-95">
                            Upgrade Now
                        </button>
                    </div>
                </aside>
            </div>

            {/* Mobile Bottom Navigation - Standard App UX */}
            <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-t border-gray-100 dark:border-gray-800 px-2 py-2 flex items-center justify-around z-50">
                <BottomNavItem to="/feed/notes" icon={FiFileText} label="Notes" />
                <BottomNavItem to="/feed/pyqs" icon={FiDownload} label="PYQs" />
                <BottomNavItem to="/feed/communities" icon={FiUsers} label="Social" />
                <BottomNavItem to="/feed/messages" icon={FiMessageSquare} label="Chats" />
                <BottomNavItem to="/feed/confessions" icon={FiHeart} label="Secrets" />
            </div>
        </div>
    );
};

// --- Responsive Sections ---

export const NotesSection = ({ type }) => {
    const [openYear, setOpenYear] = useState(null);
    const [openSem, setOpenSem] = useState(null);
    const [openSubject, setOpenSubject] = useState(null);

    const isNotes = type.toLowerCase() === 'notes';

    return (
        <div className="p-4 sm:p-8">
            <div className="mb-8">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{isNotes ? 'Study Notes' : 'PYQ Archive'}</h2>
                <p className="text-gray-500 text-xs sm:text-sm">High-quality {isNotes ? 'notes' : 'question papers'} for your branch.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {curriculumData.map((yearData, yIdx) => (
                    <div key={yIdx} className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden transition-all">
                        <button
                            onClick={(e) => { createRipple(e); setOpenYear(openYear === yIdx ? null : yIdx); setOpenSem(null); setOpenSubject(null); }}
                            className="w-full p-4 sm:p-6 flex flex-col items-center justify-center group hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-colors"
                        >
                            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 flex items-center justify-center font-extrabold text-xl sm:text-2xl mb-3 border border-purple-200 dark:border-purple-800 group-hover:scale-110 transition-transform">
                                {yIdx + 1}
                            </div>
                            <h3 className="font-bold text-gray-900 dark:text-white uppercase tracking-wide text-[10px] sm:text-xs">{yearData.year}</h3>
                            <FiChevronDown className={`mt-2 text-gray-400 transition-transform ${openYear === yIdx ? 'rotate-180' : ''}`} />
                        </button>

                        <div className={`transition-all duration-300 overflow-hidden ${openYear === yIdx ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                            <div className="p-2 sm:p-4 space-y-2 border-t border-gray-100 dark:border-gray-700">
                                {yearData.semesters?.map((semData, sIdx) => {
                                    const semToken = `${yIdx}-${sIdx}`;
                                    return (
                                        <div key={sIdx} className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
                                            <button
                                                onClick={() => { setOpenSem(openSem === semToken ? null : semToken); setOpenSubject(null); }}
                                                className="w-full px-4 py-3 flex justify-between items-center font-bold text-gray-800 dark:text-gray-100 text-xs sm:text-sm"
                                            >
                                                {semData.semesterLabel}
                                                <FiChevronDown className={`transition-transform ${openSem === semToken ? 'rotate-180' : ''}`} />
                                            </button>

                                            <div className={`transition-all duration-300 overflow-hidden ${openSem === semToken ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                                <div className="p-2 space-y-1">
                                                    {semData.subjects?.map((subData, subIdx) => {
                                                        const subToken = `${yIdx}-${sIdx}-${subIdx}`;
                                                        return (
                                                            <div key={subIdx} className="rounded-lg overflow-hidden border border-gray-100 dark:border-gray-700">
                                                                <button
                                                                    onClick={() => setOpenSubject(openSubject === subToken ? null : subToken)}
                                                                    className={`w-full text-left px-3 py-2.5 text-[11px] font-bold flex justify-between items-center transition-colors ${openSubject === subToken ? 'bg-purple-600 text-white' : 'hover:bg-purple-50 dark:hover:bg-purple-900/20 text-gray-700 dark:text-gray-300'}`}
                                                                >
                                                                    <span className="truncate pr-2">{subData.name}</span>
                                                                    <FiChevronDown className={`flex-shrink-0 transition-transform ${openSubject === subToken ? 'rotate-180' : ''}`} />
                                                                </button>

                                                                <div className={`transition-all duration-300 overflow-hidden ${openSubject === subToken ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                                                    <div className="p-2 bg-gray-50 dark:bg-gray-900 space-y-1 border-t border-gray-100 dark:border-gray-700">
                                                                        {(isNotes ? subData.chapters : subData.pyqs)?.map((file, fIdx) => {
                                                                            const link = (file.id && file.id.startsWith('http')) 
                                                                                ? file.id 
                                                                                : ((pdfUrls?.[yearData.year]?.[semData.semesterLabel]?.[subData.name]?.[file.name]) || '#');
                                                                            
                                                                            return (
                                                                                <div key={fIdx} className="bg-white dark:bg-gray-800 p-2.5 rounded-xl flex items-center justify-between border border-gray-100 dark:border-gray-700 group hover:shadow-md transition-shadow">
                                                                                    <span className="text-[10px] font-semibold text-gray-600 dark:text-gray-400 truncate pr-2 group-hover:text-purple-600 transition-colors" title={file.name}>{file.name}</span>
                                                                                    {link !== '#' ? (
                                                                                        <a 
                                                                                            href={link} 
                                                                                            target="_blank" 
                                                                                            rel="noopener noreferrer"
                                                                                            className="p-1 px-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-600 hover:text-white transition-all flex items-center space-x-1"
                                                                                        >
                                                                                            <FiDownload size={11} />
                                                                                            <span className="text-[9px] font-bold">GET</span>
                                                                                        </a>
                                                                                    ) : (
                                                                                        <span className="text-[9px] text-gray-400 italic">No PDF</span>
                                                                                    )}
                                                                                </div>
                                                                            );
                                                                        })}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export const CommunitiesSection = () => {
    const [communities, setCommunities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [createLoading, setCreateLoading] = useState(false);
    const [error, setError] = useState('');
    
    // New Community Form State
    const [newComm, setNewComm] = useState({
        name: '',
        type: 'public' // public or personal
    });

    useEffect(() => {
        const q = query(collection(db, 'communities'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setCommunities(data);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!newComm.name.trim()) return;
        setCreateLoading(true);
        setError('');

        const user = auth.currentUser;
        if (!user) return;

        try {
            if (newComm.type === 'public') {
                const publicQuery = query(
                    collection(db, 'communities'), 
                    where('createdBy', '==', user.uid),
                    where('type', '==', 'public')
                );
                const publicSnap = await getDocs(publicQuery);
                if (publicSnap.size >= 5) {
                    throw new Error('You have reached the limit of 5 public communities.');
                }
            }

            const maxMembers = newComm.type === 'public' ? 10000000 : 1000;

            await addDoc(collection(db, 'communities'), {
                name: newComm.name.trim(),
                type: newComm.type,
                createdBy: user.uid,
                memberCount: 1,
                maxMembers: maxMembers,
                createdAt: serverTimestamp()
            });

            setNewComm({ name: '', type: 'public' });
            setIsModalOpen(false);
        } catch (err) {
            console.error('Community creation error:', err);
            setError(err.message || 'Failed to create community');
        } finally {
            setCreateLoading(false);
        }
    };

    return (
        <div className="p-4 sm:p-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Communities</h2>
                    <p className="text-gray-500 text-xs sm:text-sm">Join student circles globally.</p>
                </div>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl font-bold transition-all shadow-lg shadow-purple-500/20 text-xs sm:text-sm active:scale-95"
                >
                    <FiPlus /> <span>New</span>
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center py-20"><FiLoader className="animate-spin text-purple-500" size={32} /></div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {communities.map((comm) => (
                        <div key={comm.id} className="flex items-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-purple-500 transition-all cursor-pointer group active:scale-98">
                            <div className="w-12 h-12 bg-gradient-to-tr from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl mr-4 shadow-inner group-hover:scale-105 transition-transform">
                                {comm.name[0]}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center space-x-2">
                                    <h4 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base truncate">{comm.name}</h4>
                                    {comm.type === 'personal' ? <FiLock className="text-gray-400" size={12} /> : <FiGlobe className="text-purple-400" size={12} />}
                                </div>
                                <p className="text-[10px] sm:text-xs text-gray-500">{comm.memberCount?.toLocaleString() || 0} members</p>
                            </div>
                            <button className="px-3 py-1.5 bg-white dark:bg-gray-700 text-purple-600 dark:text-purple-400 text-[10px] sm:text-xs font-bold rounded-lg border border-purple-200 dark:border-purple-900/50 shadow-sm hover:bg-purple-600 hover:text-white transition-all">
                                JOIN
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal - Responsive for Touch */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl animate-in slide-in-from-bottom duration-300">
                        <div className="w-12 h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full mx-auto mb-6 sm:hidden"></div>
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Create Community</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 p-2">
                                <FiX size={24} />
                            </button>
                        </div>

                        {error && (
                            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-xl text-[10px] font-bold border border-red-100">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleCreate} className="space-y-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Community Name</label>
                                <input 
                                    type="text" 
                                    className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white font-medium"
                                    placeholder="e.g. CSE Study Group"
                                    value={newComm.name}
                                    onChange={(e) => setNewComm({...newComm, name: e.target.value})}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Privacy Type</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button 
                                        type="button"
                                        onClick={() => setNewComm({...newComm, type: 'public'})}
                                        className={`flex flex-col items-center p-4 rounded-3xl border-2 transition-all ${newComm.type === 'public' ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/10 shadow-md' : 'border-gray-50 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50'}`}
                                    >
                                        <FiGlobe className={newComm.type === 'public' ? 'text-purple-600' : 'text-gray-400'} size={24} />
                                        <span className="mt-2 text-xs font-bold text-gray-900 dark:text-white">Public</span>
                                        <span className="text-[10px] text-gray-400 mt-1">Lakhs of members</span>
                                    </button>

                                    <button 
                                        type="button"
                                        onClick={() => setNewComm({...newComm, type: 'personal'})}
                                        className={`flex flex-col items-center p-4 rounded-3xl border-2 transition-all ${newComm.type === 'personal' ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/10 shadow-md' : 'border-gray-50 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50'}`}
                                    >
                                        <FiLock className={newComm.type === 'personal' ? 'text-purple-600' : 'text-gray-400'} size={24} />
                                        <span className="mt-2 text-xs font-bold text-gray-900 dark:text-white">Personal</span>
                                        <span className="text-[10px] text-gray-400 mt-1">Upto 1000 members</span>
                                    </button>
                                </div>
                            </div>

                            <button 
                                type="submit" 
                                disabled={createLoading}
                                className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl font-bold transition-all shadow-xl shadow-purple-500/30 flex items-center justify-center disabled:opacity-50 active:scale-95"
                            >
                                {createLoading ? <FiLoader className="animate-spin" /> : 'Start Community'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export const MessageSection = () => (
    <div className="flex h-[75vh] flex-col sm:row sm:flex-row">
        <div className="w-full sm:w-80 border-b sm:border-b-0 sm:border-r border-gray-100 dark:border-gray-800 p-4 space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white px-2">Messages</h2>
            <div className="text-center py-10 sm:py-20 text-gray-500 text-xs px-4">
                <FiMessageSquare size={32} className="mx-auto mb-2 opacity-50" />
                Real-time college messaging coming soon.
            </div>
        </div>
        <div className="hidden sm:flex flex-1 flex-col items-center justify-center text-gray-500">
            <FiMessageSquare size={48} className="mb-4 opacity-10" />
            <p className="font-medium">Pick a student to start a chat</p>
        </div>
    </div>
);

export const RandomChatSection = () => (
    <div className="p-8 flex flex-col items-center justify-center h-full text-center">
        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-3xl flex items-center justify-center mb-6 animate-pulse">
            <FiHash size={36} />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">Connect with Random Students</h2>
        <p className="text-gray-500 text-sm max-w-xs sm:max-w-md mb-8">Chat anonymously with anyone across all engineering colleges.</p>
        <button className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-purple-500/30 hover:scale-105 active:scale-95 transition-all">
            Find Someone Now
        </button>
    </div>
);

export const ConfessionSection = () => {
    const [confessions, setConfessions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(collection(db, 'confessions'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setConfessions(data);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    return (
        <div className="p-4 sm:p-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Confessions</h2>
                    <p className="text-gray-500 text-xs sm:text-sm font-medium">Post anonymously, stay hidden.</p>
                </div>
                <button className="bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 px-4 py-2 rounded-xl font-bold flex items-center text-[10px] sm:text-xs shadow-sm active:scale-95">
                    <FiPlus size={18} className="mr-1" /> Post
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center py-20"><FiLoader className="animate-spin text-pink-500" size={32} /></div>
            ) : (
                <div className="space-y-4">
                    {confessions.map((conf) => (
                        <div key={conf.id} className="p-5 sm:p-6 bg-pink-50/30 dark:bg-pink-900/5 border border-pink-100/50 dark:border-pink-900/20 rounded-3xl transition-transform active:scale-99">
                            <div className="flex items-center space-x-2 text-pink-600 mb-3 font-bold text-[10px] uppercase tracking-widest">
                                <FiHeart /> <span>#AnonymousConfession</span>
                            </div>
                            <p className="text-gray-800 dark:text-gray-200 leading-relaxed font-semibold text-sm sm:text-base">
                                {conf.text}
                            </p>
                            <div className="mt-4 flex items-center justify-between text-[9px] sm:text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                                <div className="flex items-center space-x-3">
                                    <span>{conf.createdAt?.toDate ? conf.createdAt.toDate().toLocaleDateString() : 'Just now'}</span>
                                    <span>•</span>
                                    <span>{conf.likes || 0} Likes</span>
                                </div>
                                <button className="text-pink-500 hover:text-pink-600">Like</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Feed;
