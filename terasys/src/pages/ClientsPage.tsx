import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ClientsPage.module.css';

// Dynamically load client logos (only from siem_soar)
const clientLogoModules = import.meta.glob('../assets/clients/siem_soar/*.{png,jpg,jpeg,PNG,JPG,JPEG,svg}', {
  eager: true,
  query: '?url',
  import: 'default',
});
const allClientLogos = Object.values(clientLogoModules) as string[];

const ClientsPage = () => {
  const navigate = useNavigate();

  const { topRowLogos, bottomRowLogos } = useMemo(() => {
    const half = Math.ceil(allClientLogos.length / 2);
    // Double the arrays for a seamless infinite loop
    return {
      topRowLogos: [...allClientLogos.slice(0, half), ...allClientLogos.slice(0, half)],
      bottomRowLogos: [...allClientLogos.slice(half), ...allClientLogos.slice(half)],
    };
  }, []);

  return (
    <div className={styles.section}>
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
    </div>
  );
};

export default ClientsPage;