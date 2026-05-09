import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TypographyProps {
  children: ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  variant?: 'display' | 'title' | 'subtitle' | 'body' | 'caption';
}

export const Typography = ({ 
  children, 
  className, 
  as: Component = 'p',
  variant = 'body' 
}: TypographyProps) => {
  const variants = {
    display: "text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.1]",
    title: "text-3xl md:text-5xl font-semibold tracking-tight",
    subtitle: "text-xl md:text-2xl text-text-secondary font-medium",
    body: "text-base md:text-lg text-text-secondary leading-relaxed",
    caption: "text-sm text-text-muted tracking-wide uppercase",
  };

  return (
    <Component className={cn(variants[variant], className)}>
      {children}
    </Component>
  );
};
