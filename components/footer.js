import styles from '../styles/footer.module.css';
import packageJSON from '../package.json';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>Link Shortener - v{packageJSON.version}</p>
    </footer>
  );
};

export default Footer;
