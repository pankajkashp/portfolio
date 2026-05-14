export interface Certification {
  title: string;
  issuer: string;
  year: string;
  description: string;
  id: string;
  image?: string;
  fileUrl?: string;
  verificationUrl?: string;
}

export const certifications: Certification[] = [
  {
    title: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    year: '2024',
    description: 'Cloud computing fundamentals, AWS core services, security concepts, pricing models, and architectural best practices.',
    id: 'AWS-CCP-24',
    verificationUrl: 'https://aws.amazon.com/verification'
  },
  {
    title: 'Palo Alto Networks Cybersecurity Foundation',
    issuer: 'Palo Alto Networks',
    year: '2024',
    description: 'Fundamentals of cybersecurity, network protection, threat prevention, and modern security practices using enterprise-grade security concepts.',
    id: 'PA-CYBER-24',
    fileUrl: '/palo.pdf'
  },
  {
    title: "Developer's Night Workshop",
    issuer: 'Tech Community',
    year: '2024',
    description: 'Participated in the intensive Developer\'s Night workshop, focusing on advanced full-stack development, cloud architectures, and collaborative problem-solving.',
    id: 'DN-2024',
    fileUrl: '/developers-night.pdf'
  },
  {
    title: 'Diploma in Computer Applications',
    issuer: 'Guru Nanak Dev University',
    year: '2022',
    description: 'Completed foundational training in computer applications, MS Office tools, internet technologies, programming basics, and digital productivity skills.',
    id: 'DCA-2022',
    fileUrl: '/diploma.pdf'
  }
];
