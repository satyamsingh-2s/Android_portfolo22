type PlayStoreIconProps = {
  size?: number;
  className?: string;
};

export function PlayStoreIcon({ size = 18, className }: PlayStoreIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M3.5 2.8 13.2 12 3.5 21.2c-.3-.3-.5-.8-.5-1.3V4.1c0-.5.2-1 .5-1.3Z" fill="#34A853" />
      <path d="m13.2 12 3.1-2.9 3.9 2.2c1 .6 1 1.8 0 2.4l-3.9 2.2-3.1-2.9Z" fill="#FFCA28" />
      <path d="m3.5 2.8 11.7 6.7-2 2.5-9.7-9.2Z" fill="#4285F4" />
      <path d="m3.5 21.2 9.7-9.2 2 2.5-11.7 6.7Z" fill="#EA4335" />
    </svg>
  );
}
