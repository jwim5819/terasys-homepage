import React, { useState, useMemo } from 'react';
import styles from './AllClients.module.css';

// Dynamically load all logos
const clientLogos = import.meta.glob('../../assets/clients/**/*.{png,jpg,jpeg,PNG,JPG,JPEG,svg}', {
  eager: true,
  query: '?url',
  import: 'default',
});

const AllClients: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'infra' | 'siem'>('infra');

  // Enable scroll on subpage
  React.useEffect(() => {
    document.body.style.overflow = 'auto';
    return () => {
      document.body.style.overflow = 'hidden';
    };
  }, []);

  // Categorize logos by path
  const categorizedLogos = useMemo(() => {
    const categories = {
      finance: [] as string[],
      enterprise: [] as string[],
      government: [] as string[],
      siemSoar: [] as string[]
    };

    Object.entries(clientLogos).forEach(([path, url]) => {
      const logoUrl = url as string;
      if (path.includes('/infra/finance/')) categories.finance.push(logoUrl);
      else if (path.includes('/infra/enterprise/')) categories.enterprise.push(logoUrl);
      else if (path.includes('/infra/government/')) categories.government.push(logoUrl);
      else if (path.includes('/siem_soar/')) categories.siemSoar.push(logoUrl);
    });

    return categories;
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.tabWrapper}>
        <button 
          className={`${styles.tab} ${activeTab === 'infra' ? styles.active : ''}`}
          onClick={() => setActiveTab('infra')}
        >
          인프라 구축
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'siem' ? styles.active : ''}`}
          onClick={() => setActiveTab('siem')}
        >
          SIEM&SOAR 구축
        </button>
      </div>

      <div className={styles.content}>
        {activeTab === 'infra' ? (
          <div className={styles.infraContent}>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>금융</h2>
              <div className={styles.logoGrid}>
                {categorizedLogos.finance.map((logo, index) => (
                  <div key={`finance-${index}`} className={styles.logoItem}>
                    <img src={logo} alt={`Finance Client ${index}`} />
                  </div>
                ))}
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>대기업</h2>
              <div className={styles.logoGrid}>
                {categorizedLogos.enterprise.map((logo, index) => (
                  <div key={`enterprise-${index}`} className={styles.logoItem}>
                    <img src={logo} alt={`Enterprise Client ${index}`} />
                  </div>
                ))}
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>관공서</h2>
              <div className={styles.logoGrid}>
                {categorizedLogos.government.map((logo, index) => (
                  <div key={`government-${index}`} className={styles.logoItem}>
                    <img src={logo} alt={`Government Client ${index}`} />
                  </div>
                ))}
              </div>
            </section>
          </div>
        ) : (
          <div className={styles.siemContent}>
            <div className={styles.logoGrid}>
              {categorizedLogos.siemSoar.map((logo, index) => (
                <div key={`siem-${index}`} className={styles.logoItem}>
                  <img src={logo} alt={`SIEM SOAR Client ${index}`} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllClients;