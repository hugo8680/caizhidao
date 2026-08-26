type ActionArrowProps = {
  className?: string;
};

export function ActionArrow({ className = '' }: ActionArrowProps) {
  return <span className={`action-arrow${className ? ` ${className}` : ''}`} aria-hidden="true" />;
}
