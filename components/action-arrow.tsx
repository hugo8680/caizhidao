import { ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import { ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';
import { ArrowSquareOutIcon } from '@phosphor-icons/react/dist/ssr/ArrowSquareOut';

type ActionArrowProps = {
  className?: string;
  direction?: 'right' | 'left' | 'external';
};

export function ActionArrow({ className = '', direction = 'right' }: ActionArrowProps) {
  const props = { className: `action-arrow${className ? ` ${className}` : ''}`, size: 18, weight: 'regular' as const, 'aria-hidden': true };
  if (direction === 'left') return <ArrowLeftIcon {...props} />;
  if (direction === 'external') return <ArrowSquareOutIcon {...props} />;
  return <ArrowRightIcon {...props} />;
}
