import styles from '../styles/header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <h1>
        <span className={styles.logo}>Refr</span>.xyz
      </h1>
    </header>
  );
};

export default Header;
