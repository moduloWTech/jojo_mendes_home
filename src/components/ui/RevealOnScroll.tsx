'use client';

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Entrada discreta de seção (opacidade + translateY <= 16px, 400ms ease-out).
 * Conteúdo permanece visível e acessível caso JS ou IntersectionObserver não estejam ativos.
 */
export function RevealOnScroll({ children, className }: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [animateClass, setAnimateClass] = useState<string>('');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const prefersReduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) {
      return;
    }

    setAnimateClass('opacity-0 translate-y-3');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimateClass('opacity-100 translate-y-0');
            observer.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-[400ms] ease-out will-change-transform',
        animateClass,
        className
      )}
    >
      {children}
    </div>
  );
}

