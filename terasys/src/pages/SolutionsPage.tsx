import { Link } from 'react-router-dom';
import styles from './SolutionsPage.module.css';

const SolutionsPage = () => {
  return (
    <div className={styles.section}>
      <h1 className={styles.title}>Solutions</h1>
      
      <div className={styles.cardContainer}>
        <Link to="/hitachi-vantara" className={styles.card}>
          <h2 className={styles.cardTitle}>HITACHI VANTARA</h2>
          <p className={styles.cardDesc}>
            데이터 인프라 및 하이브리드 클라우드 관리 솔루션을 통해<br/>
            비즈니스 혁신을 가속화합니다.
          </p>
          <span className={styles.cardLink}>Explore Solution →</span>
        </Link>

        <Link to="/logpresso" className={styles.card}>
          <h2 className={styles.cardTitle}>Logpresso</h2>
          <p className={styles.cardDesc}>
            AI 기반 보안 운영(SIEM/SOAR) 플랫폼으로<br/>
            지능형 위협에 신속하게 대응합니다.
          </p>
          <span className={styles.cardLink}>Explore Solution →</span>
        </Link>
      </div>
    </div>
  );
};

export default SolutionsPage;