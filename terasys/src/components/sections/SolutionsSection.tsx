import { Link } from 'react-router-dom';
import styles from './SolutionsSection.module.css';
import logpressoLogo from '../../assets/logo/logpresso_logo.PNG';
import hitachiLogo from '../../assets/logo/hitachi_logo.PNG';

const SolutionsSection = () => {
  return (
    <section className={styles.section} id="solutions">
      <div className={styles.solutionsContent}>
        <div className={styles.solutionsHeader}>
          <h1 className={styles.solutionsTitle}>SOLUTIONS</h1>
          <p className={styles.solutionsSubtitle}>
            테라시스는 검증된 글로벌 솔루션과 앞선 기술력으로 최적의 비즈니스 인프라를 구축합니다.
          </p>
        </div>
        <div className={styles.solutionsGrid}>
          <Link to="/logpresso" className={styles.solutionCard}>
            <div className={styles.solutionLogoWrapper}>
              <img src={logpressoLogo} alt="LOGPRESSO" className={styles.solutionLogo} />
            </div>
            <p>보안 오케스트레이션 및 자동화 솔루션</p>
            <div className={styles.solutionMore}>Learn More →</div>
          </Link>

          <Link to="/hitachi-vantara" className={styles.solutionCard}>
            <div className={styles.solutionLogoWrapper}>
              <img src={hitachiLogo} alt="HITACHI VANTARA" className={styles.solutionLogo} />
            </div>
            <p>엔터프라이즈급 스토리지 솔루션</p>
            <div className={styles.solutionMore}>Learn More →</div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;