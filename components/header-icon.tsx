import { BookOpenTextIcon } from '@phosphor-icons/react/dist/ssr/BookOpenText';
import { BooksIcon } from '@phosphor-icons/react/dist/ssr/Books';
import { CalculatorIcon } from '@phosphor-icons/react/dist/ssr/Calculator';
import { CaretDownIcon } from '@phosphor-icons/react/dist/ssr/CaretDown';
import { ListIcon } from '@phosphor-icons/react/dist/ssr/List';
import { MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import { StudentIcon } from '@phosphor-icons/react/dist/ssr/Student';

export type HeaderIconName = 'learn' | 'reference' | 'practice' | 'resources' | 'search' | 'menu' | 'caret';

type HeaderIconProps = {
  name: HeaderIconName;
  className?: string;
};

export function HeaderIcon({ name, className }: HeaderIconProps) {
  const props = { className, size: 20, weight: 'regular' as const, 'aria-hidden': true };
  if (name === 'learn') return <StudentIcon {...props} />;
  if (name === 'reference') return <BookOpenTextIcon {...props} />;
  if (name === 'practice') return <CalculatorIcon {...props} />;
  if (name === 'resources') return <BooksIcon {...props} />;
  if (name === 'menu') return <ListIcon {...props} />;
  if (name === 'caret') return <CaretDownIcon {...props} />;
  return <MagnifyingGlassIcon {...props} />;
}
