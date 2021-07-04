import packageJson from 'package.json';
import styles from 'styles/footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>Refr - v{packageJson.version}</p>
      <span>
        <a
          href='https://github.com/HassanCorrigan/refr'
          target='_blank'
          rel='noopener noreferrer'>
          GitHub
        </a>{' '}
        |{' '}
        <a
          href='https://hassancorrigan.com'
          target='_blank'
          rel='noopener noreferrer'>
          Creator
        </a>
      </span>
    </footer>
  );
};

export default Footer;
