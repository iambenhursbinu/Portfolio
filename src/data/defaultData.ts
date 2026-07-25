import { PortfolioData } from '../types';

export const defaultPortfolioData: PortfolioData = {
  profile: {
    name: 'BENHURS BINU R',
    role: 'Frontend Developer',
    bio: 'I am a passionate beginner frontend developer, dedicated to writing clean, structured code and crafting highly interactive, modern web experiences.',
    location: 'Coimbatore, Tamil Nadu, IN',
    availableStatus: 'Available for Opportunities',
    email: 'iambenhursbinu@gmail.com'
  },
  profilePhoto: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=500&q=80',
  skills: [
    {
      title: 'Frontend Development',
      skills: [
        { name: 'React.js', level: 'Beginner', description: 'Building interactive components, single-page app views, and managing states.' },
        { name: 'TypeScript', level: 'Beginner', description: 'Learning safe coding with static types, interfaces, and clean component properties.' },
        { name: 'JavaScript (ES6+)', level: 'Beginner', description: 'Core concepts, async functions, event handling, and array operations.' },
        { name: 'Tailwind CSS', level: 'Beginner', description: 'Designing clean, modern, and mobile-friendly layouts using utility classes.' },
        { name: 'Framer Motion', level: 'Beginner', description: 'Adding smooth entrance transitions, hover effects, and simple layout animations.' },
        { name: 'Responsive UI', level: 'Beginner', description: 'Creating layouts that look great on both mobile screens and desktop monitors.' }
      ]
    },
    {
      title: 'Developer Tools & Learning Workflow',
      skills: [
        { name: 'Vite Build Tool', level: 'Beginner', description: 'Configuring modern, high-speed dev servers and building optimized single-page apps.' },
        { name: 'Chrome DevTools', level: 'Beginner', description: 'Debugging component states, inspecting styling grids, and profiling performance.' },
        { name: 'npm / Package Managers', level: 'Beginner', description: 'Managing third-party libraries, updating dependencies, and handling project configurations.' },
        { name: 'VS Code', level: 'Beginner', description: 'My primary code editor for writing clean, organized code with helpful extensions.' },
        { name: 'Git/GitHub', level: 'Beginner', description: 'Hosting repositories, committing changes, and managing basic workflows.' }
      ]
    },
    {
      title: 'Cloud & Infrastructure',
      skills: [
        { name: 'Vercel', level: 'Beginner', description: 'Deploying web projects directly from GitHub for quick online previews.' },
        { name: 'MS Azure Fundamentals', level: 'Beginner', description: 'Learning cloud computing basics and fundamental Azure services.' }
      ]
    }
  ],
  projects: [
    {
      id: 1,
      title: 'Business Management Dashboard',
      category: 'Web Application Frontend',
      highlights: [
        'Clean and clear visual charts to represent complex data.',
        'Interactive inventory tracking panel with basic alert statuses.',
        'Dynamic staff directory with custom search and filtering controls.',
        'Responsive Kanban board with click-to-cycle status updates.',
        'Interactive help assistant panel for search queries and mock support.'
      ],
      techStack: ['React.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      liveLink: 'https://binutex.vercel.app',
      githubLink: 'https://github.com/benhursbinu'
    },
    {
      id: 2,
      title: 'CNC Operations Control Panel',
      category: 'Machine Monitoring Dashboard',
      highlights: [
        'Real-time manufacturing tracking with custom speed and heat gauges.',
        'Staff shift logs with performance overview charts.',
        'Predictive schedule checks for timely machine maintenance.',
        'Simple permission roles toggling between Operator and Admin views.',
        'Clean layout structure optimized for seamless desktop experience.'
      ],
      techStack: ['React.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      liveLink: 'https://binutex.vercel.app',
      githubLink: 'https://github.com/benhursbinu'
    }
  ],
  certifications: [
    {
      title: 'Microsoft Certified: Azure Fundamentals',
      issuer: 'Microsoft Learn',
      date: 'Verified Partner Scope',
      badgeType: 'Silver',
      verificationId: 'AZ-900 / MS-900-VALID',
      skillsVerified: ['Cloud Computing Concepts', 'Azure Architecture & Services', 'Security & Compliance Frameworks']
    },
    {
      title: 'Meta Front-End Developer Professional Certificate',
      issuer: 'Coursera / Meta',
      date: 'Verified Partner Scope',
      badgeType: 'Gold',
      verificationId: 'META-FED-VALID',
      skillsVerified: ['Advanced React Component Design', 'UX/UI Design Foundations', 'HTML5/CSS3 Semantic Coding']
    }
  ]
};
