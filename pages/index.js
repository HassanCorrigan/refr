import { useState } from 'react';
import Layout from '../components/layout.js';
import validate from '../utils/validator.js';
import styles from '../styles/index.module.css';

const Index = () => {
  const [url, setUrl] = useState('');
  const [shortCode, setShortCode] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.persist();

    setLoading(true);

    const url = e.target.url.value;
    const short_code = e.target.short_code.value;

    // Validate client input
    const isValid = await validate(url, short_code);

    if (isValid) {
      fetch('/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url, short_code }),
      })
        .then((res) => {
          if (res.status === 200) {
            clearForm(e);
          }
          return res.json();
        })
        .then((data) => {
          setUrl(data.url);
          setShortCode(data.shortCode);
          setMessage(data.message);
          setLoading(false);
        })
        .catch((error) => console.log(error));
    } else {
      setUrl(url);
      setShortCode(short_code);
      setMessage('Please enter a valid URL');
      setLoading(false);
    }
  };

  const clearForm = (e) => {
    e.target.url.value = '';
    e.target.short_code.value = '';
  };

  return (
    <Layout>
      <section>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input className={styles.url} type="url" name="url" placeholder="https://www.example.com" required />
          <span>{process.env.NEXT_PUBLIC_WEBSITE_URL}/</span>
          <input className={styles.shortcode} type="text" name="short_code" placeholder="my-short-code" />
          <input className={styles.button} type="submit" value="Create Link" />
        </form>

        {loading && <p>Loading...</p>}
        {message && (
          <div>
            <p>{message}</p>
            <p>{url}</p>
            <p>
              {process.env.NEXT_PUBLIC_WEBSITE_URL}/{shortCode}
            </p>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Index;
