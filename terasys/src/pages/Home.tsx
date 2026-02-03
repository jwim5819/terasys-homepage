import { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Home.module.css';
import Footer from '../components/Footer';

// Section Components
import AboutSection from '../components/sections/AboutSection';
import SolutionsSection from '../components/sections/SolutionsSection';
import ClientsSection from '../components/sections/ClientsSection';

// Import background images
import homeBg1 from '../assets/home/home-bg-1.jpg';
import homeBg2 from '../assets/home/home-bg-2.jpg';
import homeBg3 from '../assets/home/home-bg-3.jpg';

const backgroundImages = [homeBg1, homeBg2, homeBg3];

export interface HomeHandle {
  scrollToSection: (index: number) => void;
}

interface HomeProps {
  onSectionChange?: (index: number) => void;
}

const Home = forwardRef<HomeHandle, HomeProps>(({ onSectionChange }, ref) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Expose scrollToSection
  useImperativeHandle(ref, () => ({
    scrollToSection: (index: number) => {
      scrollToSection(index);
    }
  }));

  // Handle navigation from state
  useEffect(() => {
    if (location.state && typeof location.state.targetSection === 'number') {
      const target = location.state.targetSection;
      const scrollTimer = setTimeout(() => {
        scrollToSection(target);
      }, 200);
      window.history.replaceState({}, document.title);
      return () => clearTimeout(scrollTimer);
    }
  }, [location.state]);

  // Preload images
  useEffect(() => {
    const preloadImages = async () => {
      const promises = backgroundImages.map((src) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = resolve;
        });
      });
      try {
        await Promise.all(promises);
        setImagesLoaded(true);
      } catch (error) {
        setImagesLoaded(true);
      }
    };
    preloadImages();
    const timer = setTimeout(() => setImagesLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Background slider
  useEffect(() => {
    if (onSectionChange) {
        onSectionChange(currentSection > 0 ? currentSection : 0);
    }
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Scroll handling
  useEffect(() => {
    const container = containerRef.current;
    let isScrolling = false;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isScrolling) return;

      const direction = e.deltaY > 0 ? 1 : -1;
      const nextSection = Math.min(Math.max(currentSection + direction, 0), 4);

      if (nextSection !== currentSection) {
        isScrolling = true;
        setCurrentSection(nextSection);
        if (onSectionChange) {
            onSectionChange(nextSection > 0 ? nextSection : 0);
        }
        scrollToSection(nextSection);
        setTimeout(() => {
          isScrolling = false;
        }, 800);
      }
    };

    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }
    return () => {
      if (container) container.removeEventListener('wheel', handleWheel);
    };
  }, [currentSection, onSectionChange]);

  const scrollToSection = (index: number) => {
    if (containerRef.current) {
        let top = 0;
        if (index === 4) {
            top = containerRef.current.scrollHeight - window.innerHeight;
        } else {
            top = index * window.innerHeight;
        }

      containerRef.current.scrollTo({
        top: top,
        behavior: 'smooth',
      });
      setCurrentSection(index);
      if (onSectionChange) onSectionChange(index > 0 ? index : 0);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container} ref={containerRef}>
        {/* Page 1: Home Hero */}
        <section className={styles.section} id="home">
          <div className={`${styles.bgContainer} ${imagesLoaded ? styles.loaded : ''}`}>
            {backgroundImages.map((bg, index) => (
              <div
                key={index}
                className={`${styles.bgImage} ${index === currentBgIndex ? styles.active : ''}`}
                style={{ backgroundImage: `url(${bg})` }}
              />
            ))}
          </div>
          <div className={`${styles.content} ${imagesLoaded ? styles.show : ''}`}>
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

        {/* Page 2: About Us */}
        <AboutSection />

        {/* Page 3: Solutions */}
        <SolutionsSection />

        {/* Page 4: Clients */}
        <ClientsSection />

        <Footer />
      </div>

      <div className={styles.indicator}>
        {[0, 1, 2, 3].map((index) => (
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
});

export default Home;