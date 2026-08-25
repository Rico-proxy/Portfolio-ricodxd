import { motion } from 'motion/react';
import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

type ScrollRevealProps = ComponentProps<typeof motion.div>;

export default function ScrollReveal({
  className,
  transition,
  ...props
}: ScrollRevealProps) {
  return (
    <motion.div
      className={cn('will-change-transform', className)}
      initial={{ opacity: 0, y: 32, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.65,
        ease: 'easeOut',
        ...transition,
      }}
      {...props}
    />
  );
}
