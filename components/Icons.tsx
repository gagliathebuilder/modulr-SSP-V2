
import React from 'react';

const iconProps = {
  className: "w-6 h-6",
  strokeWidth: 1.5,
  stroke: "currentColor",
  fill: "none",
  strokeLinecap: "round",
  strokeLinejoin: "round"
} as const;

export const DashboardIcon: React.FC<{className?: string}> = ({className}) => (
  <svg {...iconProps} className={`${iconProps.className} ${className}`}>
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <rect x="4" y="4" width="6" height="6" rx="1" />
    <rect x="14" y="4" width="6" height="6" rx="1" />
    <rect x="4" y="14" width="6" height="6" rx="1" />
    <rect x="14" y="14" width="6" height="6"rx="1" />
  </svg>
);

export const CampaignIcon: React.FC<{className?: string}> = ({className}) => (
  <svg {...iconProps} className={`${iconProps.className} ${className}`}>
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
    <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
    <path d="M12 15l0 6" />
    <path d="M15 12l6 0" />
    <path d="M12 9l0 -6" />
    <path d="M9 12l-6 0" />
  </svg>
);

export const AnalyzeIcon: React.FC<{className?: string}> = ({className}) => (
  <svg {...iconProps} className={`${iconProps.className} ${className}`}>
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M15 10l-4 4l6 6l4 -4l-6 -6" />
    <path d="M6 15l-1 -1l4 -4l1 1" />
    <path d="M13 3l6 6" />
    <path d="M16 18l-2 2" />
    <path d="M8.5 8.5l-1.5 1.5" />
    <path d="M12.5 5.5l1.5 -1.5" />
    <path d="M3 21l3 -3" />
  </svg>
);

export const MonetizationIcon: React.FC<{className?: string}> = ({className}) => (
  <svg {...iconProps} className={`${iconProps.className} ${className}`}>
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M17.5 17.5l-2.5 2.5l-4 -4l-2.5 2.5l-4 -4l-2.5 2.5l-4 -4l-2.5 2.5l8.5 8.5z" />
    <path d="M17.5 6.5l-2.5 2.5l-4 -4l-2.5 2.5l-4 -4l-2.5 2.5l8.5 8.5" />
  </svg>
);

export const ReportingIcon: React.FC<{className?: string}> = ({className}) => (
  <svg {...iconProps} className={`${iconProps.className} ${className}`}>
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M8 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h5.5" />
    <path d="M16 3h-5a2 2 0 0 0 -2 2v3" />
    <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
    <path d="M12 21v-6" />
    <path d="M12 9v-6" />
    <path d="M15.031 10.469l4.5 -1.969" />
    <path d="M18.531 16.531l-3 -3" />
    <path d="M9.5 14.5l-3 3" />
    <path d="M4.969 8.531l4.5 1.969" />
  </svg>
);

export const LibraryIcon: React.FC<{className?: string}> = ({className}) => (
  <svg {...iconProps} className={`${iconProps.className} ${className}`}>
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M5 4h4a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-4a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2" />
    <path d="M9 8h4a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-4" />
    <path d="M13 12h4a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-4" />
  </svg>
);


export const MenuIcon: React.FC<{className?: string}> = ({className}) => (
  <svg {...iconProps} className={`${iconProps.className} ${className}`}>
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <line x1="4" y1="6" x2="20" y2="6" />
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="18" x2="20" y2="18" />
  </svg>
);

export const CloseIcon: React.FC<{className?: string}> = ({className}) => (
  <svg {...iconProps} className={`${iconProps.className} ${className}`}>
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
