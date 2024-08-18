export type Icon = {
  url: string;
  icon: string;
  name: string;
};

export type FooterLink = {
  url: string;
  name: string;
};

export const icons: Icon[] = [
  {
    url: 'https://www.facebook.com/',
    icon: 'la-facebook text-[#8f79ed]',
    name: 'Twitter',
  },
  {
    url: 'https://www.twitter.com/',
    icon: 'la-twitter text-[#79c8ed]',
    name: 'Twitter',
  },
  {
    url: 'https://www.instagram.com/',
    icon: 'la-instagram text-[#dd6d9a]',
    name: 'Twitter',
  },
  {
    url: 'https://www.youtube.com/',
    icon: 'la-youtube text-[#e66262]',
    name: 'Twitter',
  },
];

export const footerCopyrightLinks: FooterLink[] = [
  {
    url: '',
    name: 'Terms of Use',
  },
  {
    url: '',
    name: 'Privacy Policy',
  },
];

export const footerlinks: { category: string; links: FooterLink[] }[] = [
  {
    category: 'Useful Links',
    links: [
      {
        url: '',
        name: 'About Molla',
      },
      {
        url: '',
        name: 'How to shop on Molla',
      },
      {
        url: '',
        name: 'FAQ',
      },
      {
        url: '',
        name: 'Contact us',
      },
      {
        url: '',
        name: 'Log in',
      },
    ],
  },
  {
    category: 'Customer Service',
    links: [
      {
        url: '',
        name: 'Payment Methods',
      },
      {
        url: '',
        name: 'Money-back guarantee!',
      },
      {
        url: '',
        name: 'Returns',
      },
      {
        url: '',
        name: 'Shipping',
      },
      {
        url: '',
        name: 'Terms and Conditions',
      },
      {
        url: '',
        name: 'Privacy Policy',
      },
    ],
  },
  {
    category: 'My Account',
    links: [
      {
        url: '/auth',
        name: 'Sign in',
      },
      {
        url: '/cart',
        name: 'View Cart!',
      },
      {
        url: '/whishlist',
        name: 'My Wishlist',
      },
      {
        url: '',
        name: 'Track My Order',
      },
      {
        url: '',
        name: 'Help',
      },
    ],
  },
];
