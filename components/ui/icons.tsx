/* Line icons from the prototype (svg.i picks up stroke styles from the base CSS). */

export function ArrowRight({ size = 22 }: { size?: number }) {
  return (
    <svg className="i" viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowLeft({ size = 20 }: { size?: number }) {
  return (
    <svg className="i" viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <path d="M19 12H5M11 6l-6 6 6 6" />
    </svg>
  );
}

export function LockIcon() {
  return (
    <svg className="i" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
      <rect x="5" y="11" width="14" height="10" rx="1" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

export function MedalIcon() {
  return (
    <svg className="i" viewBox="0 0 24 24" width="30" height="30" aria-hidden="true">
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="18" cy="6" r="2.5" />
      <circle cx="12" cy="18" r="2.5" />
      <path d="M8.5 6h7M7.5 8l3.5 8M16.5 8 13 16" />
    </svg>
  );
}
