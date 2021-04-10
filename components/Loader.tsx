import styles from '../styles/loader.module.css';

const Loader = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.busyLoader}>
        <div className={`${styles.box} ${styles.boxOne}`}></div>
        <div className={`${styles.box} ${styles.boxTwo}`}></div>
        <div className={`${styles.box} ${styles.boxThree}`}></div>
        <div className={`${styles.box} ${styles.boxFour}`}></div>
      </div>
    </div>
  );
};

export default Loader;
