import { personalInfo } from '@/data/personal';

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export const socials: SocialLink[] = [
  { name: 'GitHub', url: 'https://github.com/pankajkashp', icon: 'Github' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/pankajkashp/', icon: 'Linkedin' },
  { name: 'Leetcode', url: 'https://leetcode.com/u/pankajkashp26/', icon: 'Leetcode' },
  { name: 'Instagram', url: 'https://www.instagram.com/pankajkashp/', icon: 'Instagram' },
];

/**
 * Centralized profile and contact links for the portfolio statistics cards.
 * If any URL needs to be updated, edit the values below.
 */
export const portfolioLinks = {
  linkedIn: 'https://www.linkedin.com/in/pankajkashp/',
  github: 'https://github.com/pankajkashp',
  leetcode: 'https://leetcode.com/u/pankajkashp26/',
  email: personalInfo.email || 'pankajkashap26@gmail.com',
};

