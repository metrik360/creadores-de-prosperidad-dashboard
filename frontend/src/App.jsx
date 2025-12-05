import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import General from './pages/General';
import Estudiante from './pages/Estudiante';
import Marketing from './pages/Marketing';
import Filters from './components/Filters';

function App() {
  const [filters, setFilters] = useState({
    startDate: null,
    endDate: null,
    excludeStatus: 'Retirado'
  });

  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <div className="header-content">
            <h1>MÉTRIK</h1>
            <p>Dashboard - Creadores de Prosperidad</p>
          </div>
        </header>

        <Filters filters={filters} setFilters={setFilters} />

        <nav className="app-nav">
          <Link to="/" className="nav-link">General</Link>
          <Link to="/estudiante" className="nav-link">Estudiante</Link>
          <Link to="/marketing" className="nav-link">Marketing</Link>
        </nav>

        <main className="app-main">
          <Routes>
            <Route path="/" element={<General filters={filters} />} />
            <Route path="/estudiante" element={<Estudiante filters={filters} />} />
            <Route path="/marketing" element={<Marketing filters={filters} />} />
          </Routes>
        </main>

        <footer className="app-footer">
          <span className="footer-text">Powered by</span>
          <img
            src="https://i.ibb.co/sdb3Bpq5/M-trik-logo-iso.png"
            alt="MÉTRIK"
            className="footer-logo"
          />
        </footer>
      </div>
    </Router>
  );
}

export default App;
