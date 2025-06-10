import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BuilderProvider } from './context/BuilderContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';

function App() {
  return (
    <BuilderProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </BuilderProvider>
  );
}

export default App;