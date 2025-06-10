import { PortfolioTemplate } from '../types';

export const portfolioTemplates: PortfolioTemplate[] = [
  {
    id: 'executive',
    name: 'Executive',
    description: 'Professional template for senior executives and leaders',
    category: 'executive',
    preview: 'https://images.pexels.com/photos/6256/water-pier-wooden-jetty.jpg?auto=compress&cs=tinysrgb&w=400',
    features: ['Clean layout', 'Professional styling', 'Leadership focus', 'Achievement highlights']
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Vibrant template for designers and creative professionals',
    category: 'creative',
    preview: 'https://images.pexels.com/photos/1646953/pexels-photo-1646953.jpeg?auto=compress&cs=tinysrgb&w=400',
    features: ['Bold colors', 'Portfolio showcase', 'Visual storytelling', 'Creative layouts']
  },
  {
    id: 'technical',
    name: 'Technical',
    description: 'Modern template for developers and engineers',
    category: 'technical',
    preview: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=400',
    features: ['Code-focused', 'Project highlights', 'Technical skills', 'GitHub integration']
  },
  {
    id: 'academic',
    name: 'Academic',
    description: 'Scholarly template for researchers and academics',
    category: 'academic',
    preview: 'https://images.pexels.com/photos/207662/pexels-photo-207662.jpeg?auto=compress&cs=tinysrgb&w=400',
    features: ['Research focus', 'Publication lists', 'Academic credentials', 'Citation ready']
  },
  {
    id: 'startup',
    name: 'Startup',
    description: 'Dynamic template for entrepreneurs and startup founders',
    category: 'startup',
    preview: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400',
    features: ['Growth metrics', 'Innovation focus', 'Team leadership', 'Vision statement']
  }
];

export const sampleResumeData = {
  personalInfo: {
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    website: 'https://alexjohnson.dev',
    linkedin: 'https://linkedin.com/in/alexjohnson',
    github: 'https://github.com/alexjohnson',
    title: 'Senior Full Stack Developer'
  },
  summary: 'Passionate full-stack developer with 5+ years of experience building scalable web applications. Expertise in React, Node.js, and cloud technologies. Led teams of 8+ developers and delivered 20+ successful projects.',
  experience: [
    {
      id: 'exp-1',
      company: 'TechCorp Inc.',
      position: 'Senior Full Stack Developer',
      location: 'San Francisco, CA',
      startDate: '01/2022',
      endDate: 'Present',
      current: true,
      description: [
        'Led development of microservices architecture serving 1M+ users',
        'Mentored junior developers and established coding standards',
        'Reduced application load time by 40% through optimization',
        'Implemented CI/CD pipelines reducing deployment time by 60%'
      ],
      technologies: ['React', 'Node.js', 'AWS', 'Docker', 'PostgreSQL']
    },
    {
      id: 'exp-2',
      company: 'StartupXYZ',
      position: 'Full Stack Developer',
      location: 'San Francisco, CA',
      startDate: '06/2020',
      endDate: '12/2021',
      current: false,
      description: [
        'Built MVP from scratch using React and Express.js',
        'Designed and implemented RESTful APIs',
        'Collaborated with design team on user experience',
        'Achieved 99.9% uptime through monitoring and optimization'
      ],
      technologies: ['React', 'Express.js', 'MongoDB', 'Redis', 'Heroku']
    }
  ],
  education: [
    {
      id: 'edu-1',
      institution: 'University of California, Berkeley',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      location: 'Berkeley, CA',
      startDate: '09/2016',
      endDate: '05/2020',
      gpa: '3.8',
      achievements: ['Summa Cum Laude', 'Dean\'s List (6 semesters)']
    }
  ],
  skills: [
    {
      category: 'Programming Languages',
      skills: ['JavaScript', 'TypeScript', 'Python', 'Java', 'Go']
    },
    {
      category: 'Frontend',
      skills: ['React', 'Vue.js', 'Angular', 'HTML5', 'CSS3', 'Tailwind CSS']
    },
    {
      category: 'Backend',
      skills: ['Node.js', 'Express.js', 'Django', 'Spring Boot', 'GraphQL']
    },
    {
      category: 'Databases',
      skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch']
    },
    {
      category: 'DevOps & Cloud',
      skills: ['AWS', 'Docker', 'Kubernetes', 'Jenkins', 'Terraform']
    }
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'E-commerce Platform',
      description: 'Full-stack e-commerce solution with real-time inventory management, payment processing, and analytics dashboard.',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Redis'],
      link: 'https://ecommerce-demo.alexjohnson.dev',
      github: 'https://github.com/alexjohnson/ecommerce-platform',
      featured: true
    },
    {
      id: 'proj-2',
      name: 'Task Management App',
      description: 'Collaborative task management application with real-time updates, team workspaces, and advanced filtering.',
      technologies: ['Vue.js', 'Express.js', 'MongoDB', 'Socket.io'],
      link: 'https://taskapp.alexjohnson.dev',
      github: 'https://github.com/alexjohnson/task-manager',
      featured: true
    },
    {
      id: 'proj-3',
      name: 'AI Content Generator',
      description: 'Machine learning powered content generation tool with natural language processing capabilities.',
      technologies: ['Python', 'TensorFlow', 'Flask', 'React'],
      github: 'https://github.com/alexjohnson/ai-content-gen',
      featured: false
    }
  ],
  achievements: [
    'Led team that won "Best Innovation" award at TechCorp hackathon 2023',
    'Speaker at React Conference 2022 - "Building Scalable Component Libraries"',
    'Published article "Modern JavaScript Patterns" with 10K+ views',
    'Contributed to open-source projects with 500+ GitHub stars'
  ],
  confidence: {
    personalInfo: 1.0,
    summary: 1.0,
    experience: 1.0,
    education: 1.0,
    skills: 1.0,
    projects: 1.0,
    overall: 1.0
  }
};