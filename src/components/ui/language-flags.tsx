// SVG Flag Components for Language Selection

interface FlagProps {
  className?: string;
}

export function UKFlag({ className = "w-10 h-10" }: FlagProps) {
  return (
    <svg viewBox="0 0 60 30" className={className}>
      <clipPath id="uk-clip">
        <rect width="60" height="30" rx="4" />
      </clipPath>
      <g clipPath="url(#uk-clip)">
        <rect width="60" height="30" fill="#00247d"/>
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#cf142b" strokeWidth="4" clipPath="url(#uk-diag)"/>
        <clipPath id="uk-diag">
          <path d="M30,15 L60,30 L60,15 L30,15 M30,15 L0,0 L0,15 L30,15 M30,15 L0,30 L15,30 L30,15 M30,15 L60,0 L45,0 L30,15"/>
        </clipPath>
        <path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="10"/>
        <path d="M30,0 V30 M0,15 H60" stroke="#cf142b" strokeWidth="6"/>
      </g>
    </svg>
  );
}

export function SpainFlag({ className = "w-10 h-10" }: FlagProps) {
  return (
    <svg viewBox="0 0 60 40" className={className}>
      <clipPath id="es-clip">
        <rect width="60" height="40" rx="4" />
      </clipPath>
      <g clipPath="url(#es-clip)">
        <rect width="60" height="40" fill="#c60b1e"/>
        <rect width="60" height="20" y="10" fill="#ffc400"/>
      </g>
    </svg>
  );
}

export function GermanyFlag({ className = "w-10 h-10" }: FlagProps) {
  return (
    <svg viewBox="0 0 60 36" className={className}>
      <clipPath id="de-clip">
        <rect width="60" height="36" rx="4" />
      </clipPath>
      <g clipPath="url(#de-clip)">
        <rect width="60" height="12" fill="#000"/>
        <rect width="60" height="12" y="12" fill="#dd0000"/>
        <rect width="60" height="12" y="24" fill="#ffcc00"/>
      </g>
    </svg>
  );
}

export const FlagComponents = {
  en: UKFlag,
  es: SpainFlag,
  de: GermanyFlag,
} as const;
