export interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export const projectCategories = ['All', 'AI / ML', 'Full Stack', 'Creative Dev', 'Productivity'];

export const projects: Project[] = [
  {
    id: '1',
    title: 'Recover-AI',
    description: 'AI-powered FinTech platform that analyzes failed Razorpay payments, recommends safe recovery actions, and tracks actual recovered revenue.',
    thumbnail: '/projects/recoverai.png',
    technologies: [
      'Next.js',
      'React',
      'TypeScript',
      'Node.js',
      'Express.js',
      'Python',
      'FastAPI',
      'PostgreSQL',
      'Prisma',
      'Scikit-learn',
      'Razorpay API',
      'Docker'
    ],
    githubUrl: 'https://github.com/pankajkashp/RecoverAI',
    liveUrl: ''
  },
  {
    id: '2',
    title: 'CodeSage',
    description: 'AI-powered intelligent code review platform with real-time analysis and optimization suggestions.',
    thumbnail: '/projects/code.png',
    technologies: [
      'Next.js',
      'TypeScript',
      'TailwindCSS',
      'Gemini API',
      'Node.js',
      'Supabase',
      'Framer Motion'
    ],
    githubUrl: 'https://github.com/pankajkashp/CodeReview',
    liveUrl: 'https://codesage.tech'
  },

  {
    id: '3',
    title: 'MemoryFlix',
    description: 'A modern storytelling platform where users can create, manage, and experience personalized stories.',
    thumbnail: '/projects/memory1.png',
    technologies: [
      'Next.js',
      'TypeScript',
      'React',
      'Tailwind CSS',
      'Prisma',
      'PostgreSQL',
      'NextAuth.js',
      'Zod'
    ],
    githubUrl: 'https://github.com/pankajkashp/memoryflix.git',
    liveUrl: ''
  },
  {
    id: '4',
    title: 'Smart Kirana Store',
    description: 'Modern AI-powered kirana store management and ecommerce platform for local businesses.',
    thumbnail: '/projects/kirana.png',
    technologies: [
      'Next.js',
      'React',
      'TailwindCSS',
      'Node.js',
      'MongoDB',
      'Firebase',
      'WhatsApp API',
      'Framer Motion'
    ],
    githubUrl: 'https://github.com/pankajkashp/kirana-store',
    liveUrl: 'https://smartkirana.vercel.app'
  },
  {
    id: '5',
    title: 'Cocktail',
    description: 'An immersive cocktail website focused on rich visual design, smooth interactions, and cinematic GSAP animations.',
    thumbnail: '/projects/cocktail.png',
    technologies: [
      'React',
      'JavaScript',
      'GSAP',
      'ScrollTrigger',
      'SplitText',
      'CSS'
    ],
    githubUrl: 'https://github.com/pankajkashp/cocktail.git',
    liveUrl: ''
  },
  {
    id: '6',
    title: 'FocusZen',
    description: 'A daily focus operating system designed to turn tasks into a realistic day and help users stay focused.',
    thumbnail: '/projects/f2.png',
    technologies: [
      'Vite',
      'TypeScript',
      'React',
      'Tailwind CSS',
      'LocalStorage'
    ],
    githubUrl: 'https://github.com/pankajkashp/focuszen',
    liveUrl: ''
  }
];
