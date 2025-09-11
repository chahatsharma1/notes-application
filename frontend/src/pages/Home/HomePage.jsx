import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {ArrowRight, Sparkles, Edit3, Lock, Share2, Database, Zap, Shield, FileText} from "lucide-react";
import {Link} from "react-router-dom";
import {SocialIcon} from "react-social-icons";

const features = [
    { icon: Edit3, title: "Full CRUD Operations", description: "Create, read, update, and delete notes with a seamless interface designed for productivity.", color: "text-blue-600" },
    { icon: Lock, title: "JWT Authentication", description: "Secure access with JSON Web Tokens. Your notes are protected and only accessible to you.", color: "text-green-600" },
    { icon: Share2, title: "Smart Sharing", description: "Generate secure links to share specific notes with colleagues or friends, with full control over access.", color: "text-purple-600" },
    { icon: Database, title: "Reliable Storage", description: "Your notes are safely stored with automatic backups and synchronization across all your devices.", color: "text-orange-600" },
    { icon: Zap, title: "Lightning Fast", description: "Optimized performance ensures your notes load instantly and sync in real-time.", color: "text-yellow-600" },
    { icon: Shield, title: "Privacy First", description: "End-to-end encryption and privacy controls keep your thoughts secure and confidential.", color: "text-red-600" }
];

export const HomePage = () => {

    return (
        <div className="bg-background text-foreground">
            <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-background via-background to-muted/20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary-glow/5" />
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-12 items-center">
                        <div className="text-center lg:text-left space-y-8 lg:col-span-2">
                            <div className="space-y-4">
                                <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20">
                                    ✨ Secure • Simple • Shareable
                                </div>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                                    Your thoughts,{" "}
                                    <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">organized</span>{" "}and secure
                                </h1>
                                <p className="text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                                    Create, organize, and share your notes with powerful JWT authentication.
                                    From quick thoughts to detailed documents, all accessible anywhere.
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <Link to="/signup">
                                    <Button
                                        variant="hero"
                                        size="lg"
                                        className="text-base px-8 font-semibold text-[var(--primary-foreground)] bg-[var(--primary)] hover:bg-[oklch(0.55_0.15_39)] transition-colors duration-300">
                                        Create Your First Note
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </Link>
                            </div>
                            <div className="flex items-center gap-8 justify-center lg:justify-start text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                                    No credit card required
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                                    Free forever plan
                                </div>
                            </div>
                        </div>
                        <div className="relative lg:col-span-3">
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border/50 transform -rotate-2 hover:scale-105 hover:-rotate-1 transition-transform duration-500 ease-in-out">
                                <img
                                    src='/img.png'
                                    alt="Notes App Interface"
                                    className="w-full h-auto"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent" />
                            </div>
                            <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-pulse" />
                            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-primary-glow/10 rounded-full blur-2xl animate-pulse delay-1000" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 bg-gradient-to-b from-muted/20 to-background">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20 mb-6">
                            ⚡ Powerful Features
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Everything you need to{" "}
                            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">stay organized</span>
                        </h2>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            From simple note-taking to advanced collaboration, our platform provides
                            all the tools you need to capture and share your ideas effectively.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <Card
                                    key={index}
                                    className="group relative border border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                                    <CardContent className="p-6 space-y-4">
                                        <div className="flex items-center space-x-4">
                                            <div className={`p-3 rounded-lg bg-gradient-to-br from-primary/10 to-primary-glow/5 border border-primary/20 ${feature.color}`}>
                                                <Icon className="h-6 w-6" />
                                            </div>
                                            <h3 className="font-semibold text-lg">{feature.title}</h3>
                                        </div>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="py-24 bg-gradient-to-r from-primary/5 via-primary-glow/5 to-primary/5">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20">
                                <Sparkles className="h-4 w-4" />
                                Ready to get started?
                            </div>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                                Join thousands of users who trust{" "}
                                <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">NotesApp</span>
                            </h2>
                            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                                Start organizing your thoughts today with our secure, feature-rich notes platform.
                                No commitment required – try it free forever.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="bg-muted/30 border-t border-border/50">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex justify-center text-center">
                        <div className="space-y-4">
                            <div className="flex items-center justify-center space-x-2">
                                <div className="p-2 bg-gradient-to-br from-primary/10 to-primary-glow/5 rounded-lg border border-primary/20">
                                    <FileText className="h-5 w-5 text-primary" />
                                </div>
                                <span className="font-bold text-lg">NotesApp</span>
                            </div>
                            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                                Secure, simple, and shareable note-taking platform designed for modern productivity.
                            </p>
                            <div className="flex space-x-2 justify-center">
                                <SocialIcon
                                    url="https://github.com/chahatsharma1"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    network="github"
                                    className="h-8 w-8"
                                    bgColor="transparent"
                                    fgColor="var(--foreground)"
                                    style={{ height: '45px', width: '45px' }}
                                />
                                <SocialIcon
                                    url="https://www.linkedin.com/in/chahat10"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    network="linkedin"
                                    className="h-8 w-8"
                                    bgColor="transparent"
                                    fgColor="var(--foreground)"
                                    style={{ height: '45px', width: '45px' }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-border/50 mt-8 pt-4 text-center text-sm text-muted-foreground">
                        <p>&copy; 2025 NotesApp. All rights reserved. Built with ❤️ for productivity.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;

