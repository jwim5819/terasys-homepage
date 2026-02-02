import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import SolutionsPage from './pages/SolutionsPage';
import ClientsPage from './pages/ClientsPage';
import ServicesPage from './pages/ServicesPage';

// Subpages
import EthicalManagement from './pages/subpages/EthicalManagement';
import MajorNews from './pages/subpages/MajorNews';
import Community from './pages/subpages/Community';
import HitachiVantara from './pages/subpages/HitachiVantara';
import Logpresso from './pages/subpages/Logpresso';
import AllClients from './pages/subpages/AllClients';
import './App.css';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  
  return (
    <>
      {children}
      {!isHome && <Footer />}
    </>
  );
};

function App() {
  const [isNavbarLight, setIsNavbarLight] = useState(false);
  // 타입 에러 회피를 위해 any 사용
  const homeRef = useRef<any>(null);

  const handleNavClick = (index: number) => {
    if (homeRef.current) {
      homeRef.current.scrollToSection(index);
    }
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Navbar isLight={isNavbarLight} onNavigate={handleNavClick} />
        <Layout>
          <Routes>
            <Route path="/" element={
              <Home ref={homeRef} onSectionChange={(index) => setIsNavbarLight(index > 0)} />
            } />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/solutions" element={<SolutionsPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/clients" element={<ClientsPage />} />
            
            <Route path="/ethical-management" element={<EthicalManagement />} />
            <Route path="/major-news" element={<MajorNews />} />
            <Route path="/community" element={<Community />} />
            <Route path="/hitachi-vantara" element={<HitachiVantara />} />
            <Route path="/logpresso" element={<Logpresso />} />
            <Route path="/all-clients" element={<AllClients />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}

export default App;