import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';
import logo from '../assets/logo/terasys_logo.png';

interface NavbarProps {
  isLight?: boolean;
  onNavigate?: (index: number) => void;
}

const Navbar: React.FC<NavbarProps> = ({ isLight = false, onNavigate }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleHomeClick = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      // 서브페이지에서 홈으로 갈 때 state를 확실히 전달
      navigate('/', { state: { targetSection: index } });
    } else {
      // 홈 안에서 이동할 때
      if (onNavigate) {
        onNavigate(index);
      }
    }
  };

  const handleMouseEnter = (menu: string) => setActiveDropdown(menu);
  const handleMouseLeave = () => setActiveDropdown(null);

  return (
    <nav className={`${styles.navbar} ${isLight || location.pathname !== '/' ? styles.light : ''}`}>
      <Link to="/" className={styles.logoLink} onClick={(e) => handleHomeClick(e, 0)}>
        <img src={logo} alt="TERASYS" className={styles.logoImage} />
      </Link>
      <ul className={styles.navLinks}>
        <li onMouseEnter={() => handleMouseEnter('home')} onMouseLeave={handleMouseLeave}>
          <Link to="/" className={styles.navLink} onClick={(e) => handleHomeClick(e, 0)}>Home</Link>
        </li>
        
        <li className={styles.hasDropdown} onMouseEnter={() => handleMouseEnter('about')} onMouseLeave={handleMouseLeave}>
          <Link to="/" className={styles.navLink} onClick={(e) => handleHomeClick(e, 1)}>About</Link>
          <ul className={`${styles.dropdown} ${activeDropdown === 'about' ? styles.show : ''}`}>
            <li><Link to="/ethical-management">윤리경영</Link></li>
            <li><Link to="/major-news">주요뉴스</Link></li>
            <li><Link to="/community">커뮤니티</Link></li>
          </ul>
        </li>

        <li className={styles.hasDropdown} onMouseEnter={() => handleMouseEnter('solutions')} onMouseLeave={handleMouseLeave}>
          <Link to="/" className={styles.navLink} onClick={(e) => handleHomeClick(e, 2)}>Solutions</Link>
          <ul className={`${styles.dropdown} ${activeDropdown === 'solutions' ? styles.show : ''}`}>
            <li><Link to="/hitachi-vantara">HITACHI VANTARA</Link></li>
            <li><Link to="/logpresso">Logpresso</Link></li>
          </ul>
        </li>

        <li onMouseEnter={() => handleMouseEnter('services')} onMouseLeave={handleMouseLeave}>
          <Link to="/" className={styles.navLink} onClick={(e) => handleHomeClick(e, 3)}>Services</Link>
        </li>

        <li className={styles.hasDropdown} onMouseEnter={() => handleMouseEnter('clients')} onMouseLeave={handleMouseLeave}>
          <Link to="/" className={styles.navLink} onClick={(e) => handleHomeClick(e, 4)}>Clients</Link>
          <ul className={`${styles.dropdown} ${activeDropdown === 'clients' ? styles.show : ''}`}>
            <li><Link to="/all-clients">전체 고객사</Link></li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;