import Head from 'next/head';

const Meta = () => {
  return (
    <Head>
      <meta
        name='viewport'
        content='width=device-width, initial-scale=1.0, viewport-fit=cover'
      />
      <meta name='title' content='Refr - link shortener' />
      <meta
        name='description'
        content='A free and simple link shortening service with custom URLs.'
      />
      <meta
        name='keywords'
        content='refr, refr.xyz, link, url, shortener, shortening, service, custom, minimal'
      />

      <meta name='apple-mobile-web-app-cabable' content='yes' />
      <meta name='apple-mobile-web-app-status-bar-style' content='default' />

      <meta property='og:type' content='website' />
      <meta property='og:url' content='https://refr.xyz/' />
      <meta property='og:title' content='Refr - link shortener' />
      <meta
        property='og:description'
        content='A free and simple link shortening service with custom URLs.'
      />
      <meta
        property='og:image'
        content='https://refr.xyz/img/opengraph-twitter-card.jpg'
      />

      <meta property='twitter:card' content='summary_large_image' />
      <meta property='twitter:url' content='https://refr.xyz/' />
      <meta property='twitter:title' content='Refr - link shortener' />
      <meta
        property='twitter:description'
        content='A free and simple link shortening service with custom URLs.'
      />
      <meta
        property='twitter:image'
        content='https://refr.xyz/img/opengraph-twitter-card.jpg'
      />

      <title>Refr - link shortener</title>
    </Head>
  );
};

export default Meta;
