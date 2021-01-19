module.exports = {
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: '/api/:path*',
      },
    ];
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
};
