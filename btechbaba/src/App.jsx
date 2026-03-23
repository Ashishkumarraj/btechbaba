import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function AppContent() {
  const location = useLocation();
  const showFooter = true;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
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
