import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiBookOpen, FiUpload, FiCheckCircle, FiLoader } from 'react-icons/fi';
import { auth, db, storage } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const Signup = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        collegeName: '',
        email: '',
        password: '',
        collegeId: null
    });
    const [fileName, setFileName] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, collegeId: file });
            setFileName(file.name);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // 1. Create user in Firebase Auth
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            const user = userCredential.user;

            let collegeIdUrl = '';

            // 2. Upload College ID if provided
            if (formData.collegeId) {
                const storageRef = ref(storage, `collegeIds/${user.uid}_${formData.collegeId.name}`);
                await uploadBytes(storageRef, formData.collegeId);
                collegeIdUrl = await getDownloadURL(storageRef);
            }

            // 3. Save user details to Firestore
            await setDoc(doc(db, "users", user.uid), {
                name: formData.name,
                collegeName: formData.collegeName,
                email: formData.email,
                collegeIdUrl: collegeIdUrl,
                createdAt: new Date().toISOString()
            });

            console.log('Signup successful');
            navigate('/');
        } catch (err) {
            console.error('Signup error:', err);
            setError(err.message || 'Failed to create an account');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 py-12 transition-colors duration-300">
            <div className="max-w-xl w-full bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 transform transition-all hover:shadow-2xl">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                        Join BtechBaba
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Create your student account to get started
                    </p>
                </div>

                {error && (
                    <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="col-span-1">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Full Name
                            </label>
                            <div className="mt-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <FiUser size={18} />
                                </div>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-700 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="col-span-1">
                            <label htmlFor="collegeName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                College Name
                            </label>
                            <div className="mt-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <FiBookOpen size={18} />
                                </div>
                                <input
                                    id="collegeName"
                                    name="collegeName"
                                    type="text"
                                    required
                                    className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-700 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all"
                                    placeholder="IIT/NIT/IIIT..."
                                    value={formData.collegeName}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                College Email / Email
                            </label>
                            <div className="mt-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <FiMail size={18} />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-700 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all"
                                    placeholder="yourname@college.edu"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Password
                            </label>
                            <div className="mt-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <FiLock size={18} />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-700 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Upload College ID (Optional)
                            </label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-700 border-dashed rounded-xl hover:border-purple-500 dark:hover:border-purple-400 transition-colors cursor-pointer relative group">
                                <input
                                    type="file"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    onChange={handleFileChange}
                                    accept="image/*,.pdf"
                                />
                                <div className="space-y-1 text-center">
                                    {fileName ? (
                                        <div className="flex flex-col items-center">
                                            <FiCheckCircle className="mx-auto h-12 w-12 text-green-500" />
                                            <p className="mt-2 text-sm text-gray-900 dark:text-white font-medium">{fileName}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">Click to change file</p>
                                        </div>
                                    ) : (
                                        <>
                                            <FiUpload className="mx-auto h-12 w-12 text-gray-400 group-hover:text-purple-500 transition-colors" />
                                            <div className="flex text-sm text-gray-600 dark:text-gray-400">
                                                <span className="relative cursor-pointer rounded-md font-medium text-purple-600 hover:text-purple-500 focus-within:outline-none">
                                                    Upload a file
                                                </span>
                                                <p className="pl-1">or drag and drop</p>
                                            </div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                PNG, JPG, PDF up to 5MB
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <input
                            id="terms"
                            name="terms"
                            type="checkbox"
                            required
                            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                        />
                        <label htmlFor="terms" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                            I agree to the <a href="#" className="text-purple-600 hover:text-purple-500">Terms</a> and <a href="#" className="text-purple-600 hover:text-purple-500">Privacy Policy</a>
                        </label>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <FiLoader className="animate-spin h-5 w-5" />
                            ) : (
                                'Create Account'
                            )}
                        </button>
                    </div>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-purple-600 hover:text-purple-500 transition-colors">
                            Sign in here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
