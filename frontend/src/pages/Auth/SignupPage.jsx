import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '@/state/user/Action.js';
import toast from 'react-hot-toast';

const Input = ({ id, type, placeholder, value, onChange }) => (
    <input
        id={id}
        name={id}
        type={type}
        required
        className="w-full px-4 py-2 bg-[var(--color-input)] border border-[var(--color-border)] rounded-[var(--radius-md)] text-[var(--color-foreground)] placeholder-[var(--color-muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--color-ring)]"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
    />
);

const SignupPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, registerSuccess } = useSelector(store => store.auth);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(register(formData));
    };

    useEffect(() => {
        if (registerSuccess) {
            toast.success("Account created successfully!");
            const timer = setTimeout(() => {
                navigate("/login");
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [registerSuccess, navigate]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-[var(--color-background)] font-[var(--font-outfit)] px-4">
            <div className="w-full max-w-md p-8 space-y-6 bg-[var(--color-card)] rounded-[var(--radius-xl)] border border-[var(--color-border)] shadow-lg">
                <div className="text-center">
                    <div className="flex justify-center mx-auto mb-4 h-12 w-12 items-center rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                             viewBox="0 0 24 24" fill="none" stroke="currentColor"
                             strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                            <circle cx="9" cy="7" r="4"/>
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-[var(--color-card-foreground)]">Create an Account</h1>
                    <p className="text-[var(--color-muted-foreground)] mt-2">Start organizing your notes today.</p>
                    <p className="text-sm text-center text-[var(--color-muted-foreground)] bg-[var(--color-muted)]/10 rounded-md py-2 px-3 mt-4">
                        Use <span className="font-medium">demo@gmail.com</span> and <span className="font-medium">demo123</span> to demo the app.
                    </p>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name" className="sr-only">Full Name</label>
                        <Input id="name" type="text" placeholder="Full Name" value={formData.name} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="email" className="sr-only">Email address</label>
                        <Input id="email" type="email" placeholder="Email address" value={formData.email} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="password" className="sr-only">Password</label>
                        <Input id="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                    </div>

                    {error && <p className="text-sm text-[var(--color-destructive)] text-center">{error}</p>}

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center items-center px-4 py-2 font-semibold text-[var(--color-primary-foreground)] bg-[var(--color-primary)] rounded-[var(--radius-md)] hover:brightness-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--color-card)] focus:ring-[var(--color-ring)] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Creating Account...
                                </>
                            ) : (
                                'Sign Up'
                            )}
                        </button>
                    </div>
                </form>

                <p className="text-sm text-center text-[var(--color-muted-foreground)]">
                    Already have an account?{' '}
                    <Link to="/login" className="font-medium text-[var(--color-primary)] hover:underline">
                        Log In
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default SignupPage;