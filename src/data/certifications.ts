export interface Certification {
  title: string;
  issuer: string;
  year: string;
  description: string;
  id: string;
}

export const certifications: Certification[] = [
  { 
    title: 'Google AI Professional Certificate', 
    issuer: 'Google Cloud', 
    year: '2024',
    description: 'Advanced machine learning, model optimization, and generative AI implementation on GCP.',
    id: 'GC-AI-992'
  },
  { 
    title: 'AWS Certified Cloud Practitioner', 
    issuer: 'Amazon Web Services', 
    year: '2024',
    description: 'Cloud infrastructure, security, and architectural best practices.',
    id: 'AWS-CCP-10'
  },
  { 
    title: 'Meta Frontend Developer Professional', 
    issuer: 'Meta', 
    year: '2023',
    description: 'Expertise in React, responsive design, and modern frontend architecture.',
    id: 'META-FE-55'
  },
  { 
    title: 'Deep Learning Specialization', 
    issuer: 'DeepLearning.AI', 
    year: '2023',
    description: 'Neural networks, computer vision, and sequence models.',
    id: 'DLAI-DL-88'
  },
];
