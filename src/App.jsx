import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Feed, { 
    NotesSection, 
    CommunitiesSection, 
    MessageSection, 
    RandomChatSection, 
    ConfessionSection 
} from './pages/Feed';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function AppContent() {
  const location = useLocation();
  const showFooter = location.pathname !== '/feed';

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/feed" element={<Feed />}>
            <Route index element={<Navigate to="notes" replace />} />
            <Route path="notes" element={<NotesSection type="Notes" />} />
            <Route path="pyqs" element={<NotesSection type="PYQs" />} />
            <Route path="communities" element={<CommunitiesSection />} />
            <Route path="messages" element={<MessageSection />} />
            <Route path="random-chats" element={<RandomChatSection />} />
            <Route path="confessions" element={<ConfessionSection />} />
          </Route>
        </Routes>
      </main>
      {showFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router basename="/btechbaba/">
      <AppContent />
    </Router>
  );
}

export default App;
