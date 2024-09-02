export type LinkType = {
  url: string;
  name: string;
  icon?: string;
}

export const currencies = [
  {
    id: 'usd',
    name: 'USD',
    value: 'USD'
  },
  {
    id: 'eur',
    name: 'EUR',
    value: 'EUR',
  }
]

export const langauges = [
  {
    id: 'eng',
    name: 'English',
    value: 'Eng'
  },
  {
    id: 'fre',
    name: 'French',
    value: 'Fre'
  },
  {
    id: 'spa',
    name: 'Spanish',
    value: 'Spa',
  }
];

export const topBarLinks: LinkType[] = [
  {
    url: '/about-us',
    name: 'About Us',
  },
  {
    url: '/contact',
    name: 'Contact Us',
  },
  {
    url: '/auth',
    name: 'login',
    icon: 'lar la-user'
  }
]
