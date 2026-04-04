import React, { useId } from 'react';

export type ZigZagDividerProps = {
  /** Tailwind etc. Color comes from current text color (currentColor). */
  className?: string;
  /** Visual height (also used as the zigzag amplitude). */
  height?: number; // default 8
  /** Width of each “V” segment. Smaller = more zigzags. */
  step?: number; // default 12
  /** Line thickness. */
  strokeWidth?: number; // default 2
  /** Rounded or square corners on the zigzag. */
  strokeLinecap?: 'butt' | 'round' | 'square';
  /** Accessibility: mark decorative by default. */
  ariaLabel?: string;
};

const ZigZagDivider: React.FC<ZigZagDividerProps> = ({
  className = '',
  height = 80,
  step = 12,
  strokeWidth = 5,
  strokeLinecap = 'butt',
  ariaLabel,
}) => {
  const pid = useId();
  const amp = height;

  return (
    <svg
      className={className}
      viewBox={`0 0 100 ${amp}`}
      preserveAspectRatio="none"
      style={{ height }}
      role={ariaLabel ? 'img' : 'presentation'}
      aria-hidden={ariaLabel ? undefined : true}
      aria-label={ariaLabel}>
      <defs>
        <pattern
          id={pid}
          width={step}
          height={amp}
          patternUnits="userSpaceOnUse">
          <path
            d={`M0 ${amp} L ${step / 2} 0 L ${step} ${amp}`}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap={strokeLinecap}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${pid})`} />
    </svg>
  );
};

export default React.memo(ZigZagDivider);
