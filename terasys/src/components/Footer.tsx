import styles from './Footer.module.css';
import logo from '../assets/logo/terasys_logo.png';

const Footer = () => {
  return (
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
  );
};

export default Footer;