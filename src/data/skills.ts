import { Code2, Gauge, WandSparkles } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type SkillGroup = {
  title: string;
  summary: string;
  tools: string[];
  icon: LucideIcon;
};

export const skillGroups: SkillGroup[] = [
  {
    title: 'Frontend Architecture',
    summary:
      'Build reusable React components, compose page layouts, handle routing, and structure UI state for maintainable frontend apps.',
    tools: [
      'React',
      'Next.js',
      'App Router',
      'TypeScript',
      'React Router',
      'Hooks',
    ],
    icon: Code2,
  },
  {
    title: 'Styling & Motion',
    summary:
      'Create responsive interfaces with Tailwind CSS, polished interaction states, motion systems, and interactive visual effects.',
    tools: [
      'Tailwind CSS',
      'Magic UI',
      'Aceternity UI',
      'Framer Motion',
      'WebGL',
      'Responsive UI',
    ],
    icon: WandSparkles,
  },
  {
    title: 'Performance & Tools',
    summary:
      'Ship production-ready work with build tooling, optimized assets, practical quality checks, and reliable development workflows.',
    tools: ['Vite', 'Git', 'Asset Optimization', 'Lighthouse', 'CI/CD', 'Code Quality'],
    icon: Gauge,
  },
];
