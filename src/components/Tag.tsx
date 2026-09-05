interface TagProps {
  children: string;
  className?: string;
}

export function Tag({ children, className = "" }: TagProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full bg-accent-dim px-2.5 py-1 text-xs font-medium text-accent ${className}`}
    >
      {children}
    </span>
  );
}
