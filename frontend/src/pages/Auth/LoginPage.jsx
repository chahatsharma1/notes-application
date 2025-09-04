import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '@/state/user/Action.js';

export const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, jwt } = useSelector(store => store.auth);

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(login({ email, password }));
    };

    useEffect(() => {
        if (jwt) {
            navigate('/notes');
        }
    }, [jwt, navigate]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)] font-[var(--font-outfit)]">
            <div className="w-full max-w-md p-8 space-y-8 bg-[var(--color-card)] rounded-[var(--radius-lg)] shadow-lg border border-[var(--color-border)]">
                <div className="text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-[var(--color-primary)]">
                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                    <h1 className="text-3xl font-bold text-[var(--color-card-foreground)] mt-2">Welcome Back!</h1>
                    <p className="text-[var(--color-muted-foreground)]">Sign in to access your notes.</p>
                    <p className="text-sm text-center text-[var(--color-muted-foreground)] bg-[var(--color-muted)]/10 rounded-md py-2 px-3 mt-4">
                        Use <span className="font-medium">demo@gmail.com</span> and <span className="font-medium">demo123</span> to demo the app.
                    </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="relative">
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email Address"
                            required
                            className="w-full px-4 py-3 bg-[var(--color-input)] border border-[var(--color-border)] rounded-[var(--radius-md)] text-[var(--color-foreground)] placeholder-[var(--color-muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--color-ring)] transition duration-200"
                        />
                    </div>

                    <div className="relative">
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                            className="w-full px-4 py-3 bg-[var(--color-input)] border border-[var(--color-border)] rounded-[var(--radius-md)] text-[var(--color-foreground)] placeholder-[var(--color-muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--color-ring)] transition duration-200"
                        />
                    </div>

                    {error && (
                        <div className="text-center p-3 bg-[var(--color-destructive)]/10 border border-[var(--color-destructive)]/50 text-[var(--color-destructive)] rounded-[var(--radius-lg)]">
                            {error}
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center items-center px-4 py-3 font-semibold text-[var(--color-primary-foreground)] bg-[var(--color-primary)] rounded-[var(--radius-md)] hover:brightness-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--color-background)] focus:ring-[var(--color-ring)]">
                            {loading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Signing In...
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </div>
                </form>

                <div className="text-center text-[var(--color-muted-foreground)] text-sm">
                    Don't have an account?{' '}
                    <Link to="/signup" className="font-medium text-[var(--color-primary)] hover:brightness-90">
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
