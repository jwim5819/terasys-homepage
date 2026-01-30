import { useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home, { type HomeHandle } from './pages/Home';
import EthicalManagement from './pages/subpages/EthicalManagement';
import MajorNews from './pages/subpages/MajorNews';
import Community from './pages/subpages/Community';
import HitachiVantara from './pages/subpages/HitachiVantara';
import Logpresso from './pages/subpages/Logpresso';
import AllClients from './pages/subpages/AllClients';
import './App.css';

function App() {
  const [isNavbarLight, setIsNavbarLight] = useState(false);
  const homeRef = useRef<HomeHandle>(null);

  const handleNavClick = (index: number) => {
    if (homeRef.current) {
      homeRef.current.scrollToSection(index);
    }
  };

  return (
    <Router>
      <div className="App">
        <Navbar isLight={isNavbarLight} onNavigate={handleNavClick} />
        <main>
          <Routes>
            <Route path="/" element={
              <Home ref={homeRef} onSectionChange={(index) => setIsNavbarLight(index > 0)} />
            } />
            <Route path="/ethical-management" element={<EthicalManagement />} />
            <Route path="/major-news" element={<MajorNews />} />
            <Route path="/community" element={<Community />} />
            <Route path="/hitachi-vantara" element={<HitachiVantara />} />
            <Route path="/logpresso" element={<Logpresso />} />
            <Route path="/all-clients" element={<AllClients />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;