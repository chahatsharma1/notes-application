import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { FileText, Menu, X, Sun, Moon } from "lucide-react";
import {useDispatch} from "react-redux";
import {logout} from "@/state/user/Action.js";

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const jwt = localStorage.getItem('jwt');

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
    };

    const handleLogout = () => {
        dispatch(logout());
        closeMenu();
        navigate('/');
    };

    const closeMenu = () => setIsMenuOpen(false);

    const guestLinks = (
        <>
            {location.pathname !== '/login' && (

                <Button variant="ghost" asChild>
                <Link to="/login">Login</Link>
                </Button>
            )}

            {location.pathname !== '/signup' && (
                <Button asChild>
                    <Link to="/signup">Sign Up</Link>
                </Button>
            )}
        </>
    );

    const authLinks = (
        <>
            {location.pathname === '/' && (
                <Button variant="ghost" asChild>
                    <Link to="/notes">Dashboard</Link>
                </Button>
            )}
            {location.pathname === '/notes' && (
                <Button variant="ghost" onClick={handleLogout}>
                    Logout
                </Button>
            )}
        </>
    );

    const mobileGuestLinks = (
        <>
            {location.pathname !== '/signup' && (
                <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link to="/login" onClick={closeMenu}>Login</Link>
                </Button>
            )}
            {location.pathname !== '/login' && (
                <Button className="w-full" asChild>
                    <Link to="/signup" onClick={closeMenu}>Sign Up</Link>
                </Button>
            )}
        </>
    );

    const mobileAuthLinks = (
        <>
            {location.pathname === '/' && (
                <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link to="/notes" onClick={closeMenu}>Dashboard</Link>
                </Button>
            )}
            {/* ## Change: Mobile Logout button only shows on the /notes page ## */}
            {location.pathname === '/notes' && (
                <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
                    Logout
                </Button>
            )}
        </>
    );

    return (
        <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
                        <div className="p-2 bg-gradient-to-br from-primary/10 to-primary-glow/5 rounded-lg border border-primary/20">
                            <FileText className="h-6 w-6 text-primary" />
                        </div>
                        <span className="font-bold text-xl">NotesApp</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-2">
                        {jwt ? authLinks : guestLinks}
                        <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
                            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t border-border/50">
                        <div className="flex flex-col space-y-4">
                            <a href="/#features" className="text-foreground hover:text-primary transition-colors px-4 py-2" onClick={closeMenu}>Features</a>
                            <a href="/#pricing" className="text-foreground hover:text-primary transition-colors px-4 py-2" onClick={closeMenu}>Pricing</a>
                            <div className="flex flex-col space-y-2 px-4 pt-4 border-t border-border/50">
                                {jwt ? mobileAuthLinks : mobileGuestLinks}
                                <Button variant="outline" className="w-full" onClick={toggleTheme}>
                                    Toggle Theme
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;