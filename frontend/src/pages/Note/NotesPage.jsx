import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { formatDistanceToNow } from 'date-fns';
import { getAllNotes, createNote, deleteNote, updateNote } from '@/state/note/Action.js';
import { Search, Trash2, PlusCircle, Save, FileText, Share2, Copy } from 'lucide-react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const ShareDialogContent = ({ noteId }) => {
    const dispatch = useDispatch();
    const note = useSelector(store => store.note.notes.find(n => n.id === noteId));

    if (!note) return <div className='p-4'>Loading note details...</div>;

    const handleToggleShare = (isPublic) => {
        const promise = dispatch(updateNote(note.id, { publicShare: isPublic }));
        toast.promise(promise, {
            loading: 'Updating status...',
            success: <b>Sharing status updated!</b>,
            error: <b>Could not update status.</b>,
        });
    };

    const handleCopyLink = () => {
        const publicUrl = `${window.location.origin}/notes/public/${note.shareSlug}`;
        navigator.clipboard.writeText(publicUrl);
        toast.success('Link copied!');
    };

    return (
        <>
            <DialogHeader>
                <DialogTitle>Share Note</DialogTitle>
                <DialogDescription>
                    {note.publicShare ? 'This note is public. Anyone with the link can view it.' : 'Make this note public to get a shareable link.'}
                </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
                <div className="flex justify-between items-center p-3 bg-[var(--color-input)] rounded-md">
                    <label htmlFor="public-toggle" className="text-sm font-medium">Make Public</label>
                    <button id="public-toggle" onClick={() => handleToggleShare(!note.publicShare)} className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${note.publicShare ? 'bg-primary' : 'bg-gray-400 dark:bg-gray-600'}`}>
                        <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${note.publicShare ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                </div>
                {note.publicShare && note.shareSlug && (
                    <div className="flex rounded-md shadow-sm">
                        <input type="text" readOnly value={`${window.location.origin}/notes/public/${note.shareSlug}`} className="block w-full flex-1 rounded-none rounded-l-md bg-[var(--color-input)] border-[var(--color-border)] px-3 py-2 text-sm text-[var(--color-muted-foreground)]" />
                        <button onClick={handleCopyLink} className="inline-flex items-center rounded-r-md border border-l-0 border-[var(--color-border)] bg-[var(--color-accent)] px-3 text-sm font-medium hover:bg-[var(--color-accent)]/80">
                            <Copy size={16} />
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

const NotesList = ({ notes, selectedNote, onSelectNote, onCreateNote, onConfirmDelete, searchQuery, onSearchChange }) => {
    const filteredNotes = notes ? notes.filter(note => note.title.toLowerCase().includes(searchQuery.toLowerCase()) || note.content.toLowerCase().includes(searchQuery.toLowerCase())) : [];
    return (
        <div className="w-80 flex-shrink-0 border-r border-[var(--color-border)] p-4 flex flex-col pt-20">
            <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-muted-foreground)]" />
                <input
                    type="text"
                    placeholder="Search notes..."
                    value={searchQuery}
                    onChange={onSearchChange}
                    className="w-full pl-10 pr-4 py-2 bg-[var(--color-input)] border border-[var(--color-border)] rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[var(--color-ring)]"
                />
            </div>
            <div className="flex-1 overflow-y-auto space-y-2">
                {notes && filteredNotes.length === 0 ? (
                    <div className="text-center py-10">
                        <FileText className="mx-auto h-12 w-12 text-[var(--color-muted-foreground)]" />
                        <h3 className="mt-2 text-sm font-medium text-[var(--color-foreground)]">
                            {searchQuery ? 'No matching notes' : 'No notes yet'}
                        </h3>
                        <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
                            {searchQuery ? 'Try a different search term.' : 'Get started by creating a new note.'}
                        </p>
                    </div>
                ) : (
                    filteredNotes.map(note => (
                        <div
                            key={note.id}
                            onClick={() => onSelectNote(note)}
                            className={`relative group p-3 rounded-lg cursor-pointer transition-colors ${selectedNote?.id === note.id ? 'bg-[var(--color-accent)]' : 'hover:bg-[var(--color-accent)]/50'}`}>
                            <button
                                onClick={(e) => { e.stopPropagation(); onConfirmDelete(note.id); }}
                                className="absolute top-2 right-2 p-1 rounded-full text-[var(--color-muted-foreground)] opacity-0 group-hover:opacity-100 hover:bg-[var(--color-destructive)]/20 hover:text-[var(--color-destructive)] transition-opacity">
                                <Trash2 size={16} />
                            </button>
                            <h3 className="font-semibold text-sm truncate pr-6">{note.title}</h3>
                            <p className="text-xs text-[var(--color-muted-foreground)] truncate mt-1">{note.content || 'No content'}</p>
                            <div className="text-xs text-[var(--color-muted-foreground)] mt-2 capitalize">
                                {formatDistanceToNow(new Date(note.updatedAt), { addSuffix: true })}
                            </div>
                        </div>
                    ))
                )}
            </div>
            <button
                onClick={onCreateNote}
                className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white font-medium hover:bg-[var(--color-primary)]/90 transition-colors">
                <PlusCircle size={18} />
                New Note
            </button>
        </div>
    );
};

const NoteEditor = ({ note, onConfirmDelete, onSaveNote, isNew }) => {
    const [currentNote, setCurrentNote] = useState({ title: '', content: '' });

    useEffect(() => {
        if (note) {
            setCurrentNote({ title: note.title || '', content: note.content || '' });
        }
    }, [note]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentNote(prevNote => ({ ...prevNote, [name]: value }));
    };

    const handleSave = () => {
        const payload = { title: currentNote.title || "Untitled", content: currentNote.content };
        onSaveNote(note?.id, payload, isNew);
    };

    const handleDelete = () => { onConfirmDelete(note.id); };

    const editorVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
    };

    return (
        <div className="flex-grow relative overflow-hidden">
            <AnimatePresence mode="wait">
                {!note && !isNew ? (
                    <motion.div key="placeholder" variants={editorVariants} initial="hidden" animate="visible" exit="exit" className="h-full flex items-center justify-center text-[var(--color-muted-foreground)]">
                        <p>Select a note to view or create a new one.</p>
                    </motion.div>
                ) : (
                    <motion.main key="editor" variants={editorVariants} initial="hidden" animate="visible" exit="exit" className="w-full h-full p-8 pt-24 overflow-y-auto">
                        <header className="absolute top-20 right-6 flex items-center gap-3 z-10">
                            {!isNew && note?.id && (
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <button title="Share Note" className="p-2 rounded-full text-[var(--color-muted-foreground)] hover:bg-[var(--color-accent)]/50 transition-colors">
                                            <Share2 size={20} />
                                        </button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px] bg-[var(--color-background)] border-[var(--color-border)]">
                                        <ShareDialogContent noteId={note.id} />
                                    </DialogContent>
                                </Dialog>
                            )}
                            <button onClick={handleSave} title="Save Note" className="p-2 rounded-full bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary)]/90 transition-colors shadow-md">
                                <Save size={20} />
                            </button>
                            {!isNew && note?.id && (
                                <button onClick={handleDelete} title="Delete Note" className="p-2 rounded-full text-[var(--color-muted-foreground)] hover:bg-[var(--color-destructive)]/20 hover:text-[var(--color-destructive)] transition-colors">
                                    <Trash2 size={20} />
                                </button>
                            )}
                        </header>
                        <div className="max-w-3xl mx-auto">
                            <input
                                type="text" name="title" value={currentNote.title} onChange={handleChange} placeholder="Note Title"
                                className="w-full bg-transparent text-4xl font-bold focus:outline-none mb-4 text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)]/50"
                            />
                            <textarea
                                name="content" value={currentNote.content} onChange={handleChange} placeholder="Start writing..."
                                className="w-full h-full min-h-[60vh] bg-transparent focus:outline-none resize-none leading-relaxed text-lg text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)]/50"
                            />
                        </div>
                    </motion.main>
                )}
            </AnimatePresence>
        </div>
    );
};

const NotesPage = () => {
    const dispatch = useDispatch();
    const { notes, loading, error } = useSelector(state => state.note);
    const [selectedNote, setSelectedNote] = useState(null);
    const [isNew, setIsNew] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        dispatch(getAllNotes());
    }, [dispatch]);

    const handleCreateNote = () => {
        setIsNew(true);
        setSelectedNote({ title: '', content: '' });
    };

    const handleSaveNote = (noteId, payload, isNewNote) => {
        const action = isNewNote ? createNote(payload) : updateNote(noteId, payload);
        toast.promise(dispatch(action), {
            loading: 'Saving note...',
            success: (<b>Note saved!</b>),
            error: (<b>Could not save note.</b>),
        });
        setIsNew(false);
        setSelectedNote(null);
    };

    const handleDeleteNote = (noteId) => {
        dispatch(deleteNote(noteId));
        if (selectedNote?.id === noteId) {
            setSelectedNote(null);
            setIsNew(false);
        }
        toast.success("Note deleted");
    };

    const confirmAndDelete = (noteId) => {
        toast.custom((t) => (
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }}
                        className={`max-w-md w-full bg-[var(--color-background)] shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 border border-[var(--color-border)]`}>
                <div className="flex-1 w-0 p-4">
                    <div className="flex items-start">
                        <div className="ml-3 flex-1">
                            <p className="text-sm font-medium text-[var(--color-foreground)]">Delete Note</p>
                            <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">Are you sure?</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col border-l border-[var(--color-border)]">
                    <button onClick={() => { handleDeleteNote(noteId); toast.dismiss(t.id); }}
                            className="w-full border-b border-[var(--color-border)] p-4 flex items-center justify-center text-sm font-medium text-[var(--color-destructive)] hover:bg-[var(--color-destructive)]/10 focus:outline-none">
                        Delete
                    </button>
                    <button onClick={() => toast.dismiss(t.id)}
                            className="w-full p-4 flex items-center justify-center text-sm font-medium text-[var(--color-foreground)] hover:bg-[var(--color-accent)]/50 focus:outline-none">
                        Cancel
                    </button>
                </div>
            </motion.div>
        ));
    };

    if (loading && (!notes || notes.length === 0)) {
        return <div className="h-screen w-full flex items-center justify-center bg-[var(--color-background)] text-[var(--color-foreground)]"><p>Loading notes...</p></div>;
    }

    if (error) {
        return <div className="h-screen w-full flex items-center justify-center bg-[var(--color-background)] text-[var(--color-destructive)]"><p>Error: {error}</p></div>;
    }

    return (
        <div className="h-screen w-full flex bg-[var(--color-background)] text-[var(--color-foreground)] font-[var(--font-outfit)]">
            <Toaster position="bottom-center" gutter={8} toastOptions={{
                style: {
                    background: 'var(--color-background)',
                    color: 'var(--color-foreground)',
                    border: '1px solid var(--color-border)',
                },
            }} />
            <NotesList
                notes={notes}
                selectedNote={selectedNote}
                onSelectNote={(note) => { setSelectedNote(note); setIsNew(false); }}
                onCreateNote={handleCreateNote}
                onConfirmDelete={confirmAndDelete}
                searchQuery={searchQuery}
                onSearchChange={(e) => setSearchQuery(e.target.value)}
            />
            <NoteEditor
                note={selectedNote}
                onConfirmDelete={confirmAndDelete}
                onSaveNote={handleSaveNote}
                isNew={isNew}
            />
        </div>
    );
};

export default NotesPage;