interface AboutStat {
  label: string;
  value: string;
}

interface PersonalInfo {
  name: string;
  fullName: string;
  role: string;
  location: string;
  email: string;
  resumeUrl: string;
  about: {
    short: string;
    long: string;
    stats: AboutStat[];
    achievements: string[];
  };
  hero: {
    title: string;
    subtitle: string;
    ctaText: string;
    secondaryCtaText: string;
  };
  focus: string[];
}

export const personalInfo: PersonalInfo = {
  name: 'Pankaj Kashyap',
  fullName: 'Pankaj Kashyap',
  role: 'AI Engineer + Full Stack Developer + Creative Developer',
  location: 'India',
  email: 'pankajkashap26@gmail.com',
  resumeUrl: '/resume.pdf',
  about: {
    short: 'Passionate about building intelligent digital experiences using AI, full stack development, and modern web technologies.',
    long: 'Hi, I’m Pankaj Kashap — a Computer Science student specializing in Artificial Intelligence with a strong interest in full stack development, modern UI/UX experiences, and intelligent systems. I enjoy building real-world projects that combine creativity with technology, ranging from AI-powered applications and automation tools to IoT dashboards and interactive web platforms.\n\nI’m constantly exploring new technologies, improving my development skills, and working on projects that solve practical problems while delivering clean and engaging user experiences. My focus is on building scalable, modern, and impactful digital products using technologies like React, Next.js, Node.js, AI APIs, and cloud-based tools.',
    stats: [],
    achievements: [
      'Building AI-powered applications and intelligent automation systems',
      'Developing modern full stack web platforms with responsive UI/UX',
      'Exploring IoT-based monitoring and real-time dashboard systems',
      'Focused on learning scalable software architecture and modern technologies'
    ]
  },
  hero: {
    title: 'Building Intelligent Digital Experiences.',
    subtitle: 'AI & Full Stack Developer passionate about creating modern, scalable, and interactive web applications.',
    ctaText: 'Connect With Me',
    secondaryCtaText: 'View Projects',
  },
  focus: [
    'Artificial Intelligence',
    'Full Stack Development',
    'Modern Web Applications',
    'Automation Systems',
    'Interactive UI/UX'
  ],
};
