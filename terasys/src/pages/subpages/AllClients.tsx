import React, { useState } from 'react';
import styles from './AllClients.module.css';

const AllClients: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'infra' | 'siem'>('infra');

  return (
    <div className={styles.container}>
      <div className={styles.tabWrapper}>
        <div 
          className={`${styles.tab} ${activeTab === 'infra' ? styles.active : ''}`}
          onClick={() => setActiveTab('infra')}
        >
          인프라 구축
        </div>
        <div 
          className={`${styles.tab} ${activeTab === 'siem' ? styles.active : ''}`}
          onClick={() => setActiveTab('siem')}
        >
          SIEM&SOAR 구축
        </div>
      </div>

      <div className={styles.content}>
        {activeTab === 'infra' ? (
          <div>
            {/* 인프라 구축 콘텐츠 공간 */}
          </div>
        ) : (
          <div className={styles.siemContent}>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>금융</h2>
              <div className={styles.logoGrid}>
                {/* 금융 고객사 로고 자리 */}
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>대기업</h2>
              <div className={styles.logoGrid}>
                {/* 대기업 고객사 로고 자리 */}
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>관공서</h2>
              <div className={styles.logoGrid}>
                {/* 관공서 고객사 로고 자리 */}
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>대학교</h2>
              <div className={styles.logoGrid}>
                {/* 대학교 고객사 로고 자리 */}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllClients;