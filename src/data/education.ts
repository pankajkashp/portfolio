export interface Education {
  degree: string;
  institution: string;
  year: string;
  description: string;
}

export const education: Education[] = [
  {
    degree: 'Bachelor of Technology — Computer Science and Engineering (Artificial Intelligence)',
    institution: 'KIET Group Of Institutions, Ghaziabad',
    year: '2023 – 2027',
    description: 'Currently pursuing a specialization in Artificial Intelligence with a strong focus on full stack development, modern web technologies, scalable applications, and intelligent systems. Actively building real-world projects involving AI integrations, IoT systems, and interactive digital experiences.'
  },
  {
    degree: 'Higher Secondary Education (12th Grade)',
    institution: 'GSSS Ranghar Nangal',
    year: '2022',
    description: 'Completed higher secondary education in Science with Biology, securing 92.3%. Built a strong foundation in analytical thinking, problem-solving, and scientific concepts while developing a growing interest in technology and software development.'
  },
  {
    degree: 'Diploma in Computer Applications',
    institution: 'Guru Nanak Dev University',
    year: '2023',
    description: 'Completed foundational training in computer applications, MS Office tools, internet technologies, programming basics, and digital productivity skills.',
  },
  {
    degree: '10th Standard',
    institution: 'DAV High School, Batala, Punjab',
    year: '2020',
    description: 'Completed secondary education with **89%**, building a strong academic foundation in mathematics, science, and computer fundamentals.',
  }
];
