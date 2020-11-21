import styles from '../styles/header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <a href="/">
        <h1>
          <span className={styles.logo}>Refr</span>.xyz
      </h1>
      </a>
    </header>
  );
};

export default Header;
