import { Link } from 'react-router-dom';
import styles from './AboutPage.module.css';
import AboutSection from '../components/sections/AboutSection';

const AboutPage = () => {
  return (
    <div className={styles.pageWrapper}>
      {/* Reused About Section */}
      <AboutSection />

      {/* Sub Navigation */}
      <div className={styles.subPageNav}>
        <Link to="/ethical-management" className={styles.navCard}>
          <span className={styles.navTitle}>윤리경영</span>
          <p className={styles.navDesc}>테라시스의 투명하고 공정한 윤리경영 철학을 소개합니다.</p>
          <span className={styles.navArrow}>자세히 보기 →</span>
        </Link>
        <Link to="/major-news" className={styles.navCard}>
          <span className={styles.navTitle}>주요뉴스</span>
          <p className={styles.navDesc}>테라시스의 새로운 소식과 보도자료를 확인하세요.</p>
          <span className={styles.navArrow}>자세히 보기 →</span>
        </Link>
        <Link to="/community" className={styles.navCard}>
          <span className={styles.navTitle}>커뮤니티</span>
          <p className={styles.navDesc}>고객과 함께 소통하며 성장하는 공간입니다.</p>
          <span className={styles.navArrow}>자세히 보기 →</span>
        </Link>
      </div>
    </div>
  );
};

export default AboutPage;