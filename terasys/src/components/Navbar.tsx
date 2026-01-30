import React from 'react';
import styles from './Navbar.module.css';
import logo from '../assets/logo/terasys_logo.png';

interface NavbarProps {
  isLight?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isLight = false }) => {
  return (
    <nav className={`${styles.navbar} ${isLight ? styles.light : ''}`}>
      <a href="/" className={styles.logoLink}>
        <img src={logo} alt="TERASYS" className={styles.logoImage} />
      </a>
      <ul className={styles.navLinks}>
        <li><a href="#home" className={styles.navLink}>Home</a></li>
        <li><a href="#about" className={styles.navLink}>About</a></li>
        <li><a href="#services" className={styles.navLink}>Services</a></li>
        <li><a href="#contact" className={styles.navLink}>Contact</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
