export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  thumbnail: string;
  galleryImages: string[];
  technologies: string[];
  category: string;
  githubUrl?: string;
  liveUrl?: string;
  isFeatured: boolean;
  completionDate: string;
  status: 'Completed' | 'In Progress' | 'Maintenance';
  iconName: string;
}

export const projectCategories = ['All', 'AI / ML', 'Full Stack', 'Creative Dev', 'Automation'];

export const projects: Project[] = [
  {
    id: '1',
    title: 'CodeSage',
    description: 'AI-powered intelligent code review platform with real-time analysis and optimization suggestions.',
    longDescription: 'CodeSage is an advanced AI-driven code review platform designed to analyze source code for vulnerabilities, performance bottlenecks, structural issues, and optimization opportunities. The platform integrates modern LLM APIs to generate intelligent suggestions, explain bugs in simple language, and improve developer productivity. It features syntax highlighting, live analysis, GitHub integration, responsive dashboards, and a premium futuristic UI focused on developer experience.',
    thumbnail: '/projects/code.png',
    galleryImages: [
      '/projects/code1.png',
      '/projects/code2.png',
      '/projects/code3.png'
    ],
    technologies: [
      'Next.js',
      'TypeScript',
      'TailwindCSS',
      'Gemini API',
      'Node.js',
      'Supabase',
      'Framer Motion'
    ],
    category: 'AI / ML',
    githubUrl: 'https://github.com/pankajkashp/CodeReview',
    liveUrl: 'https://codesage.tech',
    isFeatured: true,
    completionDate: '2025-04',
    status: 'Completed',
    iconName: '/projects/codesage.png'
  },

  {
    id: '2',
    title: 'PumpCore IoT',
    description: 'Smart IoT-based fuel station monitoring and automated petrol management platform.',
    longDescription: 'PumpCore IoT is an industrial-grade intelligent fuel station ecosystem built for real-time monitoring, analytics, and automation of petrol pumps and fuel dispensing systems. The platform tracks fuel flow, pump activity, automated pricing, sensor telemetry, dispensing logs, and operational analytics in real-time. It includes a futuristic touchscreen dashboard, AI-assisted monitoring, multi-pump management, and scalable IoT integration for modern fuel stations.',
    thumbnail: '/projects/iot1.png',
    galleryImages: [
      '/projects/iot2.png'
    ],
    technologies: [
      'React',
      'Next.js',
      'Node.js',
      'MQTT',
      'Socket.io',
      'PostgreSQL',
      'IoT Sensors',
      'TailwindCSS'
    ],
    category: 'IoT / Full Stack',
    githubUrl: 'https://github.com/pankajkashp/iot-petrol',
    liveUrl: 'https://pumpcore.vercel.app',
    isFeatured: true,
    completionDate: '2025-06',
    status: 'In Progress',
    iconName: '/projects/logo.svg'
  },


  {
    id: '3',

    title: 'MemoryFlix',

    description:
      'A modern storytelling platform where users can create, manage, and experience personalized stories.',

    longDescription:
      'MemoryFlix is a full-stack storytelling platform built to provide a structured and engaging way to create and manage stories. It features secure user authentication, story creation workflows, reusable story templates, media asset management, and a personalized dashboard. The platform uses a modern Next.js architecture with Prisma and PostgreSQL for reliable data management, while the responsive interface provides a smooth experience across devices.',

    thumbnail: '/projects/memory1.png',

    galleryImages: [
      '/projects/memory1.png',
      '/projects/memory2.png'
    ],

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

    category: 'Full Stack',

    githubUrl: 'https://github.com/pankajkashp/memoryflix.git',

    liveUrl: '',

    isFeatured: true,

    completionDate: '2026-06',

    status: 'Completed',

    iconName: 'Film'
  },

  {
    id: '4',
    title: 'Smart Kirana Store',
    description: 'Modern AI-powered kirana store management and ecommerce platform for local businesses.',
    longDescription: 'Smart Kirana Store is a digital-first retail management platform designed for local grocery and kirana businesses. It combines inventory management, billing, online ordering, analytics, customer management, and WhatsApp automation into a unified modern system. The platform supports real-time stock tracking, responsive storefronts, product categorization, automated order notifications, and scalable admin management for local retail businesses transitioning online.',
    thumbnail: '/projects/kirana.jpg',
    galleryImages: [
      '/projects/kirana-1.jpg',
      '/projects/kirana-2.jpg'
    ],
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
    category: 'Full Stack',
    githubUrl: 'https://github.com/pankajkashp/kirana-store',
    liveUrl: 'https://smartkirana.vercel.app',
    isFeatured: true,
    completionDate: '2025-05',
    status: 'Completed',
    iconName: 'ShoppingBag'
  },
  {
    id: '5',

    title: 'Cocktail',

    description:
      'An immersive cocktail website focused on rich visual design, smooth interactions, and cinematic GSAP animations.',

    longDescription:
      'Cocktail is a modern interactive web experience built to showcase how animation and visual storytelling can transform a traditional website. The project focuses heavily on GSAP-powered animations, including scroll-based interactions, animated typography, image movements, and smooth transitions. Built with React and modern frontend technologies, the website combines carefully designed layouts with dynamic motion to create an engaging and premium browsing experience.',

    thumbnail: '/projects/cocktail.jpg',

    galleryImages: [
      '/projects/cocktail-1.jpg',
      '/projects/cocktail-2.jpg'
    ],

    technologies: [
      'React',
      'JavaScript',
      'GSAP',
      'ScrollTrigger',
      'SplitText',
      'CSS'
    ],

    category: 'Frontend',

    githubUrl: 'https://github.com/pankajkashp/cocktail.git',

    liveUrl: '',

    isFeatured: true,

    completionDate: '2026-08',

    status: 'Completed',

    iconName: 'Wine'
  }
];
