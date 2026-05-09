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
}

export const projectCategories = ['All', 'AI / ML', 'Full Stack', 'Creative Dev', 'Automation'];

export const projects: Project[] = [
  {
    id: '1',
    title: 'NEURAL NEXUS',
    description: 'Autonomous AI agents for distributed systems with real-time decision pipelines.',
    longDescription: 'Neural Nexus is a decentralized platform for deploying autonomous AI agents that collaborate on complex computational tasks. It features a custom inference engine built in Rust for sub-millisecond response times, and a Python orchestration layer for dynamic task routing.',
    thumbnail: '/projects/nexus.jpg',
    galleryImages: ['/projects/nexus-1.jpg', '/projects/nexus-2.jpg'],
    technologies: ['Python', 'PyTorch', 'Rust', 'Docker', 'Redis'],
    category: 'AI / ML',
    githubUrl: 'https://github.com/pankajkashap/neural-nexus',
    liveUrl: 'https://nexus.pankaj.ai',
    isFeatured: true,
    completionDate: '2025-03',
    status: 'Completed'
  },
  {
    id: '2',
    title: 'PUMPCORE',
    description: 'Real-time IoT fuel management and forecourt monitoring platform.',
    longDescription: 'An industrial-grade fuel station monitoring system featuring live pump telemetry, automated dispensing analytics, and predictive maintenance alerts. Built as a touchscreen-optimized React dashboard with a Node.js backend processing sensor data in real-time.',
    thumbnail: '/projects/pumpcore.jpg',
    galleryImages: ['/projects/pumpcore-1.jpg'],
    technologies: ['React', 'Node.js', 'Zustand', 'PostgreSQL', 'MQTT'],
    category: 'Full Stack',
    githubUrl: 'https://github.com/pankajkashap/pumpcore',
    isFeatured: true,
    completionDate: '2025-05',
    status: 'In Progress'
  },
  {
    id: '3',
    title: 'CODE INTEGRITY ENGINE',
    description: 'AI-powered code analysis platform with Gemini integration.',
    longDescription: 'A real-time code review engine that leverages Google Gemini to perform deep structural analysis, detect vulnerabilities, and suggest performance optimizations. Features a side-by-side diff viewer and multi-language support.',
    thumbnail: '/projects/coderev.jpg',
    galleryImages: ['/projects/coderev-1.jpg'],
    technologies: ['React', 'Vite', 'Supabase', 'Gemini API', 'Node.js'],
    category: 'AI / ML',
    githubUrl: 'https://github.com/pankajkashap/code-integrity',
    liveUrl: 'https://coderev.pankaj.ai',
    isFeatured: true,
    completionDate: '2025-04',
    status: 'Completed'
  },
  {
    id: '4',
    title: 'QUANTUM VISUALS',
    description: 'Cinematic WebGL data visualization engine with custom shaders.',
    longDescription: 'A high-performance rendering engine for visualizing multidimensional datasets with real-time particle systems, volumetric lighting, and custom GLSL shaders. Designed for interactive storytelling with data.',
    thumbnail: '/projects/quantum.jpg',
    galleryImages: ['/projects/quantum-1.jpg'],
    technologies: ['TypeScript', 'Three.js', 'GLSL', 'Next.js', 'R3F'],
    category: 'Creative Dev',
    githubUrl: 'https://github.com/pankajkashap/quantum-visuals',
    isFeatured: false,
    completionDate: '2024-11',
    status: 'Completed'
  },
  {
    id: '5',
    title: 'AUTOFLOW PIPELINE',
    description: 'CI/CD automation framework with intelligent deployment routing.',
    longDescription: 'An AI-augmented deployment pipeline that predicts build failures, auto-scales infrastructure, and routes deployments based on traffic patterns. Integrates with GitHub Actions, Docker, and Kubernetes.',
    thumbnail: '/projects/autoflow.jpg',
    galleryImages: [],
    technologies: ['Python', 'Docker', 'K8s', 'GitHub Actions', 'Terraform'],
    category: 'Automation',
    githubUrl: 'https://github.com/pankajkashap/autoflow',
    isFeatured: false,
    completionDate: '2024-08',
    status: 'Completed'
  },
  {
    id: '6',
    title: 'SENTIENT CHAT',
    description: 'Multi-modal AI chat interface with emotion-aware responses.',
    longDescription: 'A next-generation conversational AI platform supporting text, image, and voice modalities. Features real-time sentiment analysis and adaptive response styling for personalized user interactions.',
    thumbnail: '/projects/sentient.jpg',
    galleryImages: [],
    technologies: ['Next.js', 'OpenAI API', 'WebSockets', 'TailwindCSS'],
    category: 'AI / ML',
    githubUrl: 'https://github.com/pankajkashap/sentient-chat',
    isFeatured: false,
    completionDate: '2024-06',
    status: 'Completed'
  }
];
