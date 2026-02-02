import styles from './ServicesPage.module.css';

const ServicesPage = () => {
  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <h1 className={styles.title}>Services</h1>
        <p className={styles.description}>
          테라시스가 제공하는 전문적인 보안 서비스 및 비즈니스 영역을 소개합니다.
        </p>
      </div>
    </div>
  );
};

export default ServicesPage;