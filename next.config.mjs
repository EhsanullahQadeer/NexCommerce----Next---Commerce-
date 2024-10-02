import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['alertifyhub.com'],
    },
     reactStrictMode: false,
    // i18n: {
    //   defaultLocale: 'en',
    //   locales: ['tr', 'en'],
    //   localeDetection: true
    // }
};

export default withNextIntl(nextConfig);
