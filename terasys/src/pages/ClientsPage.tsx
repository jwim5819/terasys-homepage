import styles from './ClientsPage.module.css';
import ClientsSection from '../components/sections/ClientsSection';

const ClientsPage = () => {
  return (
    <div className={styles.pageWrapper}>
      <ClientsSection />
    </div>
  );
};

export default ClientsPage;