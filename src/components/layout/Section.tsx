import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  containerClassName?: string;
  isFullWidth?: boolean;
}

export const Section = ({ 
  children, 
  id, 
  className, 
  containerClassName,
  isFullWidth = false 
}: SectionProps) => {
  return (
    <section 
      id={id} 
      className={cn(
        "relative py-20 md:py-32 overflow-hidden",
        className
      )}
    >
      <div className={cn(
        "mx-auto px-6 md:px-12",
        !isFullWidth && "max-w-7xl",
        containerClassName
      )}>
        {children}
      </div>
    </section>
  );
};
