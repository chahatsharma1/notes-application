import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Navbar} from './components/Navbar.jsx';
import LoginPage from './pages/Auth/LoginPage.jsx';
import HomePage from "./pages/Home/HomePage.jsx";
import SignupPage from "./pages/Auth/SignupPage.jsx";
import NotesPage from "@/pages/Note/NotesPage.jsx";
import PublicNotePage from "@/pages/Note/PublicNotePage.jsx";

function App() {
    return (
        <Router>
            <Navbar />
                <Routes>
                    <Route path= "/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/notes" element={<NotesPage />} />
                    <Route path="/notes/public/:slug" element={<PublicNotePage />} />
                </Routes>
        </Router>
    );
}

export default App;