import { useState, useEffect, useRef, useImperativeHandle, forwardRef, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Home.module.css';
import logo from '../assets/logo/terasys_logo.png';

// Import background images
import homeBg1 from '../assets/home/home-bg-1.jpg';
import homeBg2 from '../assets/home/home-bg-2.jpg';
import homeBg3 from '../assets/home/home-bg-3.jpg';

const backgroundImages = [homeBg1, homeBg2, homeBg3];

// Dynamically load client logos (only from siem_soar)
const clientLogoModules = import.meta.glob('../assets/clients/siem_soar/*.{png,jpg,jpeg,PNG,JPG,JPEG,svg}', {
  eager: true,
  query: '?url',
  import: 'default',
});
const allClientLogos = Object.values(clientLogoModules) as string[];

export interface HomeHandle {
  scrollToSection: (index: number) => void;
}

interface HomeProps {
  onSectionChange?: (index: number) => void;
}

const Home = forwardRef<HomeHandle, HomeProps>(({ onSectionChange }, ref) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Expose scrollToSection to parent
  useImperativeHandle(ref, () => ({
    scrollToSection: (index: number) => {
      scrollToSection(index);
    }
  }));

  // Handle navigation from subpages
  useEffect(() => {
    if (location.state && typeof location.state.targetSection === 'number') {
      const target = location.state.targetSection;
      
      // 컨테이너가 준비될 때까지 반복 확인하거나 충분한 시간을 줌
      const scrollTimer = setTimeout(() => {
        scrollToSection(target);
      }, 200); // 100ms에서 200ms로 약간 늘림
      
      // state 초기화 (re-run 방지)
      window.history.replaceState({}, document.title);
      return () => clearTimeout(scrollTimer);
    }
  }, [location.state]); // location 전체보다 location.state 변화에 집중

  // Background slider logic
  useEffect(() => {
    // 초기 마운트 시 현재 섹션에 맞는 네이비바 스타일 적용
    if (onSectionChange) {
        onSectionChange(currentSection > 0 ? currentSection : 0);
    }

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
      // 0: Page 1, 1: Page 2, 2: Page 3, 3: Page 4, 4: Page 5, 5: Footer
      const nextSection = Math.min(Math.max(currentSection + direction, 0), 5);

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
        if (index === 5) {
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
      if (onSectionChange) onSectionChange(index > 0 ? index : 0);
    }
  };

  const { topRowLogos, bottomRowLogos } = useMemo(() => {
    const half = Math.ceil(allClientLogos.length / 2);
    // Double the arrays for a seamless infinite loop
    return {
      topRowLogos: [...allClientLogos.slice(0, half), ...allClientLogos.slice(0, half)],
      bottomRowLogos: [...allClientLogos.slice(half), ...allClientLogos.slice(half)],
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container} ref={containerRef}>
        {/* Page 1: Home */}
        <section className={styles.section} id="home">
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
        <section className={styles.section} style={{ backgroundColor: '#ffffff' }} id="about">
          <div className={styles.aboutContent}>
            <div className={styles.aboutLogoContainer}>
              <img src={logo} alt="TERASYS Logo" className={styles.aboutLogo} />
            </div>
            <div className={styles.aboutTextContainer}>
              <h2 className={styles.aboutMainHeading}>
                최고의 기술과 풍부한 경험으로<br />
                차세대 보안운영의 표준을 제시합니다.
              </h2>
              <div className={styles.aboutBodyText}>
                안녕하십니까, 보안 솔루션 전문 기업 테라시스입니다.<br /><br />
                오늘날의 보안 환경은 온프레미스에서 클라우드까지 그 경계가 무너지고 있으며, 관리해야 할 보안 데이터는 기하급수적으로 늘어나고 있습니다. 기존의 통합로그분석이나 보안관제 시스템은 파편화된 위협 대응과 성능의 한계로 인해 갈수록 고도화되는 사이버 공격을 방어하는 데 어려움을 겪고 있습니다.<br /><br />
                테라시스는 이러한 한계를 극복하고자 보안운영 플랫폼 전문 기업인 로그프레소(Logpresso) 의 강력한 기술력에 금융, 제조, 통신, 공공 등 다양한 산업군에서 쌓아온 당사의 차세대 보안운영 (에이전틱 AI SIEM) 구축 노하우를 결합하였습니다.<br /><br />
                단순한 솔루션 공급을 넘어, 데이터 수집부터 위협 탐지, 침해 분석 및 대응(SOAR), 그리고 시각화에 이르기까지 모든 과정을 하나의 플랫폼으로 통합하여 완전한 가시성을 제공합니다. 테라시스는 AI와 위협 인텔리전스가 결합된 디지털 포렌식 수준의 자동 분석 체계를 구축하여, 고객사가 가장 안전한 디지털 환경에서 비즈니스에 전념할 수 있도록 최상의 동반자가 되겠습니다.
              </div>
            </div>
          </div>
        </section>

        {/* Page 3: Solutions */}
        <section className={styles.section} style={{ backgroundColor: '#f9f9f9' }} id="solutions">
          <div className={styles.aboutContent}>
            <h1 style={{ color: '#333', fontSize: '3rem' }}>Solutions</h1>
          </div>
        </section>

        {/* Page 4: Services */}
        <section className={styles.section} style={{ backgroundColor: '#f0f2f5' }} id="services">
          <div className={styles.aboutContent}>
            <h1 style={{ color: '#333', fontSize: '3rem' }}>Business Area</h1>
          </div>
        </section>

        {/* Page 5: Clients */}
        <section className={styles.section} style={{ backgroundColor: '#ffffff' }} id="clients">
          <div className={styles.clientsContent}>
            <div className={styles.clientsHeader}>
              <h1 className={styles.clientsTitle}>CLIENTS</h1>
              <p className={styles.clientsSubtitle}>
                테라시스는 다양한 산업 분야의 고객과 함께 안정적인 보안·운영 환경을 만들어가고 있습니다.
              </p>
            </div>

            <div className={styles.conveyorWrapper}>
              <div className={styles.conveyorGradientLeft}></div>
              <div className={styles.conveyorGradientRight}></div>
              
              <div className={styles.conveyorContainer}>
                <div className={styles.conveyorTrackLeft}>
                  {topRowLogos.map((logo, index) => (
                    <div key={`top-${index}`} className={styles.conveyorItem}>
                      <img src={logo} alt={`Client logo top ${index}`} />
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.conveyorContainer}>
                <div className={styles.conveyorTrackRight}>
                  {bottomRowLogos.map((logo, index) => (
                    <div key={`bottom-${index}`} className={styles.conveyorItem}>
                      <img src={logo} alt={`Client logo bottom ${index}`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button className={styles.seeAllClients} onClick={() => navigate('/all-clients')}>
              See All Clients →
            </button>
          </div>
        </section>

        {/* Footer (Index 4) */}
        <footer className={styles.footer}>
          <div className={styles.footerContent}>
            <div className={styles.footerTopRow}>
              <div className={styles.footerLeft}>
                <img src={logo} alt="TERASYS" className={styles.footerLogo} />
                <p className={styles.footerSlogan}>진화하는 미래, 진화하는 기업</p>
              </div>
              
              <div className={styles.footerRight}>
                <div className={styles.footerInfoGrid}>
                  <div className={styles.footerItem}>
                    <span className={styles.footerLabel}>회사명</span>
                    <span className={styles.footerValue}>(주)테라시스</span>
                  </div>
                  <div className={styles.footerItem}>
                    <span className={styles.footerLabel}>대표이사</span>
                    <span className={styles.footerValue}>김경민</span>
                  </div>
                  <div className={styles.footerItem}>
                    <span className={styles.footerLabel}>설립일</span>
                    <span className={styles.footerValue}>2010년 05월 13일</span>
                  </div>
                  <div className={styles.footerItem}>
                    <span className={styles.footerLabel}>대표전화</span>
                    <span className={styles.footerValue}>02-517-4706</span>
                  </div>
                  <div className={styles.footerItem}>
                    <span className={styles.footerLabel}>팩스</span>
                    <span className={styles.footerValue}>0303-0945-4706</span>
                  </div>
                  <div className={styles.footerItem}>
                    <span className={styles.footerLabel}>소재지</span>
                    <span className={styles.footerValue}>서울특별시 영등포구 의사당대로1길 34(인영빌딩 301호)</span>
                  </div>
                </div>
              </div>
            </div>

            <p className={styles.copyright}>&copy; 2010-2026 TERASYS Co., Ltd. All rights reserved.</p>
          </div>
        </footer>
      </div>

      {/* Right Side Indicator */}
      <div className={styles.indicator}>
        {[0, 1, 2, 3, 4].map((index) => (
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