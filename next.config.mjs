import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['alertifyhub.com'],
    },
    i18n: {
      defaultLocale: 'EN',
      locales: ['TR', 'EN'],
      localeDetection: true
    }
};

export default withNextIntl(nextConfig);
