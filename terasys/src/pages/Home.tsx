import React, { useState, useEffect, useRef } from 'react';
import styles from './Home.module.css';

// Import background images
import homeBg1 from '../assets/home/home-bg-1.jpg';
import homeBg2 from '../assets/home/home-bg-2.jpg';
import homeBg3 from '../assets/home/home-bg-3.jpg';

const backgroundImages = [homeBg1, homeBg2, homeBg3];

interface HomeProps {
  onSectionChange?: (index: number) => void;
}

const Home: React.FC<HomeProps> = ({ onSectionChange }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Background slider logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    let isScrolling = false;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (isScrolling) return;

      const direction = e.deltaY > 0 ? 1 : -1;
      // 0: Page 1, 1: Page 2, 2: Footer
      const nextSection = Math.min(Math.max(currentSection + direction, 0), 2);

      if (nextSection !== currentSection) {
        isScrolling = true;
        setCurrentSection(nextSection);
        if (onSectionChange) {
            onSectionChange(nextSection > 0 ? nextSection : 0); // Trigger navbar change
        }
        
        scrollToSection(nextSection);

        setTimeout(() => {
          isScrolling = false;
        }, 800); // Wait for animation to finish
      }
    };

    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }
    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, [currentSection, onSectionChange]);

  const scrollToSection = (index: number) => {
    if (containerRef.current) {
        let top = 0;
        if (index === 2) {
            // Footer case: Scroll to bottom
            top = containerRef.current.scrollHeight - window.innerHeight;
        } else {
            top = index * window.innerHeight;
        }

      containerRef.current.scrollTo({
        top: top,
        behavior: 'smooth',
      });
      // Update state if called externally (e.g. from nav dots)
      setCurrentSection(index);
      if (onSectionChange) onSectionChange(index);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container} ref={containerRef}>
        {/* Page 1 */}
        <section className={styles.section}>
          <div className={styles.bgContainer}>
            {backgroundImages.map((bg, index) => (
              <div
                key={index}
                className={`${styles.bgImage} ${index === currentBgIndex ? styles.active : ''}`}
                style={{ backgroundImage: `url(${bg})` }}
              />
            ))}
          </div>
          <div className={styles.content}>
            {/* Page 1 Content Area */}
            <div className={styles.visualCircle}></div>
            
            <div className={styles.textContentWrapper}>
              <h1 className={styles.mainTitle}>TERASYS</h1>
              <div className={styles.heroText}>
                <h2 className={styles.subTitle1}>차세대 보안운영의 기준</h2>
                <p className={styles.subTitle2}>
                  앱으로 확장되는 에이전틱 SIEM 플랫폼이 완전한 AI 기반 보안운영 시대를 열어갑니다.
                </p>
                <button className={styles.aboutButton} onClick={() => scrollToSection(1)}>
                  About Us →
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Page 2 */}
        <section className={styles.section}>
          <div className={styles.content}>
            {/* Page 2 Content Area */}
            <h1>Page 2</h1>
          </div>
        </section>

        {/* Footer (Not a full section, but snaps to end) */}
        <footer className={styles.footer}>
          <div className={styles.footerContent}>
            <h1>Footer Area</h1>
            <p>&copy; 2026 TERASYS. All rights reserved.</p>
          </div>
        </footer>
      </div>

      {/* Right Side Indicator (Only for main sections) */}
      <div className={styles.indicator}>
        {[0, 1].map((index) => (
          <button
            key={index}
            className={`${styles.dot} ${currentSection === index ? styles.active : ''}`}
            onClick={() => scrollToSection(index)}
            aria-label={`Go to section ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;