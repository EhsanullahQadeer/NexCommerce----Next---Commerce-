import { Blog, BlogCategory } from '@/types/blog';

export const Blogs: Blog[] = [
    {
        id: '1',
        title: 'Cras ornare tristique elit.',
        description: 'Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh.',
        src: '/categories/post-1.jpg',
        categories: ['lifestyle', 'shopping'],
        publishedAt: `2018-11-22`,
    },
    {
        id: '2',
        title: 'Vivamus vestibulum ntulla necante.',
        description: 'Morbi purus libero, faucibus commodo quis, gravida id, est. Vestibulumvo lutpat, lacus a ultrices sagittis',
        src: '/categories/post-1.jpg',
        categories: ['lifestyle'],
        publishedAt: `2018-11-21`,
    },
    {
        id: '3',
        title: 'Utaliquam sollicitudin leo.',
        description: 'Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh ...',
        src: '/categories/post-1.jpg',
        categories: ['fashion', 'lifestyle'],
        publishedAt: `2018-11-18`,
    },
    {
        id: '4',
        title: 'Fusce pellentesque suscipit.',
        description: 'Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh ...',
        src: '/categories/post-1.jpg',
        categories: ['travel'],
        publishedAt: `2018-11-15`,
    },
    {
        id: '5',
        title: 'Aenean dignissim pellente squefelis.',
        description: 'Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh ...',
        src: '/categories/post-1.jpg',
        categories: ['travel', 'hobbies'],
        publishedAt: `2018-11-18`,
    },
    {
        id: '6',
        title: 'Utaliquam sollicitudin leo.',
        description: 'Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh ...',
        src: '/categories/post-1.jpg',
        categories: ['hobbies'],
        publishedAt: `2018-11-18`,
    },
    {
        id: '7',
        title: 'Utaliquam sollicitudin leo.',
        description: 'Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh ...',
        src: '/categories/post-1.jpg',
        categories: ['travel'],
        publishedAt: `2018-11-18`,
    },
    {
        id: '8',
        title: 'Utaliquam sollicitudin leo.',
        description: 'Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh ...',
        src: '/categories/post-1.jpg',
        categories: ['fashion'],
        publishedAt: `2018-11-18`,
    },
];

export const categoryFiltersResults: BlogCategory[] = [
    { key: "*", label: 'All Blogs Post', count: 8 },
    { key: 'lifestyle', label: 'Lifestyle', count: 3 },
    { key: 'shopping', label: 'Shopping', count: 1 },
    { key: 'fashion', label: 'Fashion', count: 2 },
    { key: 'travel', label: 'Travel', count: 3 },
    { key: 'hobbies', label: 'Hobbies', count: 2 },
];

