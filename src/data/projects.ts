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
    liveUrl: 'https://code.tech',
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
  }
];
