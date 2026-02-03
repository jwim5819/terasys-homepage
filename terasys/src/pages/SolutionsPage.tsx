import styles from './SolutionsPage.module.css';
import SolutionsSection from '../components/sections/SolutionsSection';

const SolutionsPage = () => {
  return (
    <div className={styles.pageWrapper}>
      <SolutionsSection />
      {/* Additional content can go here */}
    </div>
  );
};

export default SolutionsPage;