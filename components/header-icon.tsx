export type HeaderIconName = 'learn' | 'reference' | 'practice' | 'resources' | 'search';

type HeaderIconProps = {
  name: HeaderIconName;
  className?: string;
};

export function HeaderIcon({ name, className }: HeaderIconProps) {
  const common = {
    className,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    focusable: false,
    'aria-hidden': true,
  };

  if (name === 'learn') {
    return (
      <svg {...common}>
        <path d="M4.25 5.25A2.25 2.25 0 0 1 6.5 3h5.5v16H6.5a2.25 2.25 0 0 0-2.25 2V5.25Z" />
        <path d="M19.75 5.25A2.25 2.25 0 0 0 17.5 3H12v16h5.5a2.25 2.25 0 0 1 2.25 2V5.25Z" />
      </svg>
    );
  }

  if (name === 'reference') {
    return (
      <svg {...common}>
        <circle cx="10.75" cy="10.75" r="5.75" />
        <path d="m15.1 15.1 4.15 4.15" />
        <path d="M8.25 8.5h5M8.25 11h3.4" />
      </svg>
    );
  }

  if (name === 'practice') {
    return (
      <svg {...common}>
        <rect x="5" y="2.75" width="14" height="18.5" rx="2.25" />
        <path d="M8 6.25h8v3.25H8z" />
        <path d="M8.25 13h.01M12 13h.01M15.75 13h.01M8.25 16.75h.01M12 16.75h.01M15.75 16.75h.01" strokeWidth="2.3" />
      </svg>
    );
  }

  if (name === 'resources') {
    return (
      <svg {...common}>
        <path d="M5 4.25h11.25A1.75 1.75 0 0 1 18 6v3.25H5a1.75 1.75 0 0 1 0-3.5h12.5" />
        <path d="M6 9.25h12.75v4H6a2 2 0 0 0 0 4h12.75v2.5H6a4.5 4.5 0 0 1 0-9" />
        <path d="M9 13.25v4" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <circle cx="10.75" cy="10.75" r="6.25" />
      <path d="m15.4 15.4 4.1 4.1" />
    </svg>
  );
}
