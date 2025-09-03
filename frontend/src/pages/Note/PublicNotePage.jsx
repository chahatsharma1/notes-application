import React from 'react';
import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import { getPublicNote } from '@/state/note/Action.js';
import { Loader2, ShieldX } from 'lucide-react';

export const PublicNotePage = () => {
    const { slug } = useParams();
    const dispatch = useDispatch();
    const { publicNote, loading, error } = useSelector(store => store.note);

    useEffect(() => {
        if (slug) {
            dispatch(getPublicNote(slug));
        }
    }, [slug, dispatch]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="mt-4 text-muted-foreground">Loading note...</p>
            </div>
        );
    }

    if (error || !publicNote) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
                <ShieldX className="h-16 w-16 text-destructive" />
                <h1 className="mt-6 text-2xl font-bold">Note Not Found</h1>
                <p className="mt-2 text-muted-foreground text-center">
                    This note either doesn't exist or is no longer being shared publicly.
                </p>
                <Link to="/" className="mt-8 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90">
                    Go to Homepage
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-background min-h-screen font-[var(--font-outfit)]">
            <main className="container mx-auto px-4 py-12 md:py-20">
                <div className="max-w-3xl mx-auto">
                    <div className="space-y-4 mb-8">
                        <p className="text-muted-foreground text-lg">
                            Last updated on {format(new Date(publicNote.updatedAt), "MMMM d, yyyy")}
                        </p>
                        <h1 className="text-4xl md:text-5xl font-bold text-foreground break-words">
                            {publicNote.title}
                        </h1>

                    </div>

                    <div className="prose prose-lg dark:prose-invert max-w-none text-foreground leading-relaxed whitespace-pre-wrap break-words">
                        {publicNote.content}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PublicNotePage;