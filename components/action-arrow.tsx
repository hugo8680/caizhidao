import { ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';

type ActionArrowProps = {
  className?: string;
};

export function ActionArrow({ className = '' }: ActionArrowProps) {
  return <ArrowRightIcon className={`action-arrow${className ? ` ${className}` : ''}`} size={18} weight="regular" aria-hidden="true" />;
}
