export type Icon = {
  url: string;
  icon: string;
};

export type FooterLink = {
  url: string;
  name: string;
}

export const icons: Icon[] = [
  {
    url: 'https://www.facebook.com/',
    icon: 'la-facebook text-[#8f79ed]',
  },
  {
    url: 'https://www.twitter.com/',
    icon: 'la-twitter text-[#79c8ed]',
  },
  {
    url: 'https://www.instagram.com/',
    icon: 'la-instagram text-[#dd6d9a]',
  },
  {
    url: 'https://www.youtube.com/',
    icon: 'la-youtube text-[#e66262]',
  },
];

export const footerLinks: FooterLink[] = [
  {
    url: '',
    name: 'Terms of Use',
  },
  {
    url: '',
    name: 'Privacy Policy',
  }
];
