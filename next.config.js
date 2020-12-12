module.exports = {
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: '/api/:path*',
      },
    ];
  },
};

module.exports = {
  i18n: {
    locales: ['en', 'nl'],
    defaultLocale: 'en',
  },
};
