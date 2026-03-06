import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiMail, FiLock, FiAlertCircle } from 'react-icons/fi';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        if (!email || !password) {
            return setError('Please fill in all fields');
        }

        try {
            setError('');
            setLoading(true);
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            let errorMsg = err.message || 'Failed to log in. Please check your credentials.';
            if (errorMsg.includes('Firebase:')) {
                errorMsg = 'Failed to log in. Please check your credentials.';
            }
            setError(errorMsg);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-100 dark:bg-purple-900/40 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-100 dark:bg-purple-900/40 rounded-full blur-3xl opacity-50"></div>

            <div className="max-w-md w-full space-y-8 bg-white/70 dark:bg-gray-800/90 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white dark:border-gray-700 relative z-10 transition-all hover:shadow-purple-500/10 dark:hover:shadow-purple-500/20">
                <div className="text-center">
                    <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">Welcome back</h2>
                    <p className="text-gray-500 dark:text-gray-400">Sign in to continue your learning journey</p>
                </div>

                {error && (
                    <div className="bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 p-4 rounded-xl flex items-center text-sm">
                        <FiAlertCircle className="mr-2 h-5 w-5 flex-shrink-0" />
                        <span className="font-medium">{error}</span>
                    </div>
                )}

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="email-address">Email address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <FiMail />
                                </div>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50/50 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent transition-all sm:text-sm"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-1">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="password">Password</label>
                                <a href="#" className="font-medium text-sm text-purple-600 dark:text-purple-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Forgot password?</a>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <FiLock />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50/50 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent transition-all sm:text-sm"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-purple-500 hover:bg-purple-600 hover:shadow-lg hover:shadow-purple-500/40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 dark:focus:ring-purple-400 transition-all disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
                    >
                        {loading ? 'Signing in...' : 'Sign in'}
                    </button>
                </form>

                <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
                    Don't have an account?{' '}
                    <Link to="/signup" className="font-bold text-purple-600 dark:text-purple-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                        Sign up for free
                    </Link>
                </p>
            </div>
        </div>
    );
}
