import { useState } from 'react';
import { checkForUrlConflicts, checkForMaliciousURL } from 'utils/url';
import validate from 'utils/validator';
import Layout from 'components/Layout';
import styles from 'styles/index.module.css';

import type React from 'react';

const Index = () => {
  const [shortCode, setShortCode] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.persist();

    setLoading(true);

    const url: string = e.target.url.value;
    const short_code: string = e.target.short_code.value;

    // Validate client input
    const valid: boolean | void = await validate(url, short_code);
    if (!valid) {
      setMessage('Please enter a valid URL');
      setShortCode('');
      setLoading(false);
      return;
    }

    // Return error if URLs match
    const conflicts: boolean = await checkForUrlConflicts(url);
    if (conflicts) {
      setMessage(
        "We couldn't create your shortlink: You aren't allowed to create a redirect to this website."
      );
      setShortCode('');
      setLoading(false);
      return;
    }

    // Return error if URLs is malicious
    const malicious: boolean | undefined = await checkForMaliciousURL(url);
    if (malicious) {
      setMessage(
        "We couldn't create your shortlink: The link you provided is untrusted and may contain malware."
      );
      setShortCode('');
      setLoading(false);
      return;
    }

    createLink(url, short_code, e);
  };

  /**
   *
   * @param {string} url - the url to shorten
   * @param {string} short_code the user-selected short-code
   * @param {event} e
   */
  const createLink = async (
    url: string,
    short_code: string,
    e: React.ChangeEvent<HTMLFormElement>
  ): Promise<void> => {
    try {
      const res = await fetch('/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url, short_code }),
      });
      const data = await res.json();

      if (res.status === 200) {
        setMessage(data.message);
        setShortCode(data.shortCode);
        clearForm(e);
      } else {
        setMessage(data.message);
        setShortCode('');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Clears the form after a successful submit
   * @param {event} e
   */
  const clearForm = (e: React.ChangeEvent<HTMLFormElement>): void => {
    e.target.url.value = '';
    e.target.short_code.value = '';
  };

  /**
   * Copys the new short-link to the clipboard
   * @param {event} e
   */
  const handleCopy = (e: React.MouseEvent<HTMLImageElement>): void => {
    const link: string = `${
      process.env.NEXT_PUBLIC_WEBSITE_URL
    }/${shortCode.toString()}`;

    navigator.clipboard.writeText(link);
    (e.target as HTMLImageElement).src = '/img/copy-success.svg';

    setTimeout(() => {
      (e.target as HTMLImageElement).src = '/img/copy-glyph.svg';
    }, 5000);
  };

  return (
    <Layout>
      <section className={styles.landing}>
        <p className={styles.bigText}>
          Keep it <b>short</b>. Keep it <b>simple</b>.
        </p>
        <p className={styles.bigText}>
          <span className={styles.brand}>
            <b>Refr.xyz </b>
          </span>
          a free link shortening service.
        </p>
      </section>
      <section className={styles.shortener}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            className={styles.url}
            type='url'
            name='url'
            aria-label='URL'
            placeholder='https://www.example.com'
            required
          />
          <span>{process.env.NEXT_PUBLIC_WEBSITE_URL}/</span>
          <input
            className={styles.shortcode}
            type='text'
            name='short_code'
            aria-label='Short Code'
            placeholder='short-code'
          />
          <input className={styles.button} type='submit' value='Shorten It' />
        </form>

        {loading && (
          <div className={styles.loading}>
            <p>Creating Link...</p>
          </div>
        )}

        <div className={styles.linkDetails}>
          {shortCode && (
            <img
              src='img/copy-glyph.svg'
              onClick={handleCopy}
              title='Copy to clipboard'
            />
          )}
          {message && <p>{message}</p>}
          {shortCode && (
            <p>
              Your new shortlink:{' '}
              <b>
                <a href={`${process.env.NEXT_PUBLIC_WEBSITE_URL}/${shortCode}`}>
                  {process.env.NEXT_PUBLIC_WEBSITE_URL}/{shortCode}
                </a>
              </b>
            </p>
          )}
        </div>
      </section>
      <section className={styles.shortcuts}>
        <p>
          Add the shortcut to iOS to generate short links from the share menu.
        </p>
        <div>
          <a
            className={styles.iconLink}
            href='https://www.icloud.com/shortcuts/f9d6fe3a35df4272a7253900bd75e779'
            target='_blank'
            rel='noopener noreferrer'>
            <img src='/img/ios-shortcuts.png' alt='Apple shortcuts app icon' />
            <p>Add the iOS shortcut</p>
          </a>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
