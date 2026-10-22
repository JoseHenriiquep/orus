import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface ContainerProps {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

/** Largura máxima de 1200px com margens laterais de 24px (celular) a 80px (desktop). */
export function Container({ as: Tag = 'div', className, children }: ContainerProps) {
  return <Tag className={cn('mx-auto w-full max-w-[calc(1200px+10rem)] px-6 md:px-12 xl:px-20', className)}>{children}</Tag>;
}
