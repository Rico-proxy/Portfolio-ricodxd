import Images from '@/assets';

export type Project = {
  name: string;
  image: string;
  href: string;
  stack: string[];
};

export const projects: Project[] = [
  {
    name: 'Resource Library',
    image: Images.resourceLibrary,
    href: 'https://resource-library-with-superbase-aut.vercel.app/',
    stack: ['React', 'Tailwind', 'Shadcn'],
  },
  {
    name: 'Visual Designer Portfolio',
    image: Images.visualDesignerPortfolio,
    href: 'https://ui-designer-seven.vercel.app/',
    stack: ['Next.js', 'Tailwind'],
  },
  {
    name: 'Pizza Hub',
    image: Images.pizzaHub,
    href: 'https://luigie-pizza.vercel.app/',
    stack: ['React', 'Tailwind'],
  },
  {
    name: 'Browncon',
    image: Images.browncon,
    href: 'https://browncon.vercel.app/',
    stack: ['HTML', 'Tailwind'],
  },
  {
    name: 'Addiction Support Website',
    image: Images.support,
    href: 'https://support-website-sigma.vercel.app/',
    stack: ['React', 'Tailwind', 'Shadcn', 'Magic UI'],
  },
  {
    name: 'Artist Portfolio',
    image: Images.artistPortfolio,
    href: 'https://artiste-porfolio.vercel.app/',
    stack: ['React', 'Tailwind', 'Shadcn', 'Magic UI'],
  },
  {
    name: 'Move Ng',
    image: Images.moveNg,
    href: 'https://move-ng.vercel.app/',
    stack: ['React', 'Tailwind', 'Shadcn', 'Magic UI'],
  },
  {
    name: 'Luiggie Pizza',
    image: Images.luiggiePizza,
    href: 'https://luigie-pizza-3bof.vercel.app/',
    stack: ['React Router', 'Tailwind', 'Shadcn', 'Magic UI'],
  },
  {
    name: 'Verdant',
    image: Images.plants,
    href: 'https://plants-two-nu.vercel.app/',
    stack: ['React Router', 'Tailwind', 'Shadcn', 'Magic UI'],
  },
  {
    name: 'Amour',
    image: Images.amour,
    href: 'https://amour-two.vercel.app/',
    stack: ['React Router', 'Tailwind', 'Shadcn', 'Magic UI'],
  },
  {
    name: 'Ricoflux',
    image: Images.ricoflux,
    href: 'https://anime-stream-iota-seven.vercel.app/',
    stack: ['React Router', 'Tailwind', 'Shadcn', 'Magic UI'],
  },
  {
    name: 'Incasa',
    image: Images.incasa,
    href: 'https://incasa-gray.vercel.app/',
    stack: ['React Router', 'Tailwind', 'Shadcn'],
  },
  {
    name: 'The Merger',
    image: Images.merger,
    href: 'https://the-merger-ashy.vercel.app/',
    stack: ['React Router', 'Tailwind CSS', 'Shadcn'],
  },
  {
    name: 'Banks',
    image: Images.banks,
    href: 'https://banks-portfolio-new.vercel.app/',
    stack: ['React Router', 'Tailwind CSS', 'Shadcn'],
  },
];
