declare module '@/components/ui/rain-on-glass-bottom' {
  import type { JSX } from 'react';

  export const metadata: unknown;

  export default function RainOnGlass(
    props: Record<string, unknown> & {
      fallbackBackgroundImage?: string;
    },
  ): JSX.Element;
}
